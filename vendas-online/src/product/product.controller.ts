import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { DeleteResult } from 'typeorm';

import { UserTypes } from '../decorators/user-type.decorator';
import { UserType } from '../user/enum/user-type.enum';

import { ProductService } from './product.service';

import { ProductEntity } from './entities/product.entity';

import { CreateProductDTO } from './dtos/createProduct.dto';
import { ReturnProductDTO } from './dtos/returnProduct.dto';
import { UpdateProductDTO } from './dtos/updateProduct.dto';

@UserTypes(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UserTypes(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDTO);
  }

  @UserTypes(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:productId')
  async updateProduct(
    @Body() updatedProduct: UpdateProductDTO,
    @Param('productId') productId: number,
  ): Promise<ReturnProductDTO> {
    return new ReturnProductDTO(
      await this.productService.updateProduct(updatedProduct, productId),
    );
  }

  @UserTypes(UserType.Admin)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    return this.productService.deleteProduct(productId);
  }

  @Get()
  async getAllProducts(): Promise<ReturnProductDTO[]> {
    return (await this.productService.getAllProducts()).map(
      (product) => new ReturnProductDTO(product),
    );
  }

  @Get('/:productId')
  async getProductById(
    @Param('productId') productId: number,
  ): Promise<ReturnProductDTO> {
    return new ReturnProductDTO(
      await this.productService.getProductById(productId),
    );
  }
}
