import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/shared/application/Either';
import { GetEventDTOResponse, GetEventHeaderDataDTO } from './get-event.DTO';
import { IEventRepository } from '../../repositories/event-repository.interface';
import { GetEventError } from './get-event.errors';
import { IUserRepository } from 'src/modules/user/repositories/user-repository.interface';

export type GetEventResponse = Either<
  GetEventError.EventNotFound | Error,
  GetEventDTOResponse
>;

@Injectable()
export class GetEventUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(
    eventId: string,
    headerData: GetEventHeaderDataDTO,
  ): Promise<GetEventResponse> {
    const event = await this.eventRepository.findById(eventId);

    if (!event) return left(new GetEventError.EventNotFound());

    const isEventCreator = await this.eventRepository.eventCreator(
      eventId,
      headerData.userId,
    );

    if (!isEventCreator) return left(new GetEventError.Unauthorized());

    const user = await this.userRepository.findUserByUserId(event.userId);

    const eventData: GetEventDTOResponse = {
      id: event.id,
      creatorName: user.name,
      name: event.name,
      description: event.description,
      address: event.address,
      isPublic: event.isPublic,
      once: event.once,
      isActive: event.isActive,
      recurrence: event.recurrence,
      custom_rules: event.custom_rules,
      tolerance_time: event.tolerance_time,
      absences_limit: event.absences_limit,
      late_limit: event.late_limit,
      start_date: event.start_date,
      end_date: event.end_date,
      start_time: event.start_time,
      end_time: event.end_time,
      next_event_date: event.next_event_date,
    };

    return right(eventData);
  }
}
