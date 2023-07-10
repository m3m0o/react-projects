import { Post } from '../types/Post';
import { User } from '../types/User';

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

export const createPost = async (post: Post) => {
  const response = await fetch('http://localhost:5000/post/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...post, user: localStorage.getItem('userId') }),
  }).catch((error) => {
    throw new Error(error as string);
  });

  if (response.status !== 201) return console.log('Unexpected error ocurred.');

  const data = (await response.json()) as { post: Post };

  return data;
};

export const getPostDetails = async (id: string) => {
  const response = await fetch(`http://localhost:5000/post/${id}`).catch(
    (error) => {
      throw new Error(error as string);
    }
  );

  if (response.status !== 200) return console.log('Unable to fetch diary.');

  const data = (await response.json()) as { post: Post };

  return data;
};

export const updatePost = async (post: Post) => {
  const response = await fetch(`http://localhost:5000/post/${post._id!}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  }).catch((error) => {
    throw new Error(error as string);
  });

  if (response.status !== 200) return console.log('Unable to update');

  const data = (await response.json()) as { post: Post };

  return data;
};

export const deletePost = async (id: string) => {
  const response = await fetch(`http://localhost:5000/post/${id}`, {
    method: 'DELETE',
  });

  if (response.status !== 200) return console.log('Unable to delete');

  const data = (await response.json()) as { message: string };

  return data;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem('userId');

  const response = await fetch(`http://localhost:5000/user/${id}`).catch(
    (error) => {
      throw new Error(error as string);
    }
  );

  if (response.status !== 200) return console.log('No user found.');

  const data = (await response.json()) as User;

  return data;
};
