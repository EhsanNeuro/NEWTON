import { ApiProperty } from '@nestjs/swagger';

export class GameDto {
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
    required: true,
  })
  type: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  rewardType: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: true,
  })
  startAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: true,
  })
  endAt: Date;
  @ApiProperty({
    type: 'number',
    required: true,
  })
  iteration: number;
  @ApiProperty({
    type: 'number',
    required: false,
    nullable: true,
  })
  winningResult?: number | null;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  players: number;
}
