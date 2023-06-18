import Image from 'next/image';

import { Post } from '@/types/post';

import styles from './styles/PostHeader.module.css';

interface PostHeaderProps {
  title: string;
  image: string;
}

const PostHeader = (props: PostHeaderProps) => {
  const { title, image } = props;

  return (
    <header className={styles.header}>
      <h1>{title}</h1>

      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
};

export default PostHeader;
