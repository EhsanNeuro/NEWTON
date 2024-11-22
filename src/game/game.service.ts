import { CONFIG_NAME, IAppConfig } from '@app/config/config.interface';
import { GameRepository } from '@app/database/repositories/game/game.repository';
import { AdminCreateGameDto } from '@app/game/dto/adminCreateGame.dto';
import { GetActiveGames } from '@app/game/dto/getActiveGames.dto';
import { UserPlayGameDto } from '@app/game/dto/userPlayGame.dto';
import { QUEUE_NAME } from '@app/general/general.interface';
import { generateError } from '@app/utility/error/errorGenerator';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
@Injectable()
export class GameService {
  constructor(
    private readonly gameRepo: GameRepository,
    private readonly config: ConfigService,

    @InjectQueue(QUEUE_NAME.GAME_RESULT) private gameResultQueue: Queue,
  ) {
    this._addGameResultJob();
  }
  async adminCreateGame(data: AdminCreateGameDto) {
    const isGameExists = await this.gameRepo.findGameByQuery({
      name: data.name,
      iteration: data.iteration,
      rewardType: data.rewardType,
      type: data.type,
    });

    if (isGameExists) {
      throw generateError(
        [
          {
            message: 'GAME_EXISTS',
          },
        ],
        'BAD_REQUEST',
      );
    }
    return this.gameRepo.createGame(data);
  }

  async userPlayGame(userId: number, data: UserPlayGameDto) {
    const isGameExists = await this.gameRepo.findGameWithUser(
      data.gameId,
      userId,
    );

    if (!isGameExists) {
      throw generateError(
        [
          {
            message: 'GAME_NOT_FOUND',
          },
        ],
        'NOT_FOUND',
      );
    }

    if (isGameExists.UserGame.length) {
      throw generateError(
        [
          {
            message: 'USER_HAS_ALREADY_PLAYED',
          },
        ],
        'BAD_REQUEST',
      );
    }
    if (isGameExists.GamePrizePool) {
      if (
        data.response > isGameExists.GamePrizePool.inputEnd ||
        data.response < isGameExists.GamePrizePool.inputStart
      ) {
        throw generateError(
          [
            {
              message: 'INVALID_RESPONSE',
            },
          ],
          'BAD_REQUEST',
        );
      }
    }

    await this.gameRepo.createUserGame({
      UserId: userId,
      GameId: data.gameId,
      response: data.response,
      reward: isGameExists.GamePrizePool?.participationReward || 0,
    });
    return;
  }

  async getActiveGames() {
    const activeGames = await this.gameRepo.findActiveGames();
    return new GetActiveGames({
      result: activeGames.map((item) => {
        const { _count, ...rest } = item;
        return {
          ...rest,
          players: _count.UserGame,
        };
      }),
    });
  }
  private async _addGameResultJob() {
    const activeJobs = await this.gameResultQueue.getDelayedCount();
    if (activeJobs === 0) {
      await this.gameResultQueue.add(
        `${QUEUE_NAME.GAME_RESULT} job`,
        {},
        {
          repeat: {
            every:
              (this.config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)
                ?.gameResultQueueIntervale as number) *
              60 *
              1000, // millisecond
          },
        },
      );
      Logger.log('<<<<<<<<<<<<Queue for game result is activated >>>>>>>>>>>');
    } else {
      Logger.log(
        '<<<<<<<<<<<<Queue for game result is already activated >>>>>>>>>>>',
      );
    }
  }
}
