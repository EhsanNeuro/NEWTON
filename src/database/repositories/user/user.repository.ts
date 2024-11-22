import { PrismaService } from '@app/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }
  findUserByTelegramId(telegramId: number) {
    return this.prisma.user.findUnique({
      where: {
        telegramId,
      },
    });
  }
  findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        UserEvent: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            email: true,
            firstName: true,
            lastName: true,
            major: true,
            university: true,
          },
        },
        UserReferralFriend: {
          where: {
            FriendId: userId,
          },
        },
      },
    });
  }
  addUserReferral(data: Prisma.UserReferralCreateInput) {
    return this.prisma.userReferral.create({
      data,
    });
  }

  findUserByReferralToken(referralToken: string) {
    return this.prisma.user.findUnique({
      where: {
        referralToken,
      },
      select: {
        id: true,
        ReferralTokenUseCount: true,
      },
    });
  }

  async findUserGameByQuery(
    userId: number,
    filters: {
      from?: string;
      to?: string;
      limit: number;
      offset: number;
    },
  ) {
    const { limit, offset, from, to } = filters;
    const query: Prisma.UserGameFindManyArgs['where'] = {
      UserId: userId,
    };
    if (from) {
      query.AND = [
        {
          createdAt: { gte: from },
        },
      ];
    }
    if (to) {
      if (query.AND && query.AND instanceof Array) {
        query.AND.push({
          createdAt: { lte: to },
        });
      } else {
        query.AND = [
          {
            createdAt: { lte: to },
          },
        ];
      }
    }

    const data = await this.prisma.userGame.findMany({
      where: query,
      take: limit,
      skip: offset,
      select: {
        Game: {
          include: {
            GamePrizePool: {
              select: {
                winningResult: true,
              },
            },
            _count: {
              select: {
                UserGame: true,
              },
            },
          },
        },
        reward: true,
        response: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const count = await this.prisma.userGame.count({
      where: query,
    });
    return { data, count };
  }

  async findUserEventByQuery(
    userId: number,
    filters: {
      from?: string;
      to?: string;
      limit: number;
      offset: number;
    },
  ) {
    const { limit, offset, from, to } = filters;
    const query: Prisma.UserEventFindManyArgs['where'] = {
      UserId: userId,
    };
    if (from) {
      query.AND = [
        {
          createdAt: { gte: from },
        },
      ];
    }
    if (to) {
      if (query.AND && query.AND instanceof Array) {
        query.AND.push({
          createdAt: { lte: to },
        });
      } else {
        query.AND = [
          {
            createdAt: { lte: to },
          },
        ];
      }
    }
    const data = await this.prisma.userEvent.findMany({
      where: query,
      take: limit,
      skip: offset,
      select: {
        Event: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        major: true,
        university: true,
        firstName: true,
        lastName: true,
      },
    });
    const count = await this.prisma.userEvent.count({
      where: query,
    });
    return { data, count };
  }

  async findUserReferralsByQuery(
    userId: number,
    filters: {
      from?: string;
      to?: string;
      limit: number;
      offset: number;
    },
  ) {
    const { limit, offset, from, to } = filters;
    const query: Prisma.UserReferralFindManyArgs['where'] = {
      OwnerId: userId,
    };
    if (from) {
      query.AND = [
        {
          createdAt: { gte: from },
        },
      ];
    }
    if (to) {
      if (query.AND && query.AND instanceof Array) {
        query.AND.push({
          createdAt: { lte: to },
        });
      } else {
        query.AND = [
          {
            createdAt: { lte: to },
          },
        ];
      }
    }
    const data = await this.prisma.userReferral.findMany({
      where: query,
      take: limit,
      skip: offset,
      select: {
        Friend: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        createdAt: true,
        reward: true,
        updatedAt: true,
      },
    });
    const count = await this.prisma.userReferral.count({
      where: query,
    });
    return { data, count };
  }

  addUserStreak(userId: number, loginStreak: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        loginStreak,
        lastLogin: new Date(),
      },
    });
  }

  updateUserLastLogin(userId: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lastLogin: new Date(),
      },
    });
  }

  getExternalRewards(userId: number) {
    return this.prisma.externalReward.findMany({
      where: {
        isActive: true,
      },
      select: {
        name: true,
        reward: true,
        link: true,
        UserExternalReward: {
          where: {
            UserId: userId,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findExternalReward(userId: number, name: string) {
    return this.prisma.externalReward.findFirst({
      where: {
        isActive: true,
        name,
      },
      select: {
        name: true,
        reward: true,
        id: true,
        link: true,
        UserExternalReward: {
          where: {
            UserId: userId,
          },
          select: {
            id: true,
          },
        },
      },
    });
  }

  applyExternalReward(userId: number, externalRewardId: number) {
    return this.prisma.userExternalReward.create({
      data: {
        ExternalRewardId: externalRewardId,
        UserId: userId,
      },
    });
  }

  addUserReferralCount(userId: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ReferralTokenUseCount: {
          increment: 1,
        },
      },
    });
  }
}
