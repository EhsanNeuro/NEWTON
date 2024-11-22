import { EventDto } from '@app/event/dto/event.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetActiveEvents {
  constructor(data: GetActiveEvents) {
    Object.assign(this, data);
  }

  @ApiProperty({ type: () => EventDto, isArray: true })
  result: EventDto[];
}
