import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { Post } from '@/types/post';

import { getPostData, getPostsFiles } from '@/utils/posts-util';

import PostContent from '@/components/posts/post-detail/PostContent';

interface PostPageProps {
  post: Post;
}

const PostPage = (props: PostPageProps) => {
  const { post } = props;

  return <PostContent post={post} />;
};

export const getStaticProps: GetStaticProps = (context) => {
  const { params } = context;
  const { slug } = params as ParsedUrlQuery;

  const post = getPostData(slug as string);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const postsFilenames = getPostsFiles();

  const slugs = postsFilenames.map((postFilename) =>
    postFilename.replace(/\.md$/, '')
  );

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostPage;
