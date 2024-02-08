import { Injectable } from '@nestjs/common';
import { UniversityType } from './university.type';
import { CityService } from '../city/city.service';
import {
  CreateUniversityInput,
  UpdateUniversityInput,
} from './university.input';
import { v4 as uuid } from 'uuid';
import { mockUniversityData } from './university.mockdata';

@Injectable()
export class UniversityService {
  // mock db
  static universities: UniversityType[];

  constructor(private cityService: CityService) {
    // would typically inject a db repository here for use in this service

    UniversityService.universities = []; // mock db
    this.loadMockData();
  }

  private async loadMockData() {
    for (const data of mockUniversityData) {
      try {
        const cityEntity = await this.cityService.create({
          name: data.city.name,
          state: { name: data.city.state.name },
        });

        const university: UniversityType = {
          id: data.id.toString(),
          name: data.name,
          city: cityEntity,
        };

        UniversityService.universities.push(university);
      } catch (error) {
        console.error(
          `Failed to load mock data for university ${data.name}: ${error}`,
        );
      }
    }
  }

  async findAll(): Promise<UniversityType[]> {
    return UniversityService.universities;
  }

  async findById(id: string): Promise<UniversityType> {
    const foundU = UniversityService.universities.find(
      (university) => university.id === id,
    );
    if (!foundU) {
      throw new Error('University not found');
    }

    return foundU;
  }

  async create(
    createUniversityInput: CreateUniversityInput,
  ): Promise<UniversityType> {
    try {
      // create city. If city exists, it will return the existing city
      let cityEntity = await this.cityService.create(
        createUniversityInput.city,
      );
      // create university
      const university = {
        id: uuid(),
        name: createUniversityInput.name,
        city: cityEntity,
      };
      UniversityService.universities.push(university);

      return university;
    } catch (error) {
      throw new Error(`Failed to create University: ${error}`);
    }
  }

  async update(
    id: string,
    university: UpdateUniversityInput,
  ): Promise<UniversityType> {
    const index = UniversityService.universities.findIndex(
      (university) => university.id === id,
    );
    // if no university found
    if (index === -1) {
      throw new Error('University not found');
    }

    const updatedU = {
      ...UniversityService.universities[index],
      ...university,
    } as UniversityType;

    // update city if it exists
    if (university.city) {
      // create city. If city exists, it will return the existing city
      let cityEntity = await this.cityService.create(university.city);
      updatedU.city = cityEntity;
    }

    UniversityService.universities[index] = updatedU;

    return updatedU;
  }

  async delete(id: string): Promise<UniversityType> {
    const index = UniversityService.universities.findIndex(
      (university) => university.id === id,
    );
    // if no university found
    if (index === -1) {
      throw new Error('University not found');
    }

    const deletedU = UniversityService.universities.splice(index, 1);

    return deletedU[0];
  }
}
