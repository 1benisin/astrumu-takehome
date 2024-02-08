import { Injectable } from '@nestjs/common';
import { CityType } from './city.type';
import { CreateCityInput, UpdateCityInput } from './city.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CityService {
  // mock db
  private cities: CityType[];

  constructor() {
    // would typically inject a db repository here for use in this service

    this.cities = []; // mock db
  }

  async findAll(): Promise<CityType[]> {
    return this.cities;
  }

  async findById(id: string): Promise<CityType> {
    const city = this.cities.find((city) => city.id === id);
    if (!city) {
      throw new Error('City not found');
    }

    return city;
  }

  async findByName(name: string): Promise<CityType> {
    const city = this.cities.find((city) => city.name === name);
    if (!city) {
      throw new Error('City not found');
    }

    return city;
  }

  async create(createCityInput: CreateCityInput): Promise<CityType> {
    const { name } = createCityInput;

    const city: CityType = {
      id: uuid(),
      name,
    };

    this.cities.push(city);

    return city;
  }

  async update(id: string, city: UpdateCityInput): Promise<CityType> {
    const index = this.cities.findIndex((city) => city.id === id);
    // if no city found
    if (index === -1) {
      throw new Error('City not found');
    }

    const updatedU = { ...this.cities[index], ...city };
    this.cities[index] = updatedU;

    return updatedU;
  }

  async delete(id: string): Promise<CityType> {
    const index = this.cities.findIndex((city) => city.id === id);
    // if no city found
    if (index === -1) {
      throw new Error('City not found');
    }

    const city = this.cities.splice(index, 1);

    return city[0];
  }
}
