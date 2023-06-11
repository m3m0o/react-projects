import { productMock } from '../../product/__mocks__/product.mock';
import { UpdateCartDTO } from '../dtos/updateCart.dto';

export const updateCartMock: UpdateCartDTO = {
  amount: 1,
  productId: productMock.id,
};
