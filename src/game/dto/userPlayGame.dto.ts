import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class UserPlayGameDto {
  @ApiProperty({
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gameId: number;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  response: number;
}
