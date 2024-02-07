import { Module } from '@nestjs/common';
import { UniversityResolver } from './university.resolver';
import { UniversityService } from './university.service';

@Module({
  providers: [UniversityResolver, UniversityService],
})
export class UniversityModule {}
