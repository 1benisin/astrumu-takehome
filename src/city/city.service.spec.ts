import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { CityResolver } from './city.resolver';
import { StateService } from '../state/state.service';

describe('CityService', () => {
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService, CityResolver, StateService],
    }).compile();

    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
