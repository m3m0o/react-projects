import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CityEntity } from './entities/city.entity';

import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(
      `cities_of_state_${stateId}`,
      () =>
        this.cityRepository.find({
          where: {
            stateId,
          },
        }),
    );
  }

  async getCityById(cityId: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) throw new NotFoundException(`city with id ${cityId} not found.`);

    return city;
  }
}
