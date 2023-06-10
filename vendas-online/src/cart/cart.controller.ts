import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Delete
} from '@nestjs/common';

import { DeleteResult } from 'typeorm';

import { UserId } from 'src/decorators/user-id.decorator';

import { UserTypes } from 'src/decorators/user-type.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

import { CartEntity } from './entities/cart.entity';

import { InsertProductInCartDTO } from './dtos/insertProductInCart.dto';
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

  @Get()
  async getActiveCart(@UserId() userId: number): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(await this.cartService.getActiveCart(userId, true))
  }

  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }
}
