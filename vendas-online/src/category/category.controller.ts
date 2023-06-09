import { Controller, Get } from '@nestjs/common';

import { CategoryService } from './category.service';

import { ReturnCategoryDTO } from './dtos/returnCategory.dto';

import { UserTypes } from '../decorators/user-type.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@UserTypes(UserType.User, UserType.Admin)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAllCategories(): Promise<ReturnCategoryDTO[]> {
    return (await this.categoryService.getAllCategories()).map(
      (category) => new ReturnCategoryDTO(category),
    );
  }
}
