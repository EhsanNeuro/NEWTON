import { EventDto } from '@app/event/dto/event.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserEvent {
  @ApiProperty({ type: () => EventDto })
  Event: EventDto;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  email: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  major?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  university?: string | null;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  firstName: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  lastName: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: true,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  updatedAt?: Date | null;
}
