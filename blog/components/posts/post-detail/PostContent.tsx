import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { Post } from '@/types/post';

import PostHeader from './PostHeader';

import styles from './styles/PostContent.module.css';

interface PostContentProps {
  post: Post;
}

const PostContent = (props: PostContentProps) => {
  const { post } = props;

  const imagePath = `/img/posts/${post.slug}/${post.image}`;

  return (
    <article className={styles.content}>
      <PostHeader title={post.title} image={imagePath} />

      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
