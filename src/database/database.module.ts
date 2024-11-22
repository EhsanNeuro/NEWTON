import { PrismaService } from '@app/database/database.service';
import { EventRepository } from '@app/database/repositories/event/event.repository';
import { GameRepository } from '@app/database/repositories/game/game.repository';
import { UserRepository } from '@app/database/repositories/user/user.repository';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [PrismaService, UserRepository, GameRepository, EventRepository],
  exports: [UserRepository, GameRepository, EventRepository],
})
export class DatabaseModule {}
