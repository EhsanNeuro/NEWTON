import { PaginationDto } from '@app/general/general.dto';
import { UserReferralDto } from '@app/user/dto/userReferral.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';

export class GetUserReferralsHistoryDto extends PaginationDto {
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
export class GetUserReferralsHistoryRes {
  constructor(data: GetUserReferralsHistoryRes) {
    Object.assign(this, data);
  }
  @ApiProperty({
    type: () => UserReferralDto,
    isArray: true,
  })
  result: UserReferralDto[];

  @ApiProperty({
    type: 'number',
  })
  total: number;
}
