import { CartProductEntity } from '../entities/cartProduct.entity';

import { cartMock } from '../../cart/__mocks__/cart.mock';
import { productMock } from '../../product/__mocks__/product.mock';

export const cartProductMock: CartProductEntity = {
  id: 1,
  cartId: cartMock.id,
  productId: productMock.id,
  amount: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
