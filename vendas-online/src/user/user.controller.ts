import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
  Param,
  Patch,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

import { UserId } from '../decorators/user-id.decorator';

import { CreateUserDTO } from './dtos/createUser.dto';
import { ReturnUserDTO } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/updatePassword.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUserDTO);
  }

  @UsePipes(ValidationPipe)
  @Patch()
  async updatePassword(
    @UserId('userId') userId: number,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<UserEntity> {
    return this.userService.updatePassword(updatePasswordDTO, userId);
  }

  @Get()
  async getAllUsers(): Promise<ReturnUserDTO[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDTO(userEntity),
    );
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDTO> {
    return new ReturnUserDTO(
      await this.userService.getUserByIdUsingRelations(userId),
    );
  }
}
