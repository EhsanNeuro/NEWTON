import { GameDto } from '@app/game/dto/game.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetActiveGames {
  constructor(data: GetActiveGames) {
    Object.assign(this, data);
  }

  @ApiProperty({
    type: () => GameDto,
    isArray: true,
  })
  result: GameDto[];
}
