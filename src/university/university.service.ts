import { Injectable } from '@nestjs/common';
import { UniversityType } from './university.type';
import { CityService } from 'src/city/city.service';
import { CityType } from 'src/city/city.type';
import { mockUniversityData } from './university.data';
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
    const { name, city } = createUniversityInput;

    // create city if it doesn't exist
    let cityEntity: CityType;
    try {
      cityEntity = await this.cityService.findByName(city.name);
    } catch (error) {
      cityEntity = await this.cityService.create({ name: city.name });
    }

    const university: UniversityType = {
      id: uuid(),
      name,
      city: cityEntity,
    };

    this.universities.push(university);

    return university;
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

    // update city if it exists
    let cityEntity: CityType;
    if (university.city) {
      try {
        cityEntity = await this.cityService.findByName(university.city.name);
      } catch (error) {
        cityEntity = await this.cityService.create({
          name: university.city.name,
        });
      }
    }

    const updatedU = {
      ...this.universities[index],
      ...university,
      city: cityEntity,
    };
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
