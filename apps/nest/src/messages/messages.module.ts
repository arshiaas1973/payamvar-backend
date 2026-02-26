import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { V1_MESSAGES_PACKAGE_NAME, MESSAGES_SERVICE_NAME } from '@/libs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MESSAGES_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: V1_MESSAGES_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'backend/nest/protos/v1/messages.proto'),
          url: process.env.MESSAGES_GRPC_URL ?? 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
