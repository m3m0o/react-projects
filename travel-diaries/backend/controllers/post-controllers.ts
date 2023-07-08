import { Request, Response } from 'express';

import { startSession } from 'mongoose';

import { isValidString } from '../utils/validators';

import Post from '../models/Post';
import User from '../models/User';

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

  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    return response.status(404).json({ message: 'User not found.' });
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

    const session = await startSession();

    session.startTransaction();

    existingUser.posts.push(post as any);
    existingUser.save({ session });

    post = await post.save({ session });

    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }

  if (!post) {
    return response.status(500).json({ message: 'Unexpected error ocurred.' });
  }

  return response.status(201).json({ post });
};

export const updatePost = async (request: Request, response: Response) => {
  const id = request.params.id;
  const { title, description, location, date, image } = request.body;

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

  let post;

  try {
    post = await Post.findByIdAndUpdate(id, {
      title,
      description,
      location,
      date: new Date(`${date}`),
      image,
    });
  } catch (error) {
    return console.log(error);
  }

  if (!post) {
    return response.status(500).json({ message: 'Unable to update.' });
  }

  return response.status(200).json({ message: 'Updated Successfully !' });
};

export const deletePost = async (request: Request, response: Response) => {
  const id = request.params.id;

  let post;

  try {
    const session = await startSession();

    session.startTransaction();

    post = await Post.findById(id).populate('user');

    post.user.posts.pull(post);

    await post?.user.save({ session });
    post = await Post.findByIdAndDelete(id);

    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }

  if (!post) {
    return response.status(500).json({ message: 'Unable to delete.' });
  }

  return response.status(200).json({ message: 'Post deleted successfully !' });
};
