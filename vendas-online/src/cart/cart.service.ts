import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CartEntity } from './entities/cart.entity';

import { InsertProductInCartDTO } from './dtos/insertProductInCart.dto';

import { CartProductService } from 'src/cart-product/cart-product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async createCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({
      userId,
      active: true,
    });
  }

  async verifyActiveCart(userId: number): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({
      where: {
        userId,
      },
    });

    if (!cart) throw new NotFoundException('User has no carts.');

    return cart;
  }

  async insertProductInCart(
    insertProductInCartDTO: InsertProductInCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.verifyActiveCart(userId).catch(
      async () => await this.createCart(userId),
    );

    await this.cartProductService.insertProductInCart(
      insertProductInCartDTO,
      cart,
    );

    return cart;
  }
}
