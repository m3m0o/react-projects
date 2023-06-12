import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, In } from 'typeorm';

import { ProductEntity } from './entities/product.entity';

import { CreateProductDTO } from './dtos/createProduct.dto';
import { UpdateProductDTO } from './dtos/updateProduct.dto';

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

  async updateProduct(
    updateProductDTO: UpdateProductDTO,
    productId: number,
  ): Promise<ProductEntity> {
    const product = await this.getProductById(productId);

    return this.productRepository.save({
      ...product,
      ...updateProductDTO,
    });
  }

  async deleteProduct(productId: number): Promise<DeleteResult> {
    await this.getProductById(productId);

    return this.productRepository.delete({ id: productId });
  }

  async getProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) throw new NotFoundException('Product not found.');

    return product;
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();

    if (!products || products.length === 0)
      throw new NotFoundException('There are no products registered.');

    return products;
  }

  async getProductsByProductsId(
    productsId: number[],
  ): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      where: {
        id: In(productsId),
      },
    });

    if (!products || products.length === 0)
      throw new NotFoundException('There are no products registered.');

    return products;
  }
}
