import Head from 'next/head';

import { Post } from '@/types/post';

import { getFeaturedPosts } from '@/utils/posts-util';

import Hero from '@/components/home-page/Hero';
import FeaturedPosts from '@/components/home-page/FeaturedPosts';

interface HomePageProps {
  posts: Post[];
}

const HomePage = (props: HomePageProps) => {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>Guilherme's Blog</title>
        <meta
          name='description'
          content='I post about programming and web development.'
        />
      </Head>

      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
};

export default HomePage;
