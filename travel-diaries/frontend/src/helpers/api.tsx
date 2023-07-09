import { Post } from '../types/Post';

export const getAllPosts = async () => {
  const response = await fetch('http://localhost:5000/post');

  if (response.status !== 200) throw new Error('Some error ocurred.');

  const data = (await response.json()) as { posts: Post[] };

  return data.posts;
};
