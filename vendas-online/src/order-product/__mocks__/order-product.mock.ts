import { OrderProductEntity } from '../entities/order-product.entity';

import { orderMock } from '../../order/__mocks__/order.mock';
import { productMock } from '../../product/__mocks__/product.mock';

export const orderProductMock: OrderProductEntity = {
  id: 1,
  orderId: orderMock.id,
  productId: productMock.id,
  amount: 1,
  price: productMock.price,
  createdAt: new Date(),
  updatedAt: new Date(),
};
