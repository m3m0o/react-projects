import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentService } from '../payment.service';

import { PaymentStatus } from '../../payment-status/enums/payment-status.enum';

import { PaymentEntity } from '../entities/payment.entity';
import { PaymentCreditCardEntity } from '../entities/payment-credit-card.entity';
import { PaymentPixEntity } from '../entities/payment-pix.entity';

import { paymentMock } from '../__mocks__/payment.mock';
import {
  createInvalidOrderMock,
  createOrderCreditCardMock,
  createOrderPixMock,
} from '../../order/__mocks__/create-order.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { paymentPixMock } from '../__mocks__/payment-pix.mock';
import { paymentCreditCardMock } from '../__mocks__/payment-credit-card.mock';
import { cartProductMock } from '../../cart-product/__mocks__/productCart.mock';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: Repository<PaymentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(PaymentEntity),
          useValue: { save: jest.fn().mockResolvedValue(paymentMock) },
        },
        PaymentService,
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<Repository<PaymentEntity>>(
      getRepositoryToken(PaymentEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(paymentRepository).toBeDefined();
  });

  it('should return PaymentEntity after saving credit card payment in DB', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await service.createPayment(
      createOrderCreditCardMock,
      [productMock],
      cartMock,
    );

    const savedPayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    expect(payment).toEqual(paymentMock);
    expect(savedPayment.amountPayments).toEqual(
      paymentCreditCardMock.amountPayments,
    );
  });

  it('should return PaymentEntity after saving PIX payment in DB', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await service.createPayment(
      createOrderPixMock,
      [productMock],
      cartMock,
    );

    const savedPayment: PaymentPixEntity = spy.mock
      .calls[0][0] as PaymentPixEntity;

    expect(payment).toEqual(paymentMock);
    expect(savedPayment.code).toEqual(paymentPixMock.code);
  });

  it('should return expection after trying to save invalid payment in DB', async () => {
    expect(
      service.createPayment(createInvalidOrderMock, [productMock], cartMock),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should return finalPrice 0 if cartProducts is undefined', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await service.createPayment(
      createOrderCreditCardMock,
      [productMock],
      cartMock,
    );

    const savedPayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    expect(payment).toEqual(paymentMock);
    expect(savedPayment.finalPrice).toEqual(0);
  });

  it('should return finalPrice', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await service.createPayment(
      createOrderCreditCardMock,
      [productMock],
      { ...cartMock, cartProducts: [cartProductMock] },
    );

    const savedPayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    expect(payment).toEqual(paymentMock);
    expect(savedPayment.finalPrice).toEqual(
      cartProductMock.amount * productMock.price,
    );
  });

  it('should all correct data after saving payment in DB', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');

    const payment = await service.createPayment(
      createOrderCreditCardMock,
      [productMock],
      { ...cartMock, cartProducts: [cartProductMock] },
    );

    const savedPayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    const paymentCreditCard: PaymentCreditCardEntity =
      new PaymentCreditCardEntity(
        PaymentStatus.Done,
        cartProductMock.amount * productMock.price,
        0,
        cartProductMock.amount * productMock.price,
        createOrderCreditCardMock,
      );

    expect(payment).toEqual(paymentMock);
    expect(savedPayment).toEqual(paymentCreditCard);
  });
});
