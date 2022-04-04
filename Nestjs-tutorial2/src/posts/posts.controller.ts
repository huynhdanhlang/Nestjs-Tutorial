import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UploadPostDto from './dto/updatePost.dto';
import FindOneParams from 'src/utils/findOneParams';
import updatePostDto from './dto/updatePost.dto';
import { ExcludeNullInterceptor } from 'src/utils/excludeNull.interceptor';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  // @UseInterceptors(ExcludeNullInterceptor) // Không trả về thuộc tính null
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Patch(":id")
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() post: updatePostDto,
  ) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
