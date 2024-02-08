import { Field, InputType } from '@nestjs/graphql';
import { MinLength, ValidateNested } from 'class-validator';
import { CreateStateInput } from '../state/state.input';

@InputType()
export class CreateCityInput {
  @MinLength(1)
  @Field()
  name: string;

  @ValidateNested()
  @Field(() => CreateStateInput)
  state: CreateStateInput;
}
