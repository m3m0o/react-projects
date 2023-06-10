import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';

import { CategoryService } from './category.service';

import { CreateCategoryDTO } from './dtos/createCategory.dto';
import { ReturnCategoryDTO } from './dtos/returnCategory.dto';

import { UserTypes } from '../decorators/user-type.decorator';
import { UserType } from '../user/enum/user-type.enum';

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

  @UserTypes(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<ReturnCategoryDTO> {
    const category = await this.categoryService.createCategory(
      createCategoryDTO,
    );

    return new ReturnCategoryDTO(category);
  }
}
