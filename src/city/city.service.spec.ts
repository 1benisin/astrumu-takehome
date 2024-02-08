import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { StateService } from '../state/state.service';
import { v4 as uuid } from 'uuid';
import { CreateCityInput } from './city.input';

describe('CityService', () => {
  let service: CityService;
  let stateService: StateService;

  beforeEach(async () => {
    const stateServiceProvider = {
      provide: StateService,
      useFactory: () => ({
        create: jest.fn((stateInput) => ({
          id: uuid(),
          name: stateInput.name,
        })),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService, stateServiceProvider],
    }).compile();

    service = module.get<CityService>(CityService);
    stateService = module.get<StateService>(StateService);

    // Reset the cities array to a known state before each test
    service['cities'] = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a city', async () => {
      const cityInput: CreateCityInput = {
        name: 'Gotham',
        state: { name: 'New Jersey' },
      };

      const result = await service.create(cityInput);

      expect(result).toBeDefined();
      expect(result.name).toBe(cityInput.name);
      expect(stateService.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of cities', async () => {
      const city = await service.create({
        name: 'Metropolis',
        state: { name: 'New York' },
      });
      const cities = await service.findAll();

      expect(cities.length).toBeGreaterThan(0);
      expect(cities[0].id).toBe(city.id);
    });
  });

  describe('findById', () => {
    it('should return a city by its id', async () => {
      const city = await service.create({
        name: 'Star City',
        state: { name: 'California' },
      });
      const result = await service.findById(city.id);

      expect(result).toBeDefined();
      expect(result.id).toBe(city.id);
    });

    it('should throw an error if city not found by id', async () => {
      await expect(service.findById('non-existing-id')).rejects.toThrow();
    });
  });

  describe('findByNameAndState', () => {
    it('should return a city by its name and state', async () => {
      const city = await service.create({
        name: 'Star City',
        state: { name: 'California' },
      });
      const result = await service.findByNameAndState({
        name: city.name,
        state: { name: city.state.name },
      });

      expect(result).toBeDefined();
      expect(result.id).toBe(city.id);
    });

    it('should throw an error if city not found by name and state', async () => {
      const input = { name: 'Star City', state: { name: 'California' } };
      await expect(service.findByNameAndState(input)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a city by its id', async () => {
      const city = await service.create({
        name: 'Star City',
        state: { name: 'California' },
      });
      const result = await service.delete(city.id);

      expect(result).toBeDefined();
      expect(result.id).toBe(city.id);
      expect(service['cities'].length).toBe(0);
    });

    it('should throw an error if trying to delete a non-existing city', async () => {
      await expect(service.delete('non-existing-id')).rejects.toThrow(
        'City not found',
      );
    });
  });
});
