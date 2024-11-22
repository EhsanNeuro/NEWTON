import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min, Validate } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: 'number',
    required: false,
    minimum: 0,
    maximum: 20,
    default: 10,
  })
  @IsOptional()
  @Min(0)
  @Max(20)
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Validate((value) => {
    if (!value) {
      return 10;
    }
  })
  limit: number;

  @ApiProperty({
    type: 'number',
    required: false,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Validate((value) => {
    if (!value) {
      return 0;
    }
  })
  offset: number;
}
