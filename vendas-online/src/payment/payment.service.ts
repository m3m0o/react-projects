import { Injectable, BadRequestException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentEntity } from './entities/payment.entity';
import { PaymentCreditCardEntity } from './entities/payment-credit-card.entity';
import { PaymentPixEntity } from './entities/payment-pix.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { CartEntity } from '../cart/entities/cart.entity';

import { CreateOrderDTO } from '../order/dtos/create-order.dto';

import { PaymentStatus } from '../payment-status/enums/payment-status.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  generateFinalPrice(cart: CartEntity, products: ProductEntity[]): number {
    return Number(
      cart.cartProducts
        ?.map((cartProduct) => {
          const product = products.find(
            (product) => product.id === cartProduct.productId,
          );

          if (product) return product.price * cartProduct.amount;

          return 0;
        })
        .reduce(
          (accumulatedPrice, currentPrice) => accumulatedPrice + currentPrice,
          0,
        )
        .toFixed(2),
    );
  }

  async createPayment(
    createOrderDTO: CreateOrderDTO,
    products: ProductEntity[],
    cart: CartEntity,
  ): Promise<PaymentEntity> {
    const finalPrice = this.generateFinalPrice(cart, products);

    if (createOrderDTO.amountPayments) {
      const paymentCreditCard = new PaymentCreditCardEntity(
        PaymentStatus.Done,
        finalPrice,
        0,
        finalPrice,
        createOrderDTO,
      );

      return this.paymentRepository.save(paymentCreditCard);
    } else if (createOrderDTO.codePix && createOrderDTO.datePayment) {
      const paymentPix = new PaymentPixEntity(
        PaymentStatus.Done,
        finalPrice,
        0,
        finalPrice,
        createOrderDTO,
      );

      return this.paymentRepository.save(paymentPix);
    } else throw new BadRequestException('Invalid payment method.');
  }
}
