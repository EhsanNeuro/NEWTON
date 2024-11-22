import { GameRepository } from '@app/database/repositories/game/game.repository';
import { GameHelper } from '@app/game/game.helper';
import { GAME_TYPE } from '@app/game/game.interface';
import { QUEUE_NAME } from '@app/general/general.interface';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
@Processor(QUEUE_NAME.GAME_RESULT)
export class GameResultListener extends WorkerHost {
  constructor(
    private readonly gameRepo: GameRepository,
    private readonly gameHelper: GameHelper,
  ) {
    super();
  }

  async process() {
    const game = await this.gameRepo.findEndedGame();

    if (!game) {
      return;
    }
    Logger.log(
      `<<<<<<<<<<<<<<< Starting to calculate result for game ${game.name} with id = ${game.id}`,
    );
    if (game.type === GAME_TYPE.HIGHEST_UNIQUE) {
      await this.gameHelper.highestUniquePrizeCalculation(game.id);
    } else if (game.type === GAME_TYPE.TWO_THIRDS_AVERAGE) {
      await this.gameHelper.twoThirdsOfAveragePrizeCalculation(game.id);
    }
  }
}
