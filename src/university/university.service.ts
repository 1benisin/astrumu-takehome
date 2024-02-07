import { Injectable } from '@nestjs/common';
import { UniversityType } from './university.type';
import { mockUniversityData } from './university.data';
import { CreateUniversityInput } from './university.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UniversityService {
  // mock db
  private universities: UniversityType[];

  constructor() {
    this.universities = [];
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

    const university: UniversityType = {
      id: uuid(),
      name,
      city,
    };

    this.universities.push(university);

    return university;
  }

  async update(
    id: string,
    university: UniversityType,
  ): Promise<UniversityType> {
    const index = this.universities.findIndex(
      (university) => university.id === id,
    );
    // if no university found
    if (index === -1) {
      throw new Error('University not found');
    }

    this.universities[index] = university;

    return university;
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
