import { ApiProperty } from '@nestjs/swagger';

export class GetMeResponse {
  constructor(data: GetMeResponse) {
    Object.assign(this, data);
  }
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
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  email?: string | null;

  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  referralToken?: string | null;

  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  university?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  major?: string | null;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  loginStreak: number;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  tokens: number;

  @ApiProperty({
    type: 'boolean',
    required: true,
  })
  hasGameAccess: boolean;
}
