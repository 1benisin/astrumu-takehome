import { Resolver, Query } from '@nestjs/graphql';
import { UniversityType } from './university.type';

@Resolver((of) => UniversityType)
export class UniversityResolver {
  @Query((returns) => UniversityType)
  university() {
    return {
      id: '1',
      name: 'Alabama A & M University',
      city: 'Huntsville',
    };
  }
}
