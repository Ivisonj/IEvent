import { Injectable } from '@nestjs/common';
import { Event } from '../../../event/domain/event';
import { IEventRepository } from '../../repositories/event-repository.interface';
import { Either, left, right } from 'src/shared/application/Either';
import { CreateEventBodyDataDTO } from './create-event.DTO';
import { CreateEventErrors } from './create-event.errors';
import { IUserRepository } from 'src/modules/user/repositories/user-repository.interface';
import { CustomDate } from 'src/shared/application/customDate';

export type CreateEventResponse = Either<
  CreateEventErrors.InvalidDate | Error,
  any
>;

@Injectable()
export class CreateEventUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(
    bodyData: CreateEventBodyDataDTO,
  ): Promise<CreateEventResponse> {
    const userExists = await this.userRepository.findUserByUserId(
      bodyData.userId,
    );

    if (!userExists) return left(new CreateEventErrors.UserNotFound());

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const today = new Date(`${year}-${month}-${day}T23:59:59.999Z`);

    const startDate = new Date(bodyData.start_date);
    const endDate = new Date(bodyData.end_date);

    if (startDate < today || endDate < today)
      return left(new CreateEventErrors.InvalidDate());

    const eventOrError = Event.create({
      userId: bodyData.userId,
      name: bodyData.name,
      description: bodyData.description,
      address: bodyData.address,
      isPublic: bodyData.isPublic,
      once: bodyData.once,
      isActive: true,
      recurrence: bodyData.recurrence,
      custom_rules: bodyData.custom_rules,
      tolerance_time:
        bodyData.tolerance_time != 0 ? bodyData.tolerance_time : null,
      absences_limit:
        bodyData.absences_limit != 0 ? bodyData.absences_limit : null,
      late_limit: bodyData.late_limit != 0 ? bodyData.late_limit : null,
      start_date: startDate,
      end_date: endDate,
      start_time: CustomDate.fixTimezoneoffset(new Date(bodyData.start_time)),
      end_time: CustomDate.fixTimezoneoffset(new Date(bodyData.end_time)),
    });

    await this.eventRepository.createEvent(eventOrError);
    return right({ message: 'Evento criado com sucesso!' });
  }
}
