import { PrismaService } from '@app/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  findActiveEvents() {
    return this.prisma.event.findMany({
      where: {
        startAt: { lte: new Date() },
        endAt: { gte: new Date() },
      },
      orderBy: {
        startAt: 'asc',
      },
      select: {
        id: true,
        name: true,
        endAt: true,
        startAt: true,
        type: true,
        attending_link: true,
        duration: true,
        location: true,
        createdAt: true,
        longDescription: true,
        shortDescription: true,
      },
    });
  }

  findEventWithUser(eventId: number, userId: number) {
    return this.prisma.event.findUnique({
      where: {
        id: eventId,
        startAt: {
          lte: new Date(),
        },
        endAt: {
          gte: new Date(),
        },
      },
      include: {
        UserEvent: {
          where: {
            UserId: userId,
          },
        },
      },
    });
  }
  createUserEvent(data: Prisma.UserEventUncheckedCreateInput) {
    return this.prisma.userEvent.create({ data });
  }
}
