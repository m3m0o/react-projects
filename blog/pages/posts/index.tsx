import Head from 'next/head';

import { Post } from '@/types/post';

import { getAllPosts } from '@/utils/posts-util';

import AllPosts from '@/components/posts/AllPosts';

interface AllPostsPageProps {
  posts: Post[];
}

const AllPostsPage = (props: AllPostsPageProps) => {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>

      <AllPosts posts={posts} />
    </>
  );
};

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};

export default AllPostsPage;
