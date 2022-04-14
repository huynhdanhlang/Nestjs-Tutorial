import PostSearchBody from './postsSearchBody.interface';

interface PostSearchResult {
  hits: {
    total: {
      value: number;
    };
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}

export default PostSearchResult;
