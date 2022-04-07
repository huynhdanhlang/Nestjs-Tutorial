import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UploadPostDto from './dto/updatePost.dto';
import FindOneParams from '../utils/findOneParams';
import updatePostDto from './dto/updatePost.dto';
import { ExcludeNullInterceptor } from '../utils/excludeNull.interceptor';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor) // những thuộc tính có @Exclude() sẽ không được trả về
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
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }

  @Patch(':id')
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
