import { PaymentEntity } from '../entities/payment.entity';

import { PaymentStatus } from '../../payment-status/enums/payment-status.enum';

export const paymentMock: PaymentEntity = {
  id: 1,
  statusId: PaymentStatus.Done,
  price: 2202,
  discount: 0,
  finalPrice: 2202,
  type: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
