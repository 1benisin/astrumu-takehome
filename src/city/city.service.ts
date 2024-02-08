import { Injectable } from '@nestjs/common';
import { CityType } from './city.type';
import { CreateCityInput } from './city.input';
import { StateService } from '../state/state.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CityService {
  // mock db
  private cities: CityType[];

  constructor(private stateService: StateService) {
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

  async findByNameAndState(input: CreateCityInput): Promise<CityType> {
    // find city by name and state
    const city = this.cities.find(
      (city) =>
        city.name === input.name && city.state.name === input.state.name,
    );
    if (!city) {
      throw new Error('City not found');
    }

    return city;
  }

  async create(createCityInput: CreateCityInput): Promise<CityType> {
    try {
      // create city if it doesn't exist
      let cityEntity: CityType;
      try {
        cityEntity = await this.findByNameAndState(createCityInput);
      } catch (error) {
        // create state. If state exists, it will return the existing state
        let stateEntity = await this.stateService.create({
          name: createCityInput.state.name,
        });
        // create city
        cityEntity = {
          id: uuid(),
          name: createCityInput.name,
          state: stateEntity,
        };

        this.cities.push(cityEntity);
      }

      return cityEntity;
    } catch (error) {
      throw new Error('Failed to create city.');
    }
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
