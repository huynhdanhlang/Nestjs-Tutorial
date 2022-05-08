import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import PostsService from './posts.service';
import ParamsWithId from '../utils/paramsWithId';
import PostDto from './dto/post.dto';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { PaginationParams } from 'src/utils/paginationParams';
import UpdatePostDto from './dto/updatePost.dto';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPost(
    @Query() { limit, skip, startId }: PaginationParams,
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.postsService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  async getPost(@Param() { id }: ParamsWithId) {
    return this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: PostDto, @Req() req: RequestWithUser) {
    return this.postsService.create(post, req.user);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: ParamsWithId) {
    return this.postsService.delete(id);
  }

  @Put(':id')
  async updatePost(@Param() { id }: ParamsWithId, @Body() post: UpdatePostDto) {
    return this.postsService.update(id, post);
  }
}
