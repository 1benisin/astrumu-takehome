// university.type.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { CityType } from '../city/city.type';

@ObjectType()
export class UniversityType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => CityType)
  city: CityType;
}
