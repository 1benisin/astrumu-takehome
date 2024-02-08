import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from './state.service';
import { StateResolver } from './state.resolver';

describe('StateService', () => {
  let service: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateService, StateResolver],
    }).compile();

    service = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
