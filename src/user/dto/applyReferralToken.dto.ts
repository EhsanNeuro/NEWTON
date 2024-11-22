import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ApplyReferralTokenDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  referralToken: string;
}
