import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UniversityModule } from './university/university.module';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UniversityModule,
    CityModule,
    StateModule,
  ],
})
export class AppModule {}
