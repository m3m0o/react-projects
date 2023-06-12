import { Injectable, BadRequestException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentEntity } from './entities/payment.entity';
import { PaymentCreditCardEntity } from './entities/payment-credit-card.entity';
import { PaymentPixEntity } from './entities/payment-pix.entity';

import { CreateOrderDTO } from '../order/dtos/create-order.dto';

import { PaymentStatus } from 'src/payment-status/enums/payment-status.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async createPayment(createOrderDTO: CreateOrderDTO): Promise<PaymentEntity> {
    if (createOrderDTO.amountPayments) {
      const paymentCreditCard = new PaymentCreditCardEntity(
        PaymentStatus.Done,
        0,
        0,
        0,
        createOrderDTO,
      );

      return this.paymentRepository.save(paymentCreditCard);
    } else if (createOrderDTO.codePix && createOrderDTO.datePayment) {
      const paymentPix = new PaymentPixEntity(
        PaymentStatus.Done,
        0,
        0,
        0,
        createOrderDTO,
      );

      return this.paymentRepository.save(paymentPix);
    } else throw new BadRequestException('Invalid payment method.');
  }
}
