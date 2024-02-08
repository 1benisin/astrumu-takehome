import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsOptional, MaxLength } from 'class-validator';
import { US_STATES } from './state.constants';

@InputType()
export class CreateStateInput {
  @IsIn(US_STATES, {
    message:
      'name must be a valid U.S. state name. "California" not "california" or "CA"',
  })
  @MaxLength(1)
  @Field()
  name: string;
}
