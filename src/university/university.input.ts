import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsOptional } from 'class-validator';

@InputType()
export class CreateUniversityInput {
  @MinLength(1)
  @Field()
  name: string;

  @MinLength(1)
  @Field()
  city: string;
}

@InputType()
export class UpdateUniversityInput {
  @IsOptional()
  @MinLength(1)
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @MinLength(1)
  @Field({ nullable: true })
  city?: string;
}
