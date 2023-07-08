import { Request, Response } from 'express';

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
