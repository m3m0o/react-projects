import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentModule } from 'src/payment/payment.module';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

import { OrderEntity } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), PaymentModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
