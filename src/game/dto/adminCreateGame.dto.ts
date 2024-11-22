import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class AdminCreateGameDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(256)
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(128)
  @IsString()
  type: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(128)
  @IsString()
  rewardType: string;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsInt()
  iteration: number;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsISO8601()
  startAt: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsISO8601()
  endAt: string;
}
