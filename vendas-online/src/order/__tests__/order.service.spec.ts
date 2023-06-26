import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OrderService } from '../order.service';

import { PaymentService } from '../../payment/payment.service';
import { CartService } from '../../cart/cart.service';
import { OrderProductService } from '../../order-product/order-product.service';
import { ProductService } from '../../product/product.service';

import { OrderEntity } from '../entities/order.entity';

import { orderMock } from '../__mocks__/order.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<OrderEntity>;
  let paymentService: PaymentService;
  let cartService: CartService;
  let orderProductService: OrderProductService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: { find: jest.fn().mockResolvedValue([orderMock]) },
        },
        {
          provide: PaymentService,
          useValue: { createPayment: jest.fn().mockResolvedValue('') },
        },
        {
          provide: CartService,
          useValue: {
            getCartByUderId: jest.fn().mockResolvedValue(''),
            clearCart: jest.fn().mockResolvedValue(''),
          },
        },
        {
          provide: OrderProductService,
          useValue: { createOrderProduct: jest.fn().mockResolvedValue('') },
        },
        {
          provide: ProductService,
          useValue: {
            getProductsByProductsId: jest.fn().mockResolvedValue(''),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
    paymentService = module.get<PaymentService>(PaymentService);
    cartService = module.get<CartService>(CartService);
    orderProductService = module.get<OrderProductService>(OrderProductService);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderRepository).toBeDefined();
    expect(paymentService).toBeDefined();
    expect(cartService).toBeDefined();
    expect(orderProductService).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return orders from an specified user given by userId', async () => {
    const orders = await service.getOrdersByUserId(userEntityMock.id);

    expect(orders).toEqual([orderMock]);
  });
});
