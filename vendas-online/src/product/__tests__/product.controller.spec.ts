import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';

import { ProductService } from '../product.service';

import { ReturnProductDTO } from '../dtos/returnProduct.dto';

import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/createProduct.mock';
import { updateProductMock } from '../__mocks__/updateProduct.mock';
import { deleteResultMock } from 'src/__mocks__/deleteResult.mock';
import { productsMock } from '../__mocks__/products.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            createProduct: jest.fn().mockResolvedValue(productMock),
            updateProduct: jest
              .fn()
              .mockResolvedValue(new ReturnProductDTO(productMock)),
            deleteProduct: jest.fn().mockResolvedValue(deleteResultMock),
            getAllProducts: jest.fn().mockResolvedValue(productsMock),
            getProductById: jest
              .fn()
              .mockResolvedValue(new ReturnProductDTO(productMock)),
          },
        },
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(productService).toBeDefined();
  });

  // createProduct
  it('should return ProductEntity in createProduct', async () => {
    const product = await controller.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  // updateProduct
  it('should return ReturnProductDTO in updateProduct', async () => {
    const product = await controller.updateProduct(
      updateProductMock,
      productMock.id,
    );

    expect(product).toEqual(new ReturnProductDTO(productMock));
  });

  // deleteProduct
  it('should return DeleteResult in deleteProduct', async () => {
    const deleteResult = await controller.deleteProduct(productMock.id);

    expect(deleteResult).toEqual(deleteResultMock);
  });

  // getAllProducts
  it('should return ReturnProductDTO[] in getAllProducts', async () => {
    const products = await controller.getAllProducts();

    expect(products).toEqual(productsMock);
  });

  // getProductById
  it('should return ReturnProductDTO in getProductById', async () => {
    const product = await controller.getProductById(productMock.id);

    expect(product).toEqual(new ReturnProductDTO(productMock));
  });
});
