import { Module, CacheModule } from '@nestjs/common';
import PostsService from './posts.service';
import PostsController from './posts.controller';
import Postentity from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from '../search/search.module';
import PostSearchService from './postsSearch.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Postentity]),
    SearchModule,
    CacheModule.register(),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostSearchService],
})
export class PostsModule {}
