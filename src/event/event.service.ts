import { EventRepository } from '@app/database/repositories/event/event.repository';
import { AttendEventDto } from '@app/event/dto/attendEvent.dto';
import { GetActiveEvents } from '@app/event/dto/getActiveEvents.dto';
import { generateError } from '@app/utility/error/errorGenerator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  constructor(private readonly eventRepo: EventRepository) {}

  async getActiveEvents() {
    const activeEvents = await this.eventRepo.findActiveEvents();

    return new GetActiveEvents({ result: activeEvents });
  }

  async attendEvent(userId: number, data: AttendEventDto) {
    const { email, eventId, firstName, lastName, major, university } = data;
    const isEventExists = await this.eventRepo.findEventWithUser(
      eventId,
      userId,
    );

    if (!isEventExists) {
      throw generateError(
        [
          {
            message: 'EVENT_NOT_FOUND',
          },
        ],
        'NOT_FOUND',
      );
    }

    if (isEventExists.UserEvent.length) {
      throw generateError(
        [
          {
            message: 'USER_HAS_ALREADY_ATTENDED',
          },
        ],
        'BAD_REQUEST',
      );
    }

    await this.eventRepo.createUserEvent({
      UserId: userId,
      EventId: eventId,
      email,
      firstName,
      lastName,
      major,
      university,
    });
    return;
  }
}
