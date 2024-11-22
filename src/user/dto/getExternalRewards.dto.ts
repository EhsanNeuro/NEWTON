import { ApiProperty } from '@nestjs/swagger';

export class ExternalReward {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  reward: number;
  @ApiProperty({
    type: 'boolean',
    required: true,
  })
  isAppliedByUser: boolean;

  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  link?: string | null;
}
export class GetExternalRewardRes {
  constructor(data: GetExternalRewardRes) {
    Object.assign(this, data);
  }
  @ApiProperty({
    type: () => ExternalReward,
    isArray: true,
  })
  result: ExternalReward[];
}
