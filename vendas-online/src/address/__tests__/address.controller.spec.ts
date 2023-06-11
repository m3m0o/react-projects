import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../address.controller';

import { AddressService } from '../address.service';

import { ReturnAddressDTO } from '../dtos/returnAddress.dto';

import { createAddressMock } from '../__mocks__/createAddress.mock';
import { userEntityMock } from 'src/user/__mocks__/user.mock';
import { addressEntityMock } from '../__mocks__/address.mock';

describe('AddressController', () => {
  let controller: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AddressService,
          useValue: {
            createAddress: jest.fn().mockResolvedValue(createAddressMock),
          },
        },
      ],
      controllers: [AddressController],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(addressService).toBeDefined();
  });

  // createAddress
  it('should return AddressEntity', async () => {
    const address = await controller.createAddress(
      createAddressMock,
      userEntityMock.id,
    );

    expect(address).toEqual(createAddressMock);
  });

  // getAddressByUserId
  it('should return ReturnAddressDTO[]', async () => {
    const addresses = await controller.getAdressesByUserId(userEntityMock.id);

    expect(addresses).toEqual([new ReturnAddressDTO(addressEntityMock)]);
  });
});
