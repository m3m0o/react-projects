import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from './entities/product.entity';

import { CreateProductDTO } from './dtos/createProduct.dto';

import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async createProduct(
    createProductDTO: CreateProductDTO,
  ): Promise<ProductEntity> {
    await this.categoryService.getCategoryById(createProductDTO.categoryId);

    return this.productRepository.save(createProductDTO);
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();

    if (!products || products.length === 0)
      throw new NotFoundException('There are no products registered.');

    return products;
  }
}
