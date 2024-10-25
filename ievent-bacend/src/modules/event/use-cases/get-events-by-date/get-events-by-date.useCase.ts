import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/shared/application/Either';
import {
  GetEventByDateDTOResponse,
  GetEventsByDateHeaderDataDTO,
} from './get-events-by-date.DTO';
import { GetEventsByDateErrors } from './get-events-by-date.errors';
import { IEventRepository } from '../../repositories/event-repository.interface';
import { IUserRepository } from 'src/modules/user/repositories/user-repository.interface';
import { CustomDate } from 'src/shared/application/customDate';

export type GetEventsByDateResponse = Either<
  GetEventsByDateErrors.UserNotExists | Error,
  GetEventByDateDTOResponse[]
>;

@Injectable()
export class GetEventsByDateUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(
    headerData: GetEventsByDateHeaderDataDTO,
    date: string,
  ): Promise<GetEventsByDateResponse> {
    const userExists = await this.userRepository.findUserByUserId(
      headerData.userId,
    );

    if (!userExists) return left(new GetEventsByDateErrors.UserNotExists());

    const formattedDate = CustomDate.formatDate(date);

    const events = await this.eventRepository.findByDate(
      headerData.userId,
      formattedDate,
    );

    if (!events) return right([]);

    const eventIds = events.map((e) => e.userId);

    const users = await this.userRepository.findUsers(eventIds);

    const eventsData: GetEventByDateDTOResponse[] = events.map((e, index) => {
      const usersData = users[index];
      return {
        id: e.id,
        creatorName: usersData.name,
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
