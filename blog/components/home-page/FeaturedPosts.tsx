import { Post } from '@/types/post';

import PostGrid from '../posts/PostGrid';

import styles from './styles/FeaturedPosts.module.css';

interface FeaturedPostsProps {
  posts: Post[];
}

const FeaturedPosts = (props: FeaturedPostsProps) => {
  const { posts } = props;

  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>

      <PostGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
