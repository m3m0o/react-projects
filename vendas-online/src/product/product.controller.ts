import { Controller, Get } from '@nestjs/common';

import { UserTypes } from 'src/decorators/user-type.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

import { ProductService } from './product.service';

import { ReturnProductDTO } from './dtos/returnProduct.dto';

@UserTypes(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<ReturnProductDTO[]> {
    return (await this.productService.getAllProducts()).map(
      (product) => new ReturnProductDTO(product),
    );
  }
}
