import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
  @ApiProperty({
    type: 'number',
    required: true,
  })
  id: number;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  name: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  endAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  startAt: Date;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  type: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  attending_link?: string | null;
  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
  })
  duration?: number | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  location?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  longDescription?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  shortDescription?: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: true,
  })
  createdAt: Date;
}
