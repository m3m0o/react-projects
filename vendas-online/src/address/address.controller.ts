import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
} from '@nestjs/common';

import { CreateAddressDTO } from './dtos/createAddress.dto';
import { ReturnAddressDTO } from './dtos/returnAddress.dto';

import { AddressService } from './address.service';

import { AddressEntity } from './entities/address.entity';

import { UserTypes } from '../decorators/user-type.decorator';
import { UserId } from '../decorators/user-id.decorator';

import { UserType } from '../user/enum/user-type.enum';

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

  @UserTypes(UserType.User, UserType.Admin)
  @Get()
  async getAdressesByUserId(
    @Body() createAddressDTO: CreateAddressDTO,
    @UserId('userId') userId: number,
  ): Promise<ReturnAddressDTO[]> {
    return (await this.addressService.getAddressesByUserId(userId)).map(
      (address) => new ReturnAddressDTO(address),
    );
  }
}
