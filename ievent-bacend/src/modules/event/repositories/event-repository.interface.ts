import { Event } from '../../event/domain/event';
import { UpdateEventBodyDataDTO } from '../use-cases/update-event/update-event.DTO';

export abstract class IEventRepository {
  abstract createEvent(event: Event): Promise<Event | null>;
  abstract findEvent(eventId: string): Promise<Event | null>;
  abstract updateEvent(
    eventId: string,
    updateData: UpdateEventBodyDataDTO,
  ): Promise<Event | null>;
  abstract findByUserId(userId: string): Promise<Event[] | null>;
  abstract findById(eventId: string): Promise<Event | null>;
  abstract findByName(name: string, userId: string): Promise<Event[] | null>;
  abstract findByDate(userId: string, date: Date): Promise<Event[] | null>;
  abstract findByParticipation(userId: string): Promise<Event[] | null>;
  abstract deleteEvent(eventId: string): Promise<void>;
  abstract eventCreator(eventId: string, userId: string): Promise<Event | null>;
  abstract activeDeactivateEvent(eventId: string): Promise<Event | null>;
  abstract findEvents(eventId: string[]): Promise<Event[] | null>;
}
