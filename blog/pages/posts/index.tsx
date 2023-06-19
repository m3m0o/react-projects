import { Post } from '@/types/post';

import { getAllPosts } from '@/utils/posts-util';

import AllPosts from '@/components/posts/AllPosts';

interface AllPostsPageProps {
  posts: Post[];
}

const AllPostsPage = (props: AllPostsPageProps) => {
  const { posts } = props;

  return <AllPosts posts={posts} />;
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
