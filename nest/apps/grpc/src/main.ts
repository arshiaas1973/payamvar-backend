import { NestFactory } from '@nestjs/core';
import { GrpcModule } from './grpc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {join} from "node:path";

async function bootstrap() {
  const grpcUrl =
    process.env.GRPC_URL ?? `0.0.0.0:${process.env.GRPC_PORT ?? '50051'}`;


  console.log(grpcUrl);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GrpcModule,
    {
      transport: Transport.GRPC,
      options:{
        url: grpcUrl,
        protoPath: [
          join(__dirname, '../v1/messages.proto'),
          join(__dirname, '../v1/users.proto'),
          join(__dirname, '../v1/general.proto'),
        ],
        package: [
          'v1.messages',
          'v1.users',
          'v1.general'
        ]
      }
    },
  );
  await app.listen();
}
bootstrap();
