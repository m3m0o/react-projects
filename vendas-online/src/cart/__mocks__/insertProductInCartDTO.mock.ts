import { InsertProductInCartDTO } from '../dtos/insertProductInCart.dto';

import { productMock } from '../../product/__mocks__/product.mock';

export const insertProductInCartDTOMock: InsertProductInCartDTO = {
  productId: productMock.id,
  amount: 1,
};
