import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceResolver } from '../balance.resolver';

import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({ 
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), 
      driver: ApolloDriver, 
      playground: true, 
      debug: false
    })
  ],
  controllers: [AppController],
  providers: [AppService, BalanceResolver],
})
export class AppModule { }
