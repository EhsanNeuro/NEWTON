import { GameRepository } from '@app/database/repositories/game/game.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameHelper {
  constructor(private readonly gameRepo: GameRepository) {
    this.twoThirdsOfAveragePrizeCalculation(1);
  }

  async highestUniquePrizeCalculation(gameId: number) {
    const game = await this.gameRepo.findGameWithId(gameId);

    if (!game) {
      return;
    }
    const prizePoll = game.GamePrizePool;
    if (!prizePoll) {
      Logger.warn(
        `<<<<<<<<<<<<<< Prize pool for game ${game.name} with id ${gameId} is not exists >>>>>>>>>>>>>>>>>>`,
      );
      return;
    }
    const winner = await this.gameRepo.findHighestUniqueWinner(gameId);

    await this.gameRepo.prisma.$transaction(async (prisma) => {
      if (!winner.length) {
        // There is no winner so nobody gets the reward
        await this.gameRepo.addGameWinningResult(gameId, 0, prisma);
        return;
      }

      const winnerReward = prizePoll.prizePool * prizePoll.winnerRewardRatio;
      await this.gameRepo.addUserReward(
        Number(winner[0].UserId),
        gameId,
        winnerReward,
        prisma,
      );
      await this.gameRepo.addGameWinningResult(
        gameId,
        winner[0].response,
        prisma,
      );
    });
  }

  async twoThirdsOfAveragePrizeCalculation(gameId: number) {
    const game = await this.gameRepo.findGameWithId(gameId);

    if (!game) {
      return;
    }
    const prizePoll = game.GamePrizePool;
    if (!prizePoll) {
      Logger.warn(
        `<<<<<<<<<<<<<< Prize pool for game ${game.name} with id ${gameId} is not exists >>>>>>>>>>>>>>>>>>`,
      );
      return;
    }
    const winner = await this.gameRepo.findTwoThirdsOfAverageWinner(gameId);
    await this.gameRepo.prisma.$transaction(async (prisma) => {
      if (winner.length) {
        const winners = await this.gameRepo.findGameUserWithQuery({
          GameId: gameId,
          response: winner[0].response,
        });

        const winnerIds = winners.map((item) => item.id);
        // calculate winners reward
        const winnerReward = prizePoll.prizePool * prizePoll.winnerRewardRatio;
        await this.gameRepo.addRewardWithQuery(
          {
            GameId: gameId,
            UserId: {
              in: winnerIds,
            },
          },
          winnerReward,
          prisma,
        );

        const diff = prizePoll.diff;
        if (diff) {
          // calculate others reward
          const winnerResponse = winner[0].response;
          const othersWithDiffQuery: Prisma.UserGameFindManyArgs['where'] = {
            GameId: gameId,
            response: {
              gte: winnerResponse - diff,
              lte: winnerResponse + diff,
            },
            UserId: {
              notIn: winnerIds,
            },
          };
          const othersCount = await this.gameRepo.twoThirdsOfAverageOtherCount(
            othersWithDiffQuery,
            prisma,
          );

          const othersPrize =
            (prizePoll.prizePool * prizePoll.otherRewardRatio) / othersCount;

          await this.gameRepo.addRewardWithQuery(
            othersWithDiffQuery,
            othersPrize,
            prisma,
          );
        }
        await this.gameRepo.addGameWinningResult(
          gameId,
          winner[0].response,
          prisma,
        );
      } else {
        await this.gameRepo.addGameWinningResult(gameId, 0, prisma);
      }
    });
  }
}
