import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { MessageController } from './message/server/message.controller';
import configuration from './config/configuration';
import { ConnectionGateway } from './connection/connection.gateway';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
  }), MessageModule],
  controllers: [AppController, MessageController],
  providers: [AppService,ConnectionGateway],
})
export class AppModule {}
