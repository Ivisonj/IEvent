import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';
import { CreateEventController } from './use-cases/create-event/create-event.controller';
import { IEventRepository } from './repositories/event-repository.interface';
import { PgEventRepository } from './repositories/postgres/pg-event.repository';
import { CreateEventUseCase } from './use-cases/create-event/create-event.useCase';
import { GetEventByIdController } from './use-cases/get-event-by-id/get-event-by-id.controller';
import { GetEventByIdUseCase } from './use-cases/get-event-by-id/get-event-by-id.useCase';
import { UpdateEventController } from './use-cases/update-event/update-event.controller';
import { UpdateEventUseCase } from './use-cases/update-event/update-event.useCase';
import { DeleteEventController } from './use-cases/delete-event/delete-event.controller';
import { DeteleEventUseCase } from './use-cases/delete-event/delete-event.useCase';
import { IUserRepository } from '../user/repositories/user-repository.interface';
import { PgUserRepository } from '../user/repositories/postgres/pg-user.repository';

@Module({
  controllers: [
    CreateEventController,
    GetEventByIdController,
    UpdateEventController,
    DeleteEventController,
  ],
  providers: [
    PrismaService,
    CreateEventUseCase,
    GetEventByIdUseCase,
    UpdateEventUseCase,
    DeteleEventUseCase,
    {
      provide: IEventRepository,
      useClass: PgEventRepository,
    },
    {
      provide: IUserRepository,
      useClass: PgUserRepository,
    },
  ],
  exports: [IEventRepository],
})
export class EventModule {}
