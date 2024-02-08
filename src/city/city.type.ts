import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class CityType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}
