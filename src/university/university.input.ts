import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateUniversityInput {
  @MinLength(1)
  @Field()
  name: string;

  @MinLength(1)
  @Field()
  city: string;
}
