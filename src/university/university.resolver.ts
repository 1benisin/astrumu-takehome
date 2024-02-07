import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UniversityType } from './university.type';
import { UniversityService } from './university.service';
import { CreateUniversityInput } from './university.input';

@Resolver((of) => UniversityType)
export class UniversityResolver {
  constructor(private universityService: UniversityService) {}

  @Query((returns) => [UniversityType])
  universities() {
    return this.universityService.findAll();
  }

  @Query((returns) => UniversityType)
  university(@Args('id') id: string) {
    return this.universityService.findById(id);
  }

  @Mutation((returns) => UniversityType)
  createUniversity(
    @Args('createUniversityInput') createUniversityInput: CreateUniversityInput,
  ) {
    return this.universityService.create(createUniversityInput);
  }

  //   @Mutation((returns) => UniversityType)
  //   updateUniversity(
  //     @Args('id') id: string,
  //     @Args('updateUniversityInput') updateUniversityInput: UpdateUniversityInput,
  //   ): UniversityType {
  //     return this.universityService.update(id, updateUniversityInput);
  //   }

  //   @Mutation((returns) => UniversityType)
  //   deleteUniversity(@Args('id') id: string): UniversityType {
  //     return this.universityService.delete(id);
  //   }
}
