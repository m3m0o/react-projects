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

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDTO: CreateAddressDTO,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDTO, 1);
  }
}
