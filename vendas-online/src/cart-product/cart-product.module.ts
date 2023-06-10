import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartProductService } from './cart-product.service';

import { CartProductEntity } from './entities/cartProduct.entity';

import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity]), ProductModule],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
