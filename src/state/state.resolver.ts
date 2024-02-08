import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { StateType } from './state.type';
import { StateService } from './state.service';
import { CreateStateInput } from './state.input';

@Resolver((of) => StateType)
export class StateResolver {
  constructor(private stateService: StateService) {}

  @Query((returns) => [StateType])
  states() {
    return this.stateService.findAll();
  }

  @Query((returns) => StateType)
  state(@Args('id') id: string) {
    return this.stateService.findById(id);
  }

  @Mutation((returns) => StateType)
  createState(@Args('createStateInput') createStateInput: CreateStateInput) {
    return this.stateService.create(createStateInput);
  }

  @Mutation((returns) => StateType)
  deleteState(@Args('id') id: string) {
    return this.stateService.delete(id);
  }
}
