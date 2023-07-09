import { Request, Response } from 'express';

import { compareSync, hashSync } from 'bcrypt';

import {
  isValidName,
  isValidEmail,
  isValidPassword,
} from '../utils/validators';

import User from '../models/User';

export const getAllUsers = async (request: Request, response: Response) => {
  let users;

  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }

  if (!users) {
    return response.status(500).json({ message: 'Unexpected error ocurred.' });
  }

  return response.status(200).json({ users });
};

export const signUp = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  if (!isValidName(name)) {
    response.status(422).json({ message: 'Invalid name.' });
  }

  if (!isValidEmail(email)) {
    response.status(422).json({ message: 'Invalid e-mail.' });
  }

  if (!isValidPassword(password)) {
    response.status(422).json({
      message:
        'Invalid password. Note that your password must have a minimum length of 8 characters, including an uppercase letter, a lowercase letter, a special character and a number.',
    });
  }

  const hashedPassword = hashSync(password, 10);

  let user;

  try {
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return response.status(500).json({ message: 'Unexpected error ocurred.' });
  }

  return response.status(201).json({ user });
};

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return response
      .status(400)
      .json({ message: 'Invalid e-mail or password.' });
  }

  const isPasswordCorrect = compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return response
      .status(400)
      .json({ message: 'Invalid e-mail or password.' });
  }

  return response
    .status(200)
    .json({ user: existingUser, message: 'Login successfull !' });
};
