import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';
import { CreateEventController } from './use-cases/create-event/create-event.controller';
import { IEventRepository } from './repositories/event-repository.interface';
import { PgEventRepository } from './repositories/postgres/pg-event.repository';
import { CreateEventUseCase } from './use-cases/create-event/create-event.useCase';
import { GetEventsByUserIdController } from './use-cases/get-event-by-userId/get-event-by-userId.controller';
import { GetEventsByUserIdUseCase } from './use-cases/get-event-by-userId/get-event-by-userId.useCase';
import { GetEventByIdController } from './use-cases/get-event-by-id/get-event-by-id.controller';
import { GetEventByIdUseCase } from './use-cases/get-event-by-id/get-event-by-id.useCase';
import { UpdateEventController } from './use-cases/update-event/update-event.controller';
import { UpdateEventUseCase } from './use-cases/update-event/update-event.useCase';
import { DeleteEventController } from './use-cases/delete-event/delete-event.controller';
import { DeteleEventUseCase } from './use-cases/delete-event/delete-event.useCase';
import { GetEventByParticipationController } from './use-cases/get-event-participating/get-event-by-participation.controller';
import { GetEventByParticipationUseCase } from './use-cases/get-event-participating/get-event-by-participation.useCase';
import { GetEventByDateController } from './use-cases/get-events-by-date/get-events-by-date.controller';
import { GetEventsByDateUseCase } from './use-cases/get-events-by-date/get-events-by-date.useCase';
import { ActiveDeactivateEventController } from './use-cases/active-deactivate-event/active-deactivate-event.controller';
import { ActiveDeactivateEventUseCase } from './use-cases/active-deactivate-event/active-deactivate-event.useCase';
import { IUserRepository } from '../user/repositories/user-repository.interface';
import { PgUserRepository } from '../user/repositories/postgres/pg-user.repository';
import { GetEventController } from './use-cases/get-event/get-event.controller';
import { GetEventUseCase } from './use-cases/get-event/get-event.useCase';

@Module({
  controllers: [
    CreateEventController,
    GetEventsByUserIdController,
    GetEventByIdController,
    GetEventByParticipationController,
    GetEventByDateController,
    UpdateEventController,
    DeleteEventController,
    ActiveDeactivateEventController,
    GetEventController,
  ],
  providers: [
    PrismaService,
    CreateEventUseCase,
    GetEventsByUserIdUseCase,
    GetEventByIdUseCase,
    GetEventByParticipationUseCase,
    GetEventsByDateUseCase,
    UpdateEventUseCase,
    DeteleEventUseCase,
    ActiveDeactivateEventUseCase,
    GetEventUseCase,
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
