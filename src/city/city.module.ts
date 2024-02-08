import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityResolver } from './city.resolver';
import { StateService } from '../state/state.service';

@Module({
  providers: [CityService, CityResolver, StateService],
  exports: [CityService],
})
export class CityModule {}
