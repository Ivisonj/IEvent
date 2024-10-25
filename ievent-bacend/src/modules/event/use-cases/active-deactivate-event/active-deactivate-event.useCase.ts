import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/shared/application/Either';
import { IEventRepository } from '../../repositories/event-repository.interface';
import { ActiveDeactivateEventErrors } from './active-deactivate-event.errors';
import { ActiveDeactivateEventHeaderDataDTO } from './active-deactivate-event.DTO';

export type ActiveDeactivateEventResponse = Either<
  ActiveDeactivateEventErrors.EventNotFound | Error,
  any
>;

@Injectable()
export class ActiveDeactivateEventUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  public async execute(
    eventId: string,
    headerData: ActiveDeactivateEventHeaderDataDTO,
  ): Promise<ActiveDeactivateEventResponse> {
    const eventExists = await this.eventRepository.findEvent(eventId);

    if (!eventExists)
      return left(new ActiveDeactivateEventErrors.EventNotFound());

    const isEventCreator = await this.eventRepository.eventCreator(
      eventId,
      headerData.userId,
    );

    if (!isEventCreator)
      return left(
        new ActiveDeactivateEventErrors.YouDoNotHavePermissionToExecuteThisAction(),
      );

    const updateEventStatus =
      await this.eventRepository.activeDeactivateEvent(eventId);

    const status = updateEventStatus.isActive ? 'ATIVDADO' : 'DESATIVADO';

    return right({
      message: `Você alterou o status do seu evento para ${status}`,
    });
  }
}
