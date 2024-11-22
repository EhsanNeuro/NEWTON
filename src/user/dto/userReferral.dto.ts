import { ApiProperty } from '@nestjs/swagger';

export class FriendDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  firstName?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  lastName?: string | null;
}
export class UserReferralDto {
  @ApiProperty({
    type: () => FriendDto,
    required: true,
  })
  Friend: FriendDto;
  @ApiProperty({
    type: 'number',
    required: true,
  })
  reward: number;

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
