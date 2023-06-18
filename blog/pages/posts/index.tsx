import { Post } from '@/types/post';

import PostGrid from '@/components/posts/PostGrid';

import styles from './styles/index.module.css';

interface AllPostsPage {
  posts: Post[];
}

const AllPostsPage = (props: AllPostsPage) => {
  const { posts } = props;

  return (
    <section className={styles.post}>
      <h1>All Posts</h1>

      <PostGrid posts={posts} />
    </section>
  );
};

export default AllPostsPage;
