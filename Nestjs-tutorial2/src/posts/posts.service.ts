import { Injectable } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
// import Post from './post.interface';
import UploadPostDto from './dto/updatePost.dto';
import Post from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import PostNotFoundException from './exception/postNotFound.exception';
import User from '../users/user.entity';
import PostSearchService from './postsSearch.service';
import updatePostDto from './dto/updatePost.dto';
@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private postsSearchService: PostSearchService,
  ) {}

  getAllPosts() {
    return this.postsRepository.find({ relations: ['author'] }); // Bao gồm tác giả trong phản hồi
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    this.postsSearchService.indexPost(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UploadPostDto) {
    await this.postsRepository.update(id, post);
    const updatePost = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    if (updatePost) {
      return updatePost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const deletePost = await this.postsRepository.delete(id);
    if (!deletePost.affected) {
      throw new PostNotFoundException(id);
    }
  }

  async searchForPosts(text: string) {
    const result = await this.postsSearchService.search(text);
    const ids = result.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.postsRepository.find({
      where: { id: In(ids) },
    });
  }

  async deletePostElastic(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
    await this.postsSearchService.delete(id);
  }

  async updatePostElastic(id: number, post: updatePostDto) {
    await this.postsRepository.update(id, post);
    const updatePost = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    if (updatePost) {
      await this.postsSearchService.update(updatePost);
      return updatePost;
    }
    throw new PostNotFoundException(id);
  }
}
