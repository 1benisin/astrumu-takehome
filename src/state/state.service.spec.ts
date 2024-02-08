import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from './state.service';
import { CreateStateInput } from './state.input';
import { US_STATES } from './state.constants';
import { v4 as uuid } from 'uuid';

describe('StateService', () => {
  let service: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateService],
    }).compile();

    service = module.get<StateService>(StateService);
    // Reset the states array to a known state before each test
    service['states'] = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create and return a state when given a valid state name', async () => {
      const validStateName = US_STATES[0]; // Assuming US_STATES is an array of state names
      const createStateInput: CreateStateInput = { name: validStateName };
      const state = await service.create(createStateInput);

      expect(state).toBeDefined();
      expect(state.name).toBe(validStateName);
      expect(service['states'].length).toBe(1);
    });
  });

  describe('findAll', () => {
    it('should return all states', async () => {
      // Assuming US_STATES contains valid state names
      await Promise.all(
        US_STATES.slice(0, 2).map((name) => service.create({ name })),
      );

      const states = await service.findAll();
      expect(states.length).toBe(2);
      expect(states.map((state) => state.name)).toEqual(
        expect.arrayContaining(US_STATES.slice(0, 2)),
      );
    });
  });

  describe('findById', () => {
    it('should return a state by its id', async () => {
      const { id } = await service.create({ name: US_STATES[0] });

      const state = await service.findById(id);
      expect(state).toBeDefined();
      expect(state.id).toBe(id);
    });

    it('should throw an error if a state with the given id does not exist', async () => {
      const nonExistingId = uuid();
      await expect(service.findById(nonExistingId)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a state by its id', async () => {
      const { id } = await service.create({ name: US_STATES[0] });

      const deletedState = await service.delete(id);
      expect(deletedState.id).toBe(id);
      expect(
        service['states'].find((state) => state.id === id),
      ).toBeUndefined();
    });

    it('should throw an error if trying to delete a state with a non-existing id', async () => {
      const nonExistingId = uuid();
      await expect(service.delete(nonExistingId)).rejects.toThrow();
    });
  });
});
