import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsOptional } from 'class-validator';
import { CreateCityInput, UpdateCityInput } from 'src/city/city.input';

@InputType()
export class CreateUniversityInput {
  @MinLength(1)
  @Field()
  name: string;

  @Field(() => CreateCityInput)
  city: CreateCityInput;
}

@InputType()
export class UpdateUniversityInput {
  @IsOptional()
  @MinLength(1)
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => UpdateCityInput, { nullable: true })
  city?: UpdateCityInput;
}
