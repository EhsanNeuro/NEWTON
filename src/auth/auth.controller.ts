import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto, LoginUserRes } from '@app/auth/dto/loginUser.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@app/auth/auth.service';
import { LoginUserForTestDto } from '@app/auth/dto/loginUserForTest.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOkResponse({
    type: () => LoginUserRes,
  })
  @ApiOperation({ summary: 'Login user with telegram init data.' })
  loginUser(@Body() body: LoginUserDto) {
    return this.authService.userLogin(body);
  }

  @Post('/test/login')
  @ApiOkResponse({
    type: () => LoginUserRes,
  })
  @ApiOperation({ summary: 'Login user with id for test.' })
  loginUserForTest(@Body() body: LoginUserForTestDto) {
    return this.authService.loginUserForTest(body);
  }
}
