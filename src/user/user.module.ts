import { BotModule } from '@app/bot/bot.module';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [BotModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
