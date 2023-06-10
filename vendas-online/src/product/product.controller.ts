import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';

import { UserTypes } from 'src/decorators/user-type.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

import { ProductService } from './product.service';

import { ProductEntity } from './entities/product.entity';

import { CreateProductDTO } from './dtos/createProduct.dto';
import { ReturnProductDTO } from './dtos/returnProduct.dto';

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
