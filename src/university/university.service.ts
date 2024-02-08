import { Injectable } from '@nestjs/common';
import { UniversityType } from './university.type';
import { CityService } from '../city/city.service';
import {
  CreateUniversityInput,
  UpdateUniversityInput,
} from './university.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UniversityService {
  // mock db
  private universities: UniversityType[];

  constructor(private cityService: CityService) {
    // would typically inject a db repository here for use in this service

    this.universities = []; // mock db
  }

  async findAll(): Promise<UniversityType[]> {
    return this.universities;
  }

  async findById(id: string): Promise<UniversityType> {
    const foundU = this.universities.find((university) => university.id === id);
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
      this.universities.push(university);

      return university;
    } catch (error) {
      throw new Error(`Failed to create University: ${error}`);
    }
  }

  async update(
    id: string,
    university: UpdateUniversityInput,
  ): Promise<UniversityType> {
    const index = this.universities.findIndex(
      (university) => university.id === id,
    );
    // if no university found
    if (index === -1) {
      throw new Error('University not found');
    }

    const updatedU = {
      ...this.universities[index],
      ...university,
    } as UniversityType;

    // update city if it exists
    if (university.city) {
      // create city. If city exists, it will return the existing city
      let cityEntity = await this.cityService.create(university.city);
      updatedU.city = cityEntity;
    }

    this.universities[index] = updatedU;

    return updatedU;
  }

  async delete(id: string): Promise<UniversityType> {
    const index = this.universities.findIndex(
      (university) => university.id === id,
    );
    // if no university found
    if (index === -1) {
      throw new Error('University not found');
    }

    const deletedU = this.universities.splice(index, 1);

    return deletedU[0];
  }
}
