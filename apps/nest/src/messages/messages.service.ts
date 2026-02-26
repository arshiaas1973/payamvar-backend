import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { MESSAGES_SERVICE_NAME, MessagesServiceClient, SendMessageDto, UpdateMessageDto } from '@/libs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class MessagesService implements OnModuleInit {
  private messagesService: MessagesServiceClient;

  constructor(@Inject(MESSAGES_SERVICE_NAME) private client: ClientGrpc) { }

  onModuleInit() {
    this.messagesService = this.client.getService<MessagesServiceClient>(MESSAGES_SERVICE_NAME);
  }

  create(createMessageDto: SendMessageDto) {
    return this.messagesService.sendMessage(createMessageDto);
  }

  findAll() {
    return this.messagesService.getMessage({});
  }

  findOne(id: number) {
    return this.messagesService.getOneMessage({ id });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return this.messagesService.updateMessage({...updateMessageDto, id});
  }

  remove(id: number) {
    return this.messagesService.removeMessage({ id });
  }
}
