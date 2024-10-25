import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Event } from '../../../event/domain/event';
import { EventMapper } from '../../mappers/event.map';
import { IEventRepository } from '../event-repository.interface';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';
import { ParticpantStatus } from 'src/modules/participant/domain/participant';
import { UpdateEventBodyDataDTO } from '../../use-cases/update-event/update-event.DTO';
import { CustomDate } from 'src/shared/application/customDate';

@Injectable()
export class PgEventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findEvent(eventId: string): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { recurrence: true },
    });
    return event ? EventMapper.toDomain(event, event.recurrence) : null;
  }

  async createEvent(event: Event): Promise<Event | null> {
    const { eventData, recurrencesData } =
      await EventMapper.toPersistence(event);

    const result = await this.prisma.$transaction(async (prisma) => {
      const createdEvent = await prisma.event.create({
        data: eventData,
      });

      if (recurrencesData.length > 0) {
        const recurrences = await Promise.all(
          recurrencesData.map((day) =>
            prisma.recurrence.create({
              data: {
                id: uuid(),
                eventId: createdEvent.id,
                day: day.day,
              },
            }),
          ),
        );

        return { createdEvent, recurrences };
      }

      return { createdEvent, recurrences: [] };
    });

    return EventMapper.toDomain(result.createdEvent, result.recurrences);
  }

  async findByUserId(userId: string): Promise<Event[] | null> {
    const events = await this.prisma.event.findMany({
      where: { userId },
      include: { recurrence: true },
      orderBy: {
        name: 'asc',
      },
    });

    const updatedEvents = await Promise.all(
      events.map(async (event) => {
        let nextEventDate: Date;

        if (event.once) {
          nextEventDate = event.start_date;
        } else {
          const days = event.recurrence.map((item) => item.day);
          const date = new Date();
          const currentDate = CustomDate.fixTimezoneoffset(date);
          const currentDayOfWeek = currentDate.getDay();

          if (days.includes(currentDayOfWeek)) {
            nextEventDate = currentDate;
          } else {
            let nextDayIndex = days.findIndex((day) => day > currentDayOfWeek);

            if (nextDayIndex === -1) {
              nextDayIndex = 0;
            }

            const nextDayOfWeek = days[nextDayIndex];
            const daysUntilNext =
              (nextDayOfWeek + 7 - currentDayOfWeek) % 7 || 7;
            nextEventDate = new Date(currentDate);
            nextEventDate.setDate(currentDate.getDate() + daysUntilNext);
          }
        }

        if (
          !event.next_event_date ||
          nextEventDate.getTime() !== event.next_event_date.getTime()
        ) {
          await this.prisma.event.update({
            where: { id: event.id },
            data: { next_event_date: nextEventDate },
          });
        }

        const updatedEvent = await this.prisma.event.findUnique({
          where: { id: event.id },
          include: { recurrence: true },
        });

        return EventMapper.toDomain(updatedEvent, updatedEvent.recurrence);
      }),
    );

    return updatedEvents;
  }

  async findById(eventId: string): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { recurrence: true },
    });

    if (event.once) {
      await this.prisma.event.update({
        where: { id: eventId },
        data: { next_event_date: event.start_date },
      });
    } else {
      const event = await this.prisma.event.findUnique({
        where: { id: eventId },
        include: { recurrence: true },
      });

      const days = event.recurrence.map((item) => item.day);
      const date = new Date();
      const currentDate = CustomDate.fixTimezoneoffset(date);
      const currentDayOfWeek = currentDate.getDay();

      if (days.includes(currentDayOfWeek)) {
        await this.prisma.event.update({
          where: { id: eventId },
          data: { next_event_date: currentDate },
        });
      } else {
        let nextDayIndex = days.findIndex((day) => day > currentDayOfWeek);

        if (nextDayIndex === -1) {
          nextDayIndex = 0;
        }

        const nextDayOfWeek = days[nextDayIndex];
        const daysUntilNext = (nextDayOfWeek + 7 - currentDayOfWeek) % 7 || 7;
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + daysUntilNext);

        await this.prisma.event.update({
          where: { id: eventId },
          data: { next_event_date: nextDate },
        });
      }
    }

    const updatedEvent = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { recurrence: true },
    });

    return EventMapper.toDomain(updatedEvent, updatedEvent.recurrence);
  }

  async findByName(name: string, userId): Promise<Event[] | null> {
    const events = await this.prisma.event.findMany({
      where: {
        name: {
          contains: name,
          mode: 'default',
        },
        userId: {
          not: userId,
        },
        AND: {
          isActive: true,
        },
      },
      include: { recurrence: true },
    });

    return events.map((event) => EventMapper.toDomain(event, event.recurrence));
  }

  async findByParticipation(userId: string): Promise<Event[] | null> {
    const participants = await this.prisma.participant.findMany({
      where: {
        userId,
        status: 'accepted',
        event: {
          isActive: true,
        },
      },
      include: {
        event: {
          include: {
            recurrence: true,
          },
        },
      },
    });

    const events = participants.map((participant) => participant.event);

    const updatedEvents = await Promise.all(
      events.map(async (event) => {
        let nextEventDate: Date;

        if (event.once) {
          nextEventDate = event.start_date;
        } else {
          const days = event.recurrence.map((item) => item.day);
          const date = new Date();
          const currentDate = CustomDate.fixTimezoneoffset(date);
          const currentDayOfWeek = currentDate.getDay();

          if (days.includes(currentDayOfWeek)) {
            nextEventDate = currentDate;
          } else {
            let nextDayIndex = days.findIndex((day) => day > currentDayOfWeek);

            if (nextDayIndex === -1) {
              nextDayIndex = 0;
            }

            const nextDayOfWeek = days[nextDayIndex];
            const daysUntilNext =
              (nextDayOfWeek + 7 - currentDayOfWeek) % 7 || 7;
            nextEventDate = new Date(currentDate);
            nextEventDate.setDate(currentDate.getDate() + daysUntilNext);
          }
        }

        if (
          !event.next_event_date ||
          nextEventDate.getTime() !== event.next_event_date.getTime()
        ) {
          await this.prisma.event.update({
            where: { id: event.id },
            data: { next_event_date: nextEventDate },
          });
        }

        const updatedEvent = await this.prisma.event.findUnique({
          where: { id: event.id },
          include: { recurrence: true },
        });

        return EventMapper.toDomain(updatedEvent, updatedEvent.recurrence);
      }),
    );

    const sortedEvents = updatedEvents.sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return sortedEvents;
  }

  async findByDate(userId: string, date: Date): Promise<Event[] | null> {
    const eventsParticipation = await this.prisma.participant.findMany({
      where: {
        userId: userId,
        status: ParticpantStatus.accepted,
        event: { isActive: true },
      },
      select: {
        eventId: true,
      },
    });

    const myEvents = await this.prisma.event.findMany({
      where: { userId: userId },
    });

    const myEventIds = myEvents.map((event) => event.id);

    const participationEventIds = eventsParticipation.map(
      (participant) => participant.eventId,
    );

    const eventIds = myEventIds.concat(participationEventIds);

    const dayOfWeek = date.getUTCDay();

    const events = await this.prisma.event.findMany({
      where: {
        AND: [
          {
            id: { in: eventIds },
          },
          {
            start_date: { lte: date },
          },
          {
            end_date: { gte: date },
          },
          {
            recurrence: {
              some: {
                day: dayOfWeek,
              },
            },
          },
        ],
      },
      include: {
        recurrence: true,
      },
    });

    return events.map((event) => EventMapper.toDomain(event, event.recurrence));
  }

  async updateEvent(
    eventId: string,
    updateData: UpdateEventBodyDataDTO,
  ): Promise<Event | null> {
    const eventData = {
      name: updateData.name,
      description: updateData.description,
      address: updateData.address,
      isPublic: updateData.isPublic,
      once: updateData.once,
      custom_rules: updateData.custom_rules,
      tolerance_time: updateData.tolerance_time,
      absences_limit: updateData.absences_limit,
      late_limit: updateData.late_limit,
      start_date: updateData.start_date,
      end_date: updateData.end_date,
      start_time: updateData.start_time,
      end_time: updateData.end_time,
    };

    const recurrencesData = updateData.recurrence;

    const result = await this.prisma.$transaction(async (prisma) => {
      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: eventData,
      });

      if (recurrencesData) {
        await prisma.recurrence.deleteMany({
          where: { eventId: eventId },
        });

        const updatedRecurrences = await Promise.all(
          recurrencesData.map((day) =>
            prisma.recurrence.create({
              data: {
                id: uuid(),
                eventId: updatedEvent.id,
                day: day,
              },
            }),
          ),
        );

        return { updatedEvent, updatedRecurrences };
      }

      return { updatedEvent, updatedRecurrences: [] };
    });

    return EventMapper.toDomain(result.updatedEvent, result.updatedRecurrences);
  }

  async deleteEvent(eventId: string): Promise<void> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { recurrence: true },
    });

    if (!event.once) {
      await this.prisma.recurrence.deleteMany({
        where: { eventId: eventId },
      });
    }

    await this.prisma.event.delete({
      where: { id: eventId },
    });
  }

  async eventCreator(eventId: string, userId: string): Promise<Event | null> {
    const result = await this.prisma.event.findFirst({
      where: { id: eventId, userId: userId },
      include: { recurrence: true },
    });
    return !!result ? EventMapper.toDomain(result, result.recurrence) : null;
  }

  async activeDeactivateEvent(eventId: string): Promise<Event | null> {
    const eventStatus = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { isActive: true },
    });

    const newIsActive = !eventStatus.isActive;

    const result = await this.prisma.event.update({
      where: { id: eventId },
      data: { isActive: newIsActive },
      include: { recurrence: true },
    });

    return result ? EventMapper.toDomain(result, result.recurrence) : null;
  }

  async findEvents(eventId: string[]): Promise<Event[] | null> {
    const events = await this.prisma.event.findMany({
      where: { id: { in: eventId } },
      include: { recurrence: true },
    });
    return events
      ? events.map((event) => EventMapper.toDomain(event, event.recurrence))
      : null;
  }
}
