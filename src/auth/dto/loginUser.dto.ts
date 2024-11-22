import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  initData: string;
  @ApiProperty({
    type: 'string',
    required: false,
    example: undefined,
  })
  @IsString()
  @IsOptional()
  referralToken?: string;
}
export class LoginUserRes {
  constructor(data: LoginUserRes) {
    Object.assign(this, data);
  }
  @ApiProperty({
    type: 'string',
    required: true,
  })
  access_token: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  expirationTime: number;
}
