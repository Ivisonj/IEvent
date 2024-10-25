import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/shared/application/Either';
import {
  GetEventByIdDTOResponse,
  GetEventByIdHeaderDataDTO,
} from './get-event-by-id.DTO';
import { IEventRepository } from '../../repositories/event-repository.interface';
import { GetEventByIdError } from './get-event-by-id.errors';
import { IUserRepository } from 'src/modules/user/repositories/user-repository.interface';
import { IParticipantRepository } from 'src/modules/participant/repositories/participant-repository.interface';

export type GetEventByIdresponse = Either<
  GetEventByIdError.EventNotFound | Error,
  GetEventByIdDTOResponse
>;

@Injectable()
export class GetEventByIdUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly userRepository: IUserRepository,
    private readonly participantRepository: IParticipantRepository,
  ) {}

  public async execute(
    eventId: string,
    headerData: GetEventByIdHeaderDataDTO,
  ): Promise<GetEventByIdresponse> {
    const event = await this.eventRepository.findById(eventId);

    if (!event) return left(new GetEventByIdError.EventNotFound());

    const isParticipant =
      await this.participantRepository.findParticipantByEventIdAndUserId(
        eventId,
        headerData.userId,
      );

    if (!isParticipant) return left(new GetEventByIdError.Unauthorized());

    const user = await this.userRepository.findUserByUserId(event.userId);

    const eventData: GetEventByIdDTOResponse = {
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
