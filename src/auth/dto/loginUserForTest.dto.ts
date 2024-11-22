import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class LoginUserForTestDto {
  @ApiProperty({
    type: 'number',
    required: true,
    minimum: 1,
    maximum: 10,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  id: number;
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
