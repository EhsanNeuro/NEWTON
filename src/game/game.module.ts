import { GameController } from '@app/game/game.controller';
import { GameHelper } from '@app/game/game.helper';
import { GameService } from '@app/game/game.service';
import { QUEUE_NAME } from '@app/general/general.interface';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAME.GAME_RESULT,
    }),
  ],
  controllers: [GameController],
  providers: [GameService, GameHelper],
  exports: [GameHelper],
})
export class GameModule {}
