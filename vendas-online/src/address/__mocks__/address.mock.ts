import { AddressEntity } from '../entities/address.entity';

export const addressEntityMock: AddressEntity = {
  id: 1,
  userId: 1,
  complement: 'Rua Euclides da Cunha',
  addressNumber: 713,
  cep: '19900-043',
  cityId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
