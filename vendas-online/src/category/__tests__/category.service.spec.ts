import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';

import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CategoryEntity } from '../entities/category.entity';

import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/createCategory.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(categoryMock),
            find: jest.fn().mockResolvedValue([categoryMock]),
            findOne: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all categories', async () => {
    const categories = await service.getAllCategories();

    expect(categories).toEqual([categoryMock]);
  });

  it('should return error if list of categories is empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    expect(service.getAllCategories()).rejects.toThrowError();
  });

  it('should return error in list category exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    expect(service.getAllCategories()).rejects.toThrowError();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    const category = await service.createCategory(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });

  it('should return error if category name already exists', async () => {
    expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  });

  it('should return error in exception', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());

    expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  });

  it('should return category by specified name', async () => {
    const category = await service.getCategoryByName(createCategoryMock.name);

    expect(category).toEqual(categoryMock);
  });

  it('should return error if given category name is empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.getCategoryByName(createCategoryMock.name),
    ).rejects.toThrowError();
  });
});
