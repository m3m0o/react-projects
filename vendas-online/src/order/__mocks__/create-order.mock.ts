import { CreateOrderDTO } from '../dtos/create-order.dto';

import { addressEntityMock } from '../../address/__mocks__/address.mock';
import { paymentCreditCardMock } from '../../payment/__mocks__/payment-credit-card.mock';
import { paymentPixMock } from '../../payment/__mocks__/payment-pix.mock';

export const createOrderCreditCardMock: CreateOrderDTO = {
  addressId: addressEntityMock.id,
  amountPayments: paymentCreditCardMock.amountPayments,
};

export const createOrderPixMock: CreateOrderDTO = {
  addressId: addressEntityMock.id,
  codePix: paymentPixMock.code,
  datePayment: '2020-01-01',
};

export const createInvalidOrderMock = {
  addressId: 1,
};
