import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AttendEventDto {
  @ApiProperty({
    type: 'number',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  eventId: number;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  lastName: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  university?: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  major?: string;
}
