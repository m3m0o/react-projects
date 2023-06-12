import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../cart.controller';

import { CartService } from '../cart.service';

import { ReturnCartDTO } from '../dtos/returnCart.dto';

import { cartMock } from '../__mocks__/cart.mock';
import { insertProductInCartDTOMock } from '../__mocks__/insertProductInCartDTO.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { updateCartMock } from '../__mocks__/updateCart.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { deleteResultMock } from '../../__mocks__/deleteResult.mock';

describe('CartController', () => {
  let controller: CartController;
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CartService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(cartMock),
            updateProductInCart: jest.fn().mockResolvedValue(cartMock),
            getActiveCart: jest.fn().mockResolvedValue(cartMock),
            clearCart: jest.fn().mockResolvedValue(deleteResultMock),
            deleteProductFromCart: jest
              .fn()
              .mockResolvedValue(deleteResultMock),
          },
        },
      ],
      controllers: [CartController],
    }).compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cartService).toBeDefined();
  });

  // insertProductInCart()
  it('should return ReturnCartDTO in inserProductInCart', async () => {
    const cart = await controller.insertProductInCart(
      insertProductInCartDTOMock,
      userEntityMock.id,
    );

    expect(cart).toEqual(new ReturnCartDTO(cartMock));
  });

  // updateProductInCart()
  it('should return ReturnCartDTO in updateProductInCart', async () => {
    const cart = await controller.updateProductInCart(
      updateCartMock,
      userEntityMock.id,
    );

    expect(cart).toEqual(new ReturnCartDTO(cartMock));
  });

  // getActiveCart()
  it('should return ReturnCartDTO in getActiveCart', async () => {
    const cart = await controller.getActiveCart(userEntityMock.id);

    expect(cart).toEqual(new ReturnCartDTO(cartMock));
  });

  // clearCart()
  it('should return DeleteResult in clearCart', async () => {
    const deleteResult = controller.clearCart(userEntityMock.id);

    expect(deleteResult).toEqual(deleteResultMock);
  });

  // deleteProductFromCart()
  it('should return DeleteResult in deleteProductFromCart', async () => {
    const deleteResult = await controller.deleteProductFromCart(
      productMock.id,
      userEntityMock.id,
    );

    expect(deleteResult).toEqual(deleteResultMock);
  });
});
