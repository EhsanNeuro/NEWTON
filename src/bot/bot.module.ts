import { DatabaseModule } from '@app/database/database.module';
import { Module } from '@nestjs/common';
import { BotService } from 'src/bot/bot.service';

@Module({
  imports: [DatabaseModule],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
