import express, { Express, Request, Response } from 'express';

import mongoose from 'mongoose';

import dotenv from 'dotenv';

import userRouter from './routing/user-routes';
import postRouter from './routing/post-routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middlewares
app.use(express.json());

app.use('/user', userRouter);

app.use('/post', postRouter);

// Connections
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cisli3v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    })
  )
  .catch((error) => console.log(error));
