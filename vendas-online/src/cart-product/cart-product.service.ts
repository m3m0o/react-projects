import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CartProductEntity } from './entities/cartProduct.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

import { InsertProductInCartDTO } from 'src/cart/dtos/insertProductInCart.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
  ) {}

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        cartId,
        productId,
      },
    });

    if (!cartProduct) throw new NotFoundException('Product not found in cart,');

    return cartProduct;
  }

  async createProductInCart(
    insertProductInCartDTO: InsertProductInCartDTO,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.cartProductRepository.save({
      cartId,
      productId: insertProductInCartDTO.productId,
      amount: insertProductInCartDTO.amount,
    });
  }

  async insertProductInCart(
    insertProductInCartDTO: InsertProductInCartDTO,
    cartEntity: CartEntity,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.verifyProductInCart(
      insertProductInCartDTO.productId,
      cartEntity.id,
    ).catch(() => undefined);

    if (!cartProduct)
      return this.createProductInCart(insertProductInCartDTO, cartEntity.id);

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + insertProductInCartDTO.amount,
    });
  }
}
