import mongoose, { FilterQuery, Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import PostDto from './dto/post.dto';
import { User } from 'src/users/user.schema';
import UpdatePostDto from './dto/updatePost.dto';

@Injectable()
class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  async create(postData: PostDto, author: User) {
    const createPost = new this.postModel({
      ...postData,
      author,
    });
    await createPost.populate('categories');
    return createPost.save();
  }

  async update(id: string, postData: UpdatePostDto) {
    const post = await this.postModel
      .findOneAndReplace({ _id: id }, postData, { new: true })
      .setOptions({ overwrite: true, new: true })
      .populate(['author', 'categories', 'series']);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async delete(postId: string) {
    const result = await this.postModel.findByIdAndDelete(postId);
    if (!result) {
      throw new NotFoundException();
    }
  }

  async deleteMany(
    ids: string[],
    session: mongoose.ClientSession | null = null,
  ) {
    return this.postModel.deleteMany({ _id: ids }).session(session);
  }

  async findAll(
    documentToSkip = 0,
    limitOfDocument?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filter: FilterQuery<PostDocument> = startId
      ? {
          _id: {
            $gt: startId,
          },
        }
      : {};

    if (searchQuery) {
      filter.$text = {
        $search: searchQuery,
      };
    }

    const query = this.postModel
      .find(filter)
      .sort({ _id: 1 })
      .skip(documentToSkip)
      .populate(['author', 'categories']);

    if (limitOfDocument) {
      query.limit(limitOfDocument);
    }

    const results = await query;
    const count = await this.postModel.count();

    return { results, count };
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
}

export default PostsService;
