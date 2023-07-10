import { Router } from 'express';

import {
  getAllUsers,
  login,
  signUp,
  getUserById,
} from '../controllers/user-controllers';

const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/signup', signUp);

userRouter.post('/login', login);

export default userRouter;
