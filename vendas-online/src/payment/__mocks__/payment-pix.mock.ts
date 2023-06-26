import { PaymentPixEntity } from '../entities/payment-pix.entity';

import { paymentMock } from './payment.mock';

export const paymentPixMock: PaymentPixEntity = {
  ...paymentMock,
  code: 'pix',
  datePayment: new Date('2020-01-01'),
};
