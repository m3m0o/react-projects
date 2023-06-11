import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Delete,
  Param,
  Patch
} from '@nestjs/common';

import { DeleteResult } from 'typeorm';

import { UserId } from '../decorators/user-id.decorator';

import { UserTypes } from '../decorators/user-type.decorator';
import { UserType } from '../user/enum/user-type.enum';

import { InsertProductInCartDTO } from './dtos/insertProductInCart.dto';
import { UpdateCartDTO } from './dtos/updateCart.dto';
import { ReturnCartDTO } from './dtos/returnCart.dto';

import { CartService } from './cart.service';

@UserTypes(UserType.User)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async insertProductInCart(
    @Body() insertProductInCartDTO: InsertProductInCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.insertProductInCart(
        insertProductInCartDTO,
        userId,
      ),
    );
  }

  @UsePipes(ValidationPipe)
  @Patch()
  async updateProductInCart(@Body() updateCartDTO: UpdateCartDTO, @UserId() userId: number): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(await this.cartService.updateProductInCart(updateCartDTO, userId))
  }

  @Get()
  async getActiveCart(@UserId() userId: number): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(await this.cartService.getActiveCart(userId, true))
  }

  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }

  @Delete('/product/:productId')
  async deleteProductFromCart(@Param('productId') productId: number, @UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.deleteProductFromCart(productId, userId)
  }
}
