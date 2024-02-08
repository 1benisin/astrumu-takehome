import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class StateType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}
