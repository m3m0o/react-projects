import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddressEntity } from './entities/address.entity';

import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

import { CreateAddressDTO } from './dtos/createAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddressDTO: CreateAddressDTO,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.getUserById(userId);
    await this.cityService.getCityById(createAddressDTO.cityId);

    return this.addressRepository.save({
      ...createAddressDTO,
      userId,
    });
  }
}
