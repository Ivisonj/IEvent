import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/shared/application/Either';
import {
  GetEventByParticipationDTOResponse,
  GetEventsByParticipationHeaderDataDTO,
} from './get-event-by-participation.DTO';
import { GetEventByParticipationErrors } from './get-event-by-participation.errors';
import { IEventRepository } from '../../repositories/event-repository.interface';
import { IUserRepository } from 'src/modules/user/repositories/user-repository.interface';

export type GetEventByParticipationResponse = Either<
  GetEventByParticipationErrors.UserNotExists | Error,
  GetEventByParticipationDTOResponse[]
>;

@Injectable()
export class GetEventByParticipationUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(
    headerData: GetEventsByParticipationHeaderDataDTO,
  ): Promise<GetEventByParticipationResponse> {
    const userExists = await this.userRepository.findUserByUserId(
      headerData.userId,
    );

    if (!userExists)
      return left(new GetEventByParticipationErrors.UserNotExists());

    const events = await this.eventRepository.findByParticipation(
      headerData.userId,
    );

    if (!events) return right([]);

    const users = await this.userRepository.findUserByUserId(headerData.userId);

    const eventsData: GetEventByParticipationDTOResponse[] = events.map((e) => {
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
