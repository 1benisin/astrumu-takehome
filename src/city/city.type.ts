import { Field, ObjectType, ID } from '@nestjs/graphql';
import { StateType } from '../state/state.type';

@ObjectType()
export class CityType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => StateType)
  state: StateType;
}
