import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CartEntity } from './entities/cart.entity';

import { InsertProductInCartDTO } from './dtos/insertProductInCart.dto';
import { UpdateCartDTO } from './dtos/updateCart.dto';

import { CartProductService } from '../cart-product/cart-product.service';

const AFFECTED_LINES = 1;

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

  async clearCart(userId: number): Promise<DeleteResult> {
    const cart = await this.getActiveCart(userId);

    await this.cartRepository.save({
      ...cart,
      active: false
    })

    return {
      raw: [],
      affected: AFFECTED_LINES
    }
  }

  async getActiveCart(
    userId: number,
    withRelations?: boolean,
  ): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
      relations: withRelations
        ? {
            cartProducts: {
              product: true,
            },
          }
        : undefined,
    });

    if (!cart) throw new NotFoundException('User has no carts.');

    return cart;
  }

  async insertProductInCart(
    insertProductInCartDTO: InsertProductInCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.getActiveCart(userId, true).catch(
      async () => await this.createCart(userId),
    );

    await this.cartProductService.insertProductInCart(
      insertProductInCartDTO,
      cart,
    );

    return cart;
  }

  async updateProductInCart(updateCartDTO: UpdateCartDTO, userId: number): Promise<CartEntity> {
    const cart = await this.getActiveCart(userId).catch(() => this.createCart(userId));

    await this.cartProductService.updateProductInCart(updateCartDTO, cart);

    return cart;
  }

  async deleteProductFromCart(productId: number, userId: number): Promise<DeleteResult> {
    const cart = await this.getActiveCart(userId);

    return this.cartProductService.deleteProductFromCart(productId, cart.id);
  }
}
