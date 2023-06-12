import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';

import { CategoryService } from '../category.service';
import { categoriesMock } from '../__mocks__/categories.mock';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/createCategory.mock';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getAllCategories: jest.fn().mockResolvedValue(categoriesMock),
            createCategoryMock: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  // getAllCategories()
  it('should return ReturnCategoryDTO[] in getAllCategories', async () => {
    const categories = await controller.getAllCategories();

    expect(categories).toEqual(categoriesMock);
  });

  // createCategory()
  it('should return ReturnCategoryDTO in createCategory', async () => {
    const category = await controller.createCategory(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });
});
