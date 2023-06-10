import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ProductService } from '../product.service';
import { CategoryService } from '../../category/category.service';

import { ProductEntity } from '../entities/product.entity';

import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/createProduct.mock';

import { categoryMock } from '../../category/__mocks__/category.mock';
import { deleteResultMock } from '../../__mocks__/deleteResult.mock';
import { updateProductMock } from '../__mocks__/updateProduct.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            getCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findOne: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.getAllProducts();

    expect(products).toEqual([productMock]);
  });

  it('should return error if products is empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(service.getAllProducts()).rejects.toThrowError();
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.getAllProducts()).rejects.toThrowError();
  });

  it('should return product after inserted in DB', async () => {
    const product = await service.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return error in exception', async () => {
    jest
      .spyOn(categoryService, 'getCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(createProductMock)).rejects.toThrowError();
  });

  it('should return product by specified ID', async () => {
    const product = await service.getProductById(productMock.id);

    expect(product).toEqual(productMock);
  });

  it('should return error if product of specified is not found', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.getProductById(productMock.id)).rejects.toThrowError();
  });

  it('should return DeleteResult if product was deleted', async () => {
    const deleteResult = await service.deleteProduct(productMock.id);

    expect(deleteResult).toEqual(deleteResultMock);
  });

  it('should return product after update', async () => {
    const updatedProduct = await service.updateProduct(
      updateProductMock,
      productMock.id,
    );

    expect(updatedProduct).toEqual(productMock);
  });

  it('should return error in update product', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.updateProduct(updateProductMock, productMock.id),
    ).rejects.toThrowError();
  });
});
