import { Module } from '@nestjs/common';
import { UniversityResolver } from './university.resolver';
import { UniversityService } from './university.service';
import { CityService } from '../city/city.service';

@Module({
  providers: [UniversityResolver, UniversityService, CityService],
})
export class UniversityModule {}
