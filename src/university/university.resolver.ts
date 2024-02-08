import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UniversityType } from './university.type';
import { UniversityService } from './university.service';
import {
  CreateUniversityInput,
  UpdateUniversityInput,
} from './university.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => UniversityType)
export class UniversityResolver {
  constructor(private universityService: UniversityService) {}

  @Query(() => [UniversityType])
  universities() {
    return this.universityService.findAll();
  }

  @Query(() => UniversityType)
  university(@Args('id') id: string) {
    return this.universityService.findById(id);
  }

  @Mutation(() => UniversityType)
  @UseGuards(AuthGuard)
  createUniversity(
    @Args('createUniversityInput') createUniversityInput: CreateUniversityInput,
  ) {
    return this.universityService.create(createUniversityInput);
  }

  @Mutation(() => UniversityType)
  @UseGuards(AuthGuard)
  updateUniversity(
    @Args('id') id: string,
    @Args('updateUniversityInput') updateUniversityInput: UpdateUniversityInput,
  ) {
    return this.universityService.update(id, updateUniversityInput);
  }

  @Mutation(() => UniversityType)
  @UseGuards(AuthGuard)
  deleteUniversity(@Args('id') id: string) {
    return this.universityService.delete(id);
  }
}
