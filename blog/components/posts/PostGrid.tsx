import { Post } from '@/types/post';

import PostItem from './PostItem';

import styles from './styles/PostGrid.module.css';

interface PostGridProps {
  posts: Post[];
}

const PostGrid = (props: PostGridProps) => {
  const { posts } = props;

  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostGrid;
