import { CreateAddressDTO } from '../dtos/createAddress.dto';

import { addressEntityMock } from './address.mock';

export const createAddressMock: CreateAddressDTO = {
  cep: addressEntityMock.cep,
  cityId: addressEntityMock.cityId,
  complement: addressEntityMock.complement,
  addressNumber: addressEntityMock.addressNumber,
};
