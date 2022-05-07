import mongoose, { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import PostDto from './dto/post.dto';
import { User } from 'src/users/user.schema';

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

  async update(id: string, postData: PostDto) {
    const post = await this.postModel
      .findByIdAndUpdate(id, postData)
      .setOptions({ overwrite: true, new: true });
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

  async findAll() {
    return this.postModel.find().populate('author');
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
