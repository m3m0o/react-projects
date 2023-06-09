import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
} from '@nestjs/common';

import { CreateAddressDTO } from './dtos/createAddress.dto';

import { AddressService } from './address.service';

import { AddressEntity } from './entities/address.entity';

import { UserTypes } from 'src/user/decorators/user-type.decorator';

import { UserType } from 'src/user/enum/user-type.enum';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UserTypes(UserType.User)
  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDTO: CreateAddressDTO,
    @Param('userId') userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDTO, userId);
  }
}
