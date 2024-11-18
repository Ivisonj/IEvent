import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/shared/application/Either';
import { DeleEventHeaderDataDTO } from './delete-event.DTO';
import { IEventRepository } from '../../repositories/event-repository.interface';
import { DeleteEventError } from './delete-event.errors';

export type DeleteEventResponse = Either<
  DeleteEventError.EventNotFound | Error,
  any
>;

@Injectable()
export class DeteleEventUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  public async execute(
    eventId: string,
    headerData: DeleEventHeaderDataDTO,
  ): Promise<DeleteEventResponse> {
    const eventExists = await this.eventRepository.findEvent(eventId);

    if (!eventExists) return left(new DeleteEventError.EventNotFound());

    const isEventCreator = await this.eventRepository.eventCreator(
      eventId,
      headerData.userId,
    );

    if (!isEventCreator)
      return left(
        new DeleteEventError.YouDoNotHavePermissionToExecuteThisAction(),
      );

    await this.eventRepository.deleteEvent(eventId);

    return right({ message: 'Event deleted successfully' });
  }
}
