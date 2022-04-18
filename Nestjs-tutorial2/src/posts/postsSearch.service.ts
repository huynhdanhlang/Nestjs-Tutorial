import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import Post from './post.entity';
import PostCountResult from './types/postCountBody.interface';
import PostSearchResult from './types/postSearchResponse.interface';
import PostSearchBody from './types/postsSearchBody.interface';

@Injectable()
export default class PostSearchService {
  index = 'posts';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(post: Post) {
    return this.elasticsearchService.index<PostSearchResult, PostSearchBody>({
      index: this.index,
      body: {
        id: post.id,
        title: post.title,
        paragraphs: post.paragraphs,
        authorId: post.author.id,
      },
    });
  }

  async count(text: string, fields: string[]) {
    const { body } = await this.elasticsearchService.count<PostCountResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: fields,
          },
        },
      },
    });
    return body.count;
  }

  async search(text: string, offset?: number, limit?: number, startId = 0) {
    let separateCount = 0;
    if (startId) {
      separateCount = await this.count(text, ['title', 'paragraphs']);
    }
    console.log(['sep'], separateCount);
    const { body } = await this.elasticsearchService.search<PostSearchResult>({
      index: this.index,
      from: offset,
      size: limit,
      body: {
        query: {
          bool: {
            must: {
              // sửa lại của tác giả từ should => must
              multi_match: {
                query: text,
                fields: ['title', 'paragraphs'],
              },
            },
            filter: {
              range: {
                id: {
                  gt: startId,
                },
              },
            },
          },
        },
        sort: {
          id: {
            order: 'asc',
          },
        },
      },
    });
    const count = body.hits.total.value;
    const hits = body.hits.hits;
    const results = hits.map((item) => item._source);
    console.log(['search 2'], results);

    return {
      count: startId ? separateCount : count,
      results,
    };
  }

  async delete(postId: number) {
    console.log(['dadad'], postId);

    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: postId,
          },
        },
      },
    });
  }

  async update(post: Post) {
    const newBody: PostSearchBody = {
      id: post.id,
      title: post.title,
      paragraphs: post.paragraphs,
      authorId: post.author.id,
    };

    console.log(['this is newpost'], newBody);

    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      console.log(['result'], result);

      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    const postUpdate = await this.elasticsearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: post.id,
          },
        },
        script: {
          inline: script,
        },
      },
    });
    return postUpdate;
  }
}
