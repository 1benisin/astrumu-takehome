import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsOptional } from 'class-validator';

@InputType()
export class CreateCityInput {
  @MinLength(1)
  @Field()
  name: string;
}

@InputType()
export class UpdateCityInput {
  @IsOptional()
  @MinLength(1)
  @Field({ nullable: true })
  name?: string;
}
