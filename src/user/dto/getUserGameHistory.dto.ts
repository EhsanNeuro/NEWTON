import { PaginationDto } from '@app/general/general.dto';
import { UserGameDto } from '@app/user/dto/userGame.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';

export class GetUserGameHistoryDto extends PaginationDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  from?: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  to?: string;
}
export class GetUserGameHistoryRes {
  constructor(data: GetUserGameHistoryRes) {
    Object.assign(this, data);
  }

  @ApiProperty({
    type: () => UserGameDto,
    isArray: true,
  })
  result: UserGameDto[];
  @ApiProperty({
    type: 'number',
  })
  total: number;
}
