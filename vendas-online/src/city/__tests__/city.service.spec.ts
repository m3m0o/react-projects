import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';

import { cityEntityMock } from '../__mocks__/city.mock';

import { CacheService } from '../../cache/cache.service';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityEntityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return an city', async () => {
    const city = await service.getCityById(cityEntityMock.id);

    expect(city).toEqual(cityEntityMock);
  });

  it('should return error (Not Found)', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.getCityById(cityEntityMock.id)).rejects.toThrowError();
  });

  it('should return all cities by stateId', async () => {
    const cities = await service.getAllCitiesByStateId(cityEntityMock.stateId);

    expect(cities).toEqual([cityEntityMock]);
  });
});
