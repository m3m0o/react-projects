import { Router } from 'express';

import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
} from '../controllers/post-controllers';

const postRouter = Router();

postRouter.get('/', getAllPosts);

postRouter.get('/:id', getPostById);

postRouter.post('/', createPost);

postRouter.put('/:id', updatePost);

export default postRouter;
