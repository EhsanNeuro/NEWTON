import { GameDto } from '@app/game/dto/game.dto';
import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';

export class UserGameDto {
  @ApiProperty({
    type: () => GameDto,
  })
  Game: GameDto;
  @ApiProperty({
    type: 'number',
    required: true,
  })
  reward: number;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  response: JsonValue;
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
