import { Field, InputType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { US_STATES } from './state.constants';

@InputType()
export class CreateStateInput {
  @IsIn(US_STATES, {
    message:
      'name must be a valid U.S. state name. "California" not "california" or "CA"',
  })
  @Field()
  name: string;
}
