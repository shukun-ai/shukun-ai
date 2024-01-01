import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresService } from './postgres.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PostgresService],
})
export class AppModule {}
