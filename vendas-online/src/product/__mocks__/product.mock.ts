import { ProductEntity } from '../entities/product.entity';

import { categoryMock } from '../../category/__mocks__/category.mock';

export const productMock: ProductEntity = {
  id: 1,
  name: 'testName',
  categoryId: categoryMock.id,
  price: 2202,
  image: 'http://image.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};
