import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { CityModule } from '../city/city.module';

import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), UserModule, CityModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
