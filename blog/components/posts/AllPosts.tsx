import { Post } from '@/types/post';

import PostGrid from './PostGrid';

import styles from './styles/AllPosts.module.css';

interface AllPostsProps {
  posts: Post[];
}

const AllPosts = (props: AllPostsProps) => {
  const { posts } = props;

  return (
    <section className={styles.posts}>
      <h1>All Posts</h1>

      <PostGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
