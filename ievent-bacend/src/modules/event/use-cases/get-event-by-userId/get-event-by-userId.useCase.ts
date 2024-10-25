import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/shared/application/Either';
import {
  GetEventsByUserIdHeaderDataDTO,
  GetEventsByUserIdDTOResponse,
} from './get-event-by-userId.DTO';
import { IEventRepository } from '../../repositories/event-repository.interface';
import { GetEventsByUserIdErrors } from './get-event-by-userId.errors';
import { IUserRepository } from 'src/modules/user/repositories/user-repository.interface';

export type GetEventsByUserIdResponse = Either<
  GetEventsByUserIdErrors.EventNotFound | Error,
  GetEventsByUserIdDTOResponse[]
>;

@Injectable()
export class GetEventsByUserIdUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(
    headerData: GetEventsByUserIdHeaderDataDTO,
  ): Promise<GetEventsByUserIdResponse> {
    const events = await this.eventRepository.findByUserId(headerData.userId);

    if (!events) return left(new GetEventsByUserIdErrors.EventNotFound());

    const users = await this.userRepository.findUserByUserId(headerData.userId);

    const eventsData: GetEventsByUserIdDTOResponse[] = events.map((e) => {
      return {
        id: e.id,
        creatorName: users.name,
        name: e.name,
        description: e.description,
        address: e.address,
        isPublic: e.isPublic,
        once: e.once,
        isActive: e.isActive,
        recurrence: e.recurrence,
        custom_rules: e.custom_rules,
        tolerance_time: e.tolerance_time,
        absences_limit: e.absences_limit,
        late_limit: e.late_limit,
        start_date: e.start_date,
        end_date: e.end_date,
        start_time: e.start_time,
        end_time: e.end_time,
        next_event_date: e.next_event_date,
      };
    });

    return right(eventsData);
  }
}
