import { Post } from '../types/Post';

export const getAllPosts = async () => {
  const response = await fetch('http://localhost:5000/post');

  if (response.status !== 200) throw new Error('Some error ocurred.');

  const data = (await response.json()) as { posts: Post[] };

  return data.posts;
};

export const sendAuthRequest = async (
  signup: boolean,
  data: { name?: string; email: string; password: string }
) => {
  const response = await fetch(
    `http://localhost:5000/user/${signup ? 'signup' : 'login'}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    }
  ).catch((error) => {
    throw new Error(error as string);
  });

  if (response.status !== 200 && response.status !== 201)
    return console.log('Unable to authenticate.');

  const responseData = await response.json();

  return responseData;
};
