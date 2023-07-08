import { Router } from 'express';

import { createPost, getAllPosts } from '../controllers/post-controllers';

const postRouter = Router();

postRouter.get('/', getAllPosts);
postRouter.post('/', createPost);

export default postRouter;
