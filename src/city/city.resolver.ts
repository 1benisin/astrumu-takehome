import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CityType } from './city.type';
import { CityService } from './city.service';
import { CreateCityInput, UpdateCityInput } from './city.input';

@Resolver((of) => CityType)
export class CityResolver {
  constructor(private cityService: CityService) {}

  @Query((returns) => [CityType])
  cities() {
    return this.cityService.findAll();
  }

  @Query((returns) => CityType)
  city(@Args('id') id: string) {
    return this.cityService.findById(id);
  }

  @Mutation((returns) => CityType)
  createCity(@Args('createCityInput') createCityInput: CreateCityInput) {
    return this.cityService.create(createCityInput);
  }

  @Mutation((returns) => CityType)
  updateCity(
    @Args('id') id: string,
    @Args('updateCityInput') updateCityInput: UpdateCityInput,
  ) {
    return this.cityService.update(id, updateCityInput);
  }

  @Mutation((returns) => CityType)
  deleteCity(@Args('id') id: string) {
    return this.cityService.delete(id);
  }
}
