import { Request, Response } from 'express';

import Post from '../models/Post';

export const getAllPosts = async (request: Request, response: Response) => {
  let posts;

  try {
    posts = await Post.find();
  } catch (error) {
    return console.log(error);
  }

  if (!posts) {
    return response.status(500).json({ message: 'Unexpected error ocurred.' });
  }

  return response.status(200).json({ posts });
};
