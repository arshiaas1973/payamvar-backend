import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.ts';
import { VersioningType } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import configuration from './config/configuration.ts';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const config = configuration();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // const gRPC = app.connectMicroservice({
  //   transport: Transport.GRPC,
  //   options:{
  //     package: ['msgs.v1','connections.v1'],
  //     protoPath: [
  //       'src/protos/v1/msgs.proto',
  //       'src/protos/v1/connections.proto',
  //     ],
  //     url: config.grpc.url,
  //   },
  // });
  // await app.startAllMicroservices();
  app.useWebSocketAdapter(new WsAdapter(app))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
