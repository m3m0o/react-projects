import { Post } from '@/types/post';

import Hero from '@/components/home-page/Hero';
import FeaturedPosts from '@/components/home-page/FeaturedPosts';

const DUMMY_POSTS: Post[] = [
  {
    title: 'Getting Started with NextJS',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is the React framework for production. It makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2022-02-10',
    slug: 'getting-started-with-nextjs',
  },
  {
    title: 'Getting Started with NextJS',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is the React framework for production. It makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2022-02-10',
    slug: 'getting-started-with-nextjs-2',
  },
  {
    title: 'Getting Started with NextJS',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is the React framework for production. It makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2022-02-10',
    slug: 'getting-started-with-nextjs-3',
  },
  {
    title: 'Getting Started with NextJS',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is the React framework for production. It makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2022-02-10',
    slug: 'getting-started-with-nextjs-4',
  },
];

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
};

export default HomePage;
