import { Router } from 'express';

import { getAllUsers, signUp } from '../controllers/user-controllers';

const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.post('/signup', signUp);

export default userRouter;
