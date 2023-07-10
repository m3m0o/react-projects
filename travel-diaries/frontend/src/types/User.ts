import { Post } from './Post';

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  posts: [Post];
  __v: number;
};
