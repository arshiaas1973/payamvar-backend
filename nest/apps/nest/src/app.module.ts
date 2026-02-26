import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import configuration from '@/libs/common/configuration';
import { ConnectionGateway } from './connection/connection.gateway';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
  }), MessagesModule],
  controllers: [AppController,],
  providers: [AppService,ConnectionGateway],
})
export class AppModule {}
