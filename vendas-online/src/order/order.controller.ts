import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';

import { OrderService } from './order.service';

import { OrderEntity } from './entities/order.entity';

import { UserId } from 'src/decorators/user-id.decorator';

import { CreateOrderDTO } from './dtos/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(ValidationPipe)
  @Post('')
  async createOrder(
    @Body() createOrderDTO: CreateOrderDTO,
    @UserId() userId: number,
  ) {
    return this.orderService.createOrder(createOrderDTO, userId);
  }

  @Get()
  async getOrdersByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
    return this.orderService.getOrdersByUserId(userId);
  }
}
