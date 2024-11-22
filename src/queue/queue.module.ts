import { GameModule } from '@app/game/game.module';
import { GameResultListener } from '@app/queue/gameResult.listener';
import { Module } from '@nestjs/common';

@Module({
  imports: [GameModule],
  controllers: [],
  providers: [GameResultListener],
})
export class QueueModule {}
