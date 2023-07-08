import { Router } from 'express';

import { getAllPosts } from '../controllers/post-controllers';

const postRouter = Router();

postRouter.get('/', getAllPosts);

export default postRouter;
