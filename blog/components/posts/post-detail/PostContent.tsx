import PostHeader from './PostHeader';

import styles from './styles/PostContent.module.css';

const DUMMY_POST = {
  title: 'Getting Started with NextJS',
  image: 'getting-started-nextjs.png',
  excerpt:
    'NextJS is the React framework for production. It makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
  date: '2022-02-10',
  slug: 'getting-started-with-nextjs',
  content: '# This is a first post',
};

interface PostContentProps {}

const PostContent = (props: PostContentProps) => {
  const imagePath = `/img/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={styles.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />

      {DUMMY_POST.content}
    </article>
  );
};

export default PostContent;
