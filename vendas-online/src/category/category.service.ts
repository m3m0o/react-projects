import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryEntity } from './entities/category.entity';

import { CreateCategoryDTO } from './dtos/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0)
      throw new NotFoundException('Categories empty.');

    return categories;
  }

  async getCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (!category)
      throw new NotFoundException(`Category ${name} doesn't exists.`);

    return category;
  }

  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<CategoryEntity> {
    const category = await this.getCategoryByName(createCategoryDTO.name).catch(
      () => undefined,
    );

    if (category)
      throw new ConflictException(
        `Category ${createCategoryDTO.name} already exists.`,
      );

    return this.categoryRepository.save(createCategoryDTO);
  }
}
