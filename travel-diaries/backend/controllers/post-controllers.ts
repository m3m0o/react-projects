import { Request, Response } from 'express';

import { isValidString } from '../utils/validators';

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

export const getPostById = async (request: Request, response: Response) => {
  const id = request.params.id;

  let post;

  try {
    post = await Post.findById(id);
  } catch (error) {
    return console.log(error);
  }

  if (!post) {
    return response.status(404).json({ message: 'No post found.' });
  }

  return response.status(200).json({ post });
};

export const createPost = async (request: Request, response: Response) => {
  const { title, description, location, date, image, user } = request.body;

  if (!isValidString(title)) {
    return response.status(422).json({ message: 'Invalid title.' });
  }

  if (!isValidString(description)) {
    return response.status(422).json({ message: 'Invalid description.' });
  }

  if (!isValidString(location)) {
    return response.status(422).json({ message: 'Invalid location.' });
  }

  if (!date) {
    return response.status(422).json({ message: 'Invalid date.' });
  }

  if (!isValidString(image)) {
    return response.status(422).json({ message: 'Invalid image path.' });
  }

  if (!isValidString(user)) {
    return response.status(422).json({ message: 'Invalid user.' });
  }

  let post;

  try {
    post = new Post({
      title,
      description,
      location,
      date: new Date(`${date}`),
      image,
      user,
    });

    post = await post.save();
  } catch (error) {
    return console.log(error);
  }

  if (!post) {
    return response.status(500).json({ message: 'Unexpected error ocurred.' });
  }

  return response.status(201).json({ post });
};
