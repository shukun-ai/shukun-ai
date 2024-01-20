import { Module } from '@nestjs/common';
import { PrismaClientBasicModule } from '@ailake/prisma-client-basic';
import { MessageService } from './message.service';

@Module({
  imports: [PrismaClientBasicModule],
  controllers: [],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
