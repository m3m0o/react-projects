import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentService } from '../payment/payment.service';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';
import { ProductService } from '../product/product.service';

import { OrderEntity } from './entities/order.entity';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

import { CreateOrderDTO } from './dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService,
  ) {}

  async saveOrder(
    userId: number,
    createOrderDTO: CreateOrderDTO,
    payment: PaymentEntity,
  ): Promise<OrderEntity> {
    const order = await this.orderRepository.save({
      userId,
      addressId: createOrderDTO.addressId,
      paymentId: payment.id,
      date: new Date(),
    });

    return order;
  }

  async createOrderProductsFromProductsInCart(
    cart: CartEntity,
    orderId: number,
    products: ProductEntity[],
  ): Promise<OrderProductEntity[]> {
    return Promise.all(
      cart.cartProducts?.map((cartProduct) =>
        this.orderProductService.createOrderProduct(
          cartProduct.productId,
          orderId,
          products.find((product) => product.id === cartProduct.productId)
            ?.price || 0,
          cartProduct.amount,
        ),
      ),
    );
  }

  async createOrder(createOrderDTO: CreateOrderDTO, userId: number) {
    const cart = await this.cartService.getActiveCart(userId, true);
    const products = await this.productService.getProductsByProductsId(
      cart.cartProducts?.map((cartProduct) => cartProduct.productId),
    );
    const payment: PaymentEntity = await this.paymentService.createPayment(
      createOrderDTO,
      products,
      cart,
    );
    const order = await this.saveOrder(userId, createOrderDTO, payment);

    await this.createOrderProductsFromProductsInCart(cart, order.id, products);

    await this.cartService.clearCart(userId);

    return order;
  }

  async getOrdersByUserId(userId: number) {
    const orders = await this.orderRepository.find({
      where: {
        userId,
      },
      relations: {
        address: true,
        orderProducts: {
          product: true,
        },
        payment: {
          paymentStatus: true,
        },
      },
    });

    if (!orders || orders.length === 0)
      throw new NotFoundException('User has no orders.');

    return orders;
  }
}
