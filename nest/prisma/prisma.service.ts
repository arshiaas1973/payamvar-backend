import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import configuration from '@/libs/common/configuration';
import PrismaClient from '@prisma/client';
@Injectable()

export class PrismaService extends PrismaClient {
    constructor() {
        const config = configuration();
        const adapter = new PrismaPg({ url: config.database.sql.url() });
        super({ adapter });
    }
}
