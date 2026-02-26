import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagesService } from './messages.service';
import { from, Observable, Subject } from 'rxjs';
import {
  Empty, GetMessageDto, MessageResponse, MessagesResponse,
  MessagesServiceController, MessagesServiceControllerMethods, RemoveMessageDto, SendMessageDto,
  UpdateMessageDto,
} from '@/libs/common';
@Controller()
@MessagesServiceControllerMethods()
export class MessagesController implements MessagesServiceController {
  constructor(private readonly messagesService: MessagesService) { }

  getMessage(request: Empty): Observable<MessagesResponse> {
    return from(this.messagesService.findAll());
  }
  getOneMessage(request: GetMessageDto): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse {
    throw new Error('Method not implemented.');
  }
  getSomeMessages(request: GetMessageDto): Observable<MessageResponse> {
    throw new Error('Method not implemented.');
  }
  sendMessage(request: SendMessageDto): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse {
    throw new Error('Method not implemented.');
  }
  removeMessage(request: RemoveMessageDto): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse {
    throw new Error('Method not implemented.');
  }
  updateMessage(request: UpdateMessageDto): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse {
    throw new Error('Method not implemented.');
  }

}
