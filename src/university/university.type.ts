// university.type.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class UniversityType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  city: string;
}
