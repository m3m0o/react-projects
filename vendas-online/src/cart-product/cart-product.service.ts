import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CartProductEntity } from './entities/cartProduct.entity';
import { CartEntity } from '../cart/entities/cart.entity';

import { InsertProductInCartDTO } from '../cart/dtos/insertProductInCart.dto';
import { UpdateCartDTO } from '../cart/dtos/updateCart.dto';

import { ProductService } from '../product/product.service';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
    private readonly productService: ProductService,
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
    await this.productService.getProductById(insertProductInCartDTO.productId);

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

  async updateProductInCart(updateCartDTO: UpdateCartDTO, cart: CartEntity): Promise<CartProductEntity> {
   const cartProduct = await this.verifyProductInCart(updateCartDTO.productId, cart.id);
   
   if (!cartProduct) throw new NotFoundException('Product is not in cart.');

   return this.cartProductRepository.save({
    ...cartProduct,
    amount: updateCartDTO.amount
   })
  }

  async deleteProductFromCart(productId: number, cartId: number): Promise<DeleteResult> {
    return this.cartProductRepository.delete({ cartId, productId })
  }
}
