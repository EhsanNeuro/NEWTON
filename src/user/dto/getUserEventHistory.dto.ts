import { PaginationDto } from '@app/general/general.dto';
import { UserEvent } from '@app/user/dto/userEvent.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';

export class GetUserEventHistoryDto extends PaginationDto {
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
export class GetUserEventHistoryRes {
  constructor(data: GetUserEventHistoryRes) {
    Object.assign(this, data);
  }

  @ApiProperty({
    type: () => UserEvent,
    isArray: true,
  })
  result: UserEvent[];
  @ApiProperty({
    type: 'number',
  })
  total: number;
}
