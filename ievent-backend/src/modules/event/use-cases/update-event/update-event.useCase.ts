import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/shared/application/Either';
import {
  UpdateEventBodyDataDTO,
  UpdateEventHeaderDataDTO,
} from './update-event.DTO';
import { IEventRepository } from '../../repositories/event-repository.interface';
import { UpdateEventErrors } from './update-event.errors';

export type UpdateEventResponse = Either<
  UpdateEventErrors.EventNotFound | Error,
  any
>;

@Injectable()
export class UpdateEventUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  public async execute(
    eventId: string,
    headerData: UpdateEventHeaderDataDTO,
    bodyData: UpdateEventBodyDataDTO,
  ): Promise<UpdateEventResponse> {
    const eventExists = await this.eventRepository.findEvent(eventId);

    if (!eventExists) {
      return left(new UpdateEventErrors.EventNotFound());
    }

    const isEventCreator = await this.eventRepository.eventCreator(
      eventId,
      headerData.userId,
    );

    if (!isEventCreator)
      return left(
        new UpdateEventErrors.YouDoNotHavePermissionToExecuteThisAction(),
      );

    await this.eventRepository.updateEvent(eventId, bodyData);

    return right({ message: 'Event updated successfully' });
  }
}
