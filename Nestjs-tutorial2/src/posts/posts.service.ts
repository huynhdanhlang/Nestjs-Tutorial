import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
// import Post from './post.interface';
import UploadPostDto from './dto/updatePost.dto';
import Post from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, MoreThan, Repository } from 'typeorm';
import PostNotFoundException from './exception/postNotFound.exception';
import User from '../users/user.entity';
import PostSearchService from './postsSearch.service';
import { Cache } from 'cache-manager';
import { GET_POSTS_CACHE_KEY } from './postsCacheKey.constant';
@Injectable()
export default class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private postsSearchService: PostSearchService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async clearCache() {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith(GET_POSTS_CACHE_KEY)) {
        this.cacheManager.del(key);
      }
    });
  }

  async getPosts(
    offset?: number,
    limit?: number,
    startId?: number,
    options?: FindManyOptions<Post>,
  ) {
    const where: FindManyOptions<Post>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.postsRepository.count();
    }
    const [items, count] = await this.postsRepository.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
      ...options,
    });
    console.log(['Hello']);

    return { items, count: startId ? separateCount : count };
  }

  async getPostsWithAuthor(offset?: number, limit?: number, startId?: number) {
    return this.getPosts(offset, limit, startId, {
      relations: ['author'], // Bao gồm tác giả trong phản hồi
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    if (post) {
      return post;
    }
    this.logger.warn('Tried to access a post that does not exist');
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    await this.postsSearchService.indexPost(newPost);
    await this.clearCache();
    return newPost;
  }

  async updatePost(id: number, post: UploadPostDto) {
    await this.postsRepository.update(id, post);
    const updatePost = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    if (updatePost) {
      await this.postsSearchService.update(updatePost);
      await this.clearCache();
      return updatePost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const deletePost = await this.postsRepository.delete(id);
    if (!deletePost.affected) {
      throw new PostNotFoundException(id);
    }
    await this.postsSearchService.delete(id);
    await this.clearCache();
    return deletePost;
  }

  async searchForPosts(
    text: string,
    offset?: number,
    limit?: number,
    startId?: number,
  ) {
    const { results, count } = await this.postsSearchService.search(
      text,
      offset,
      limit,
      startId,
    );

    const ids = results.map((result) => result.id);
    console.log(['search'], ids);

    if (!ids.length) {
      return {
        items: [],
        count,
      };
    }
    const items = await this.postsRepository.find({
      where: { id: In(ids) },
      relations: ['author'],
    });
    return {
      items,
      count,
    };
  }
}
