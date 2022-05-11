import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
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
import { PaginationParams } from '../utils/types/paginationParam';
import { GET_POSTS_CACHE_KEY } from './postsCacheKey.constant';
import { HttpCacheInterceptor } from './httpCache.interceptor';
import JwtTwoFactorGuard from '../authentication/jwt-two-factor.guards';
import RoleGuard from '../users/role.guard';
import Role from '../users/role.enum';
import PermissionGuard from '../utils/permission/permission.guard';
import PostsPermission from './postsPermission.enum';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import PostEntity from './post.entity';
@Controller('posts')
@ApiTags('posts')
@UseInterceptors(ClassSerializerInterceptor) // những thuộc tính có @Exclude() sẽ không được trả về
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(HttpCacheInterceptor) // Tự động caching phản hồi
  @CacheKey(GET_POSTS_CACHE_KEY)
  @CacheTTL(120)
  @Get()
  // @UseInterceptors(ExcludeNullInterceptor) // Không trả về thuộc tính null
  getPosts(
    @Query('search') search: string,
    @Query() { offset, limit, startId }: PaginationParams,
  ) {
    if (search) {
      console.log(['limit'], limit);

      return this.postsService.searchForPosts(search, offset, limit, startId);
    }
    return this.postsService.getPostsWithAuthor(offset, limit, startId);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: 'A post has been successfully fetched',
    type: PostEntity
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.'
  })
  getPostById(@Param() { id }: FindOneParams) {
    console.log(['all'], id);
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtTwoFactorGuard)
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
  // @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(PermissionGuard(PostsPermission.DeletePost))
  // @UseGuards(JwtAuthenticationGuard)
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
