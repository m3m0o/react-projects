import { OrderEntity } from '../entities/order.entity';

import { addressEntityMock } from '../../address/__mocks__/address.mock';
import { paymentMock } from '../../payment/__mocks__/payment.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';

export const orderMock: OrderEntity = {
  id: 1,
  addressId: addressEntityMock.id,
  userId: userEntityMock.id,
  paymentId: paymentMock.id,
  date: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
