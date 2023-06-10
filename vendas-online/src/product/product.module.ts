import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { ProductEntity } from './entities/product.entity';

import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CategoryModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
