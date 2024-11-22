import { EventController } from '@app/event/event.controller';
import { EventService } from '@app/event/event.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
