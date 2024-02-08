import { Injectable } from '@nestjs/common';
import { StateType } from './state.type';
import { CreateStateInput } from './state.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StateService {
  // mock db
  private states: StateType[];

  constructor() {
    // would typically inject a db repository here for use in this service
    this.states = []; // mock db
  }

  async findAll(): Promise<StateType[]> {
    return this.states;
  }

  async findById(id: string): Promise<StateType> {
    const state = this.states.find((state) => state.id === id);
    if (!state) {
      throw new Error('State not found');
    }

    return state;
  }

  async findByName(name: string): Promise<StateType> {
    const state = this.states.find((state) => state.name === name);
    if (!state) {
      throw new Error(
        'State not found. Be sure to use full state name. "California" not "CA" or "california"',
      );
    }

    return state;
  }

  async create(createStateInput: CreateStateInput): Promise<StateType> {
    const { name } = createStateInput;

    // create state if it doesn't exist
    let stateEntity: StateType;
    try {
      stateEntity = await this.findByName(name);
    } catch (error) {
      stateEntity = { id: uuid(), name };
    }

    this.states.push(stateEntity);

    return stateEntity;
  }

  async delete(id: string): Promise<StateType> {
    const index = this.states.findIndex((state) => state.id === id);
    // if no state found
    if (index === -1) {
      throw new Error('State not found');
    }

    const state = this.states.splice(index, 1);

    return state[0];
  }
}
