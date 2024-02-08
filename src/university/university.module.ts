import { Module } from '@nestjs/common';
import { UniversityResolver } from './university.resolver';
import { UniversityService } from './university.service';
import { CityService } from '../city/city.service';
import { StateService } from '../state/state.service';

@Module({
  providers: [UniversityResolver, UniversityService, CityService, StateService],
})
export class UniversityModule {}
