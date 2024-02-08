import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsOptional, ValidateNested } from 'class-validator';
import { CreateCityInput } from '../city/city.input';

@InputType()
export class CreateUniversityInput {
  @MinLength(1)
  @Field()
  name: string;

  @ValidateNested()
  @Field(() => CreateCityInput)
  city: CreateCityInput;
}

@InputType()
export class UpdateUniversityInput {
  @IsOptional()
  @MinLength(1)
  @Field({ nullable: true })
  name?: string;

  @ValidateNested()
  @IsOptional()
  @Field(() => CreateCityInput, { nullable: true })
  city?: CreateCityInput;
}
