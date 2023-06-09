import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';

import { CreateAddressDTO } from './dtos/createAddress.dto';

import { AddressService } from './address.service';

import { AddressEntity } from './entities/address.entity';

import { UserTypes } from 'src/decorators/user-type.decorator';
import { UserId } from 'src/decorators/user-id.decorator';

import { UserType } from 'src/user/enum/user-type.enum';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UserTypes(UserType.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDTO: CreateAddressDTO,
    @UserId('userId') userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDTO, userId);
  }
}
