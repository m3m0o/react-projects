import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { Post } from '@/types/post';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

export const getPostData = (fileName: string): Post => {
  const postSlug = fileName.replace(/\.md$/, '');

  const filePath = path.join(POSTS_DIRECTORY, `${postSlug}.md`);

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);

  const post = {
    slug: postSlug,
    content,
    ...data,
  };

  return post as Post;
};

export const getPostsFiles = () => {
  return fs.readdirSync(POSTS_DIRECTORY);
};

export const getAllPosts = (): Post[] => {
  const postFiles = getPostsFiles();

  const posts = postFiles.map((file) => getPostData(file));

  const sortedPosts = posts.sort((currentPost, nextPost) =>
    currentPost.date > nextPost.date ? -1 : 1
  );

  return sortedPosts;
};

export const getFeaturedPosts = (): Post[] => {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => post.isFeatured);
};
