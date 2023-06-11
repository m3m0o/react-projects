import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from '../../product/product.service';
import { productMock } from '../../product/__mocks__/product.mock';
import { Repository } from 'typeorm';
import { CartProductService } from '../cart-product.service';
import { CartProductEntity } from '../entities/cartProduct.entity';
import { deleteResultMock } from '../../__mocks__/deleteResult.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { insertProductInCartDTOMock } from '../../cart/__mocks__/insertProductInCartDTO.mock';
import { cartProductMock } from '../__mocks__/productCart.mock';
import { NotFoundException } from '@nestjs/common';
import { updateCartMock } from '../../cart/__mocks__/updateCart.mock';

describe('CartProductService', () => {
  let service: CartProductService;
  let productService: ProductService;
  let cartProductRepository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProductById: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cartProductMock),
            save: jest.fn().mockResolvedValue(cartProductMock),
            delete: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
        CartProductService,
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });

  it('should return Delete Result after delete product', async () => {
    const deleteResult = await service.deleteProductFromCart(
      productMock.id,
      cartMock.id,
    );

    expect(deleteResult).toEqual(deleteResultMock);
  });

  it('should return error in exception delete', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());

    expect(
      service.deleteProductFromCart(productMock.id, cartMock.id),
    ).rejects.toThrowError();
  });

  it('should return CartProduct after create', async () => {
    const productCart = await service.createProductInCart(
      insertProductInCartDTOMock,
      cartMock.id,
    );

    expect(productCart).toEqual(cartProductMock);
  });

  it('should return error in exception delete', async () => {
    jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.createProductInCart(insertProductInCartDTOMock, cartMock.id),
    ).rejects.toThrowError();
  });

  it('should return CartProduct if exist', async () => {
    const productCart = await service.verifyProductInCart(
      productMock.id,
      cartMock.id,
    );

    expect(productCart).toEqual(cartProductMock);
  });

  it('should return error if not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return error in exception verifyProductInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(Error);
  });

  it('should return error in exception verifyProductInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(Error);
  });

  it('should return error in exception insertProductInCart', async () => {
    jest
      .spyOn(productService, 'getProductById')
      .mockRejectedValue(new NotFoundException());

    expect(
      service.insertProductInCart(insertProductInCartDTOMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product if not exist cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    const cartProduct = await service.insertProductInCart(
      insertProductInCartDTOMock,
      cartMock,
    );

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(
      insertProductInCartDTOMock.amount,
    );
  });

  it('should return cart product if not exist cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.insertProductInCart(
      insertProductInCartDTOMock,
      cartMock,
    );

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...cartProductMock,
      amount: cartProductMock.amount + insertProductInCartDTOMock.amount,
    });
  });

  it('should return error in exception updateProductInCart', async () => {
    jest
      .spyOn(productService, 'getProductById')
      .mockRejectedValue(new NotFoundException());

    expect(
      service.updateProductInCart(updateCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product if not exist cart (updateProductInCart)', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updateProductInCart(updateCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product if not exist cart (updateProductInCart)', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.updateProductInCart(
      updateCartMock,
      cartMock,
    );

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(updateCartMock.amount);
  });
});
