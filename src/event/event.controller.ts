import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetActiveEvents } from '@app/event/dto/getActiveEvents.dto';
import { FastifyRequest } from 'fastify';
import { AttendEventDto } from '@app/event/dto/attendEvent.dto';
import { EventService } from '@app/event/event.service';
import { Authorize } from '@app/utility/guard/authorization';
@ApiTags('Event')
@ApiBearerAuth()
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/active')
  @ApiOperation({ summary: 'Get all active events.' })
  @ApiOkResponse({
    type: () => GetActiveEvents,
  })
  @Authorize()
  getActiveEvents() {
    return this.eventService.getActiveEvents();
  }

  @Post('/attend')
  @ApiNoContentResponse()
  @ApiOperation({ summary: 'User Attends to an event.' })
  @Authorize()
  attendEvent(@Req() req: FastifyRequest, @Body() body: AttendEventDto) {
    return this.eventService.attendEvent(req.user.id, body);
  }
}
