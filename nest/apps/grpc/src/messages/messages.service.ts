import { Injectable } from '@nestjs/common';
import { SendMessageDto, UpdateMessageDto, MessagesResponse } from '@/libs/common';
import { PrismaService } from '@/prisma/prisma.service';


@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService){}

  create(createMessageDto: SendMessageDto) {
    return 'This action adds a new message';
  }

  async findAll(): Promise<MessagesResponse> {
    return {
      pageInfo: undefined,
      status: "success",
      result: undefined,
      message: "test"
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
