import Link from 'next/link';
import Image from 'next/image';

import { Post } from '@/types/post';

import styles from './styles/PostItem.module.css';

interface PostItemProps {
  post: Post;
}

const PostItem = (props: PostItemProps) => {
  const { post } = props;

  const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/img/posts/${post.slug}/${post.image}`;

  const linkPath = `/posts/${post.slug}`;

  return (
    <li className={styles.post}>
      <Link href={linkPath}>
        <div className={styles.image}>
          <Image
            src={imagePath}
            alt={post.title}
            width={300}
            height={200}
            layout='responsive'
            legacyBehavior
          />
        </div>

        <div className={styles.content}>
          <h3>{post.title}</h3>

          <time>{formattedDate}</time>

          <p>{post.excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
