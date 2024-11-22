import { PrismaService } from '@app/database/database.service';
import { IPrismaTransaction } from '@app/general/general.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, UserGame } from '@prisma/client';

@Injectable()
export class GameRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly config: ConfigService,
  ) {}

  createGame(data: Prisma.GameCreateInput) {
    return this.prisma.game.create({
      data,
    });
  }

  findGameByQuery(where: Prisma.GameFindFirstArgs['where']) {
    return this.prisma.game.findFirst({
      where,
    });
  }

  findGameWithUser(gameId: number, userId: number) {
    return this.prisma.game.findUnique({
      where: {
        id: gameId,
        startAt: {
          lte: new Date(),
        },
        endAt: {
          gte: new Date(),
        },
      },
      include: {
        UserGame: {
          where: {
            UserId: userId,
          },
        },
        GamePrizePool: {
          select: {
            inputStart: true,
            inputEnd: true,
            participationReward: true,
          },
        },
      },
    });
  }

  findActiveGames() {
    return this.prisma.game.findMany({
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
        iteration: true,
        rewardType: true,
        startAt: true,
        type: true,
        _count: {
          select: {
            UserGame: true,
          },
        },
      },
    });
  }

  createUserGame(data: Prisma.UserGameUncheckedCreateInput) {
    return this.prisma.userGame.create({ data });
  }

  findGameWithId(id: number) {
    return this.prisma.game.findUnique({
      where: {
        id,
      },
      include: {
        GamePrizePool: true,
      },
    });
  }

  findHighestUniqueWinner(gameId: number): Promise<UserGame[]> {
    return this.prisma.$queryRaw(
      Prisma.sql`SELECT
      *
    FROM
      UserGame
    WHERE
      GameId = ${gameId} AND response in (
      SELECT
        response
      FROM
        (
        SELECT
          response,
          COUNT(response) as _count
        FROM
          UserGame
        WHERE
          GameId = ${gameId}
        GROUP BY
          response
        HAVING
          _count = 1
        LIMIT 1 ) as ug);`,
    );
  }

  addUserReward(
    userId: number,
    gameId: number,
    reward: number,
    prisma: IPrismaTransaction,
  ) {
    return prisma.userGame.updateMany({
      where: {
        UserId: userId,
        GameId: gameId,
      },
      data: {
        reward: {
          increment: reward,
        },
      },
    });
  }

  addGameWinningResult(
    gameId: number,
    winningResult: number,
    prisma: IPrismaTransaction,
  ) {
    return prisma.gamePrizePool.update({
      where: {
        GameId: gameId,
      },
      data: {
        winningResult,
      },
    });
  }

  async findTwoThirdsOfAverageWinner(gameId: number): Promise<UserGame[]> {
    const {
      _avg: { response: average },
    } = await this.prisma.userGame.aggregate({
      where: {
        GameId: gameId,
      },
      _avg: {
        response: true,
      },
    });
    if (!average) {
      return [];
    }
    const twoThirdsOfAverage = (2 * average) / 3;

    return this.prisma.$queryRaw(
      Prisma.sql`SELECT * , ABS(response - ${twoThirdsOfAverage} ) AS diff FROM UserGame WHERE GameId = 1 ORDER BY diff ASC LIMIT 1;`,
    );
  }
  twoThirdsOfAverageOtherCount(
    query: Prisma.UserGameFindManyArgs['where'],
    prisma: IPrismaTransaction,
  ) {
    return prisma.userGame.count({
      where: query,
    });
  }

  addRewardWithQuery(
    query: Prisma.UserGameFindManyArgs['where'],
    reward: number,
    prisma: IPrismaTransaction,
  ) {
    return prisma.userGame.updateMany({
      where: query,
      data: {
        reward: {
          increment: reward,
        },
      },
    });
  }
  findGameUserWithQuery(query: Prisma.UserGameFindManyArgs['where']) {
    return this.prisma.userGame.findMany({
      where: query,
    });
  }
  findEndedGame() {
    return this.prisma.game.findFirst({
      where: {
        endAt: {
          lte: new Date(),
        },
        calcResult: true,
        GamePrizePool: {
          winningResult: null,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getUserTotalTokens(userId: number) {
    const gameTokens = await this.prisma.userGame.aggregate({
      where: {
        UserId: userId,
      },
      _sum: {
        reward: true,
      },
    });

    const externalRewardTokens = await this.prisma.externalReward.aggregate({
      where: {
        UserExternalReward: {
          some: {
            UserId: userId,
          },
        },
      },
      _sum: {
        reward: true,
      },
    });

    const referrals = await this.prisma.userReferral.aggregate({
      where: {
        OwnerId: userId,
      },
      _sum: {
        reward: true,
      },
    });

    return (
      (gameTokens._sum.reward || 0) +
      (externalRewardTokens._sum.reward || 0) +
      (referrals._sum.reward || 0)
    );
  }
}
