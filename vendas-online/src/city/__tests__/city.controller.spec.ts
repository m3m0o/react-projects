import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from '../city.controller';

import { CityService } from '../city.service';

import { citiesMock } from '../__mocks__/cities.mock';
import { stateEntityMock } from 'src/state/__mocks__/state.mock';

describe('CityController', () => {
  let controller: CityController;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CityService,
          useValue: {
            getAllCitiesByStateId: jest.fn().mockResolvedValue(citiesMock),
          },
        },
      ],
      controllers: [CityController],
    }).compile();

    controller = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cityService).toBeDefined();
  });

  // getAllCitiesByStateId
  it('should return CityEntity[] in getAllCitiesByStateId', async () => {
    const cities = await controller.getAllCitiesByStateId(stateEntityMock.id);

    expect(cities).toEqual(citiesMock);
  });
});
