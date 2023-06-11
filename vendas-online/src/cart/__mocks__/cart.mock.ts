import { CartEntity } from '../entities/cart.entity';

import { userEntityMock } from '../../user/__mocks__/user.mock';

export const cartMock: CartEntity = {
  id: 1,
  userId: userEntityMock.id,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  cartProducts: [],
};
