import { AddressEntity } from '../entities/address.entity';

import { ReturnCityDTO } from 'src/city/dto/returnCity.dto';

export class ReturnAddressDTO {
  complement: string;
  addressNumber: number;
  cep: string;
  city?: ReturnCityDTO;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.addressNumber = address.addressNumber;
    this.cep = address.cep;
    this.city = address.city ? new ReturnCityDTO(address.city) : undefined;
  }
}
