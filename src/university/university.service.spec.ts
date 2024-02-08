import { Test, TestingModule } from '@nestjs/testing';
import { UniversityService } from './university.service';
import { CityService } from '../city/city.service';
import {
  CreateUniversityInput,
  UpdateUniversityInput,
} from './university.input';
import { UniversityType } from './university.type';
import { CityType } from '../city/city.type';
import { v4 as uuid } from 'uuid';

describe('UniversityService', () => {
  let service: UniversityService;
  let mockCityService: Partial<CityService>;

  beforeEach(async () => {
    mockCityService = {
      create: jest.fn(
        (input) =>
          Promise.resolve({
            id: uuid(),
            name: input.name,
            state: {
              id: uuid(),
              name: input.state.name,
            },
          }) as Promise<CityType>,
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UniversityService,
        { provide: CityService, useValue: mockCityService },
      ],
    }).compile();

    service = module.get<UniversityService>(UniversityService);

    // Reset the universities array to a known state before each test
    UniversityService.universities = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a university', async () => {
      const createUniversityInput: CreateUniversityInput = {
        name: 'University of Gotham',
        city: {
          name: 'Gotham',
          state: {
            name: 'New Jersey',
          },
        },
      };
      const result = await service.create(createUniversityInput);

      expect(result).toBeDefined();
      expect(result.name).toBe(createUniversityInput.name);
      expect(mockCityService.create).toHaveBeenCalledWith(
        createUniversityInput.city,
      );
      expect(UniversityService.universities).toContainEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all universities', async () => {
      // Assuming create method adds universities to the `universities` array
      const university = await service.create({
        name: 'University of Gotham',
        city: {
          name: 'Gotham',
          state: {
            name: 'New Jersey',
          },
        },
      });

      const universities = await service.findAll();

      expect(universities.length).toBeGreaterThan(0);
      expect(universities).toContainEqual(
        expect.objectContaining({ name: university.name }),
      );
    });
  });

  describe('findById', () => {
    it('should return a university by its id', async () => {
      const university = await service.create({
        name: 'University of Gotham',
        city: {
          name: 'Gotham',
          state: {
            name: 'New Jersey',
          },
        },
      });

      const foundUniversity = await service.findById(university.id);

      expect(foundUniversity).toBeDefined();
      expect(foundUniversity.id).toBe(university.id);
    });

    it('should throw an error if university not found by id', async () => {
      const nonExistingId = uuid();
      await expect(service.findById(nonExistingId)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update an existing university', async () => {
      const university = await service.create({
        name: 'University of Gotham',
        city: {
          name: 'Gotham',
          state: {
            name: 'New Jersey',
          },
        },
      });

      // change the name of the university to superman related theme
      const updateInput: UpdateUniversityInput = {
        name: 'University of Metropolis',
      };

      const updatedUniversity = await service.update(
        university.id,
        updateInput,
      );

      expect(updatedUniversity).toBeDefined();
      expect(updatedUniversity.name).toBe(updateInput.name);
      expect(updatedUniversity.city.name).toBe(university.city.name);
    });

    it('should throw an error if trying to update a non-existing university', async () => {
      const nonExistingId = uuid();
      await expect(service.update(nonExistingId, {})).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a university by its id', async () => {
      const university = await service.create({
        name: 'University of Gotham',
        city: {
          name: 'Gotham',
          state: {
            name: 'New Jersey',
          },
        },
      });

      const deletedUniversity = await service.delete(university.id);

      expect(deletedUniversity).toBeDefined();
      expect(deletedUniversity.id).toBe(university.id);
      expect(UniversityService.universities.length).toBe(0);
    });

    it('should throw an error if trying to delete a non-existing university', async () => {
      const nonExistingId = uuid();
      await expect(service.delete(nonExistingId)).rejects.toThrow();
    });
  });
});
