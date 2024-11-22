import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import {
  GetUserGameHistoryDto,
  GetUserGameHistoryRes,
} from '@app/user/dto/getUserGameHistory.dto';
import {
  GetUserEventHistoryDto,
  GetUserEventHistoryRes,
} from '@app/user/dto/getUserEventHistory.dto';
import { GetMeResponse } from '@app/user/dto/getMe.dto';
import { GetUserReferralsHistoryRes } from '@app/user/dto/getUserReferrals.dto';
import { UserService } from '@app/user/user.service';
import { Authorize } from '@app/utility/guard/authorization';
import { GetExternalRewardRes } from '@app/user/dto/getExternalRewards.dto';
import { ApplyExternalRewardDto } from '@app/user/dto/applyExternalReward.dto';
import { ApplyReferralTokenDto } from '@app/user/dto/applyReferralToken.dto';
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: () => GetMeResponse,
  })
  @ApiOperation({ summary: 'Get user information.' })
  @Authorize()
  @Get('/me')
  getUserInformation(@Req() req: FastifyRequest) {
    return this.userService.getUserInformation(req.user.id);
  }

  @Get('/game-history')
  @ApiOperation({ summary: 'Get user played games history.' })
  @ApiOkResponse({
    type: () => GetUserGameHistoryRes,
  })
  @Authorize()
  getUserGameHistory(
    @Req() req: FastifyRequest,
    @Query() query: GetUserGameHistoryDto,
  ) {
    return this.userService.getUserGameHistory(req.user.id, query);
  }

  @Get('/event-history')
  @ApiOperation({ summary: 'Get user attended events history.' })
  @ApiOkResponse({
    type: () => GetUserEventHistoryRes,
  })
  @Authorize()
  getUserEventHistory(
    @Req() req: FastifyRequest,
    @Query() query: GetUserEventHistoryDto,
  ) {
    return this.userService.getUserEventHistory(req.user.id, query);
  }

  @Get('/referral')
  @ApiOperation({ summary: 'Get user friends.' })
  @ApiOkResponse({
    type: () => GetUserReferralsHistoryRes,
  })
  @Authorize()
  getUserReferrals(
    @Req() req: FastifyRequest,
    @Query() query: GetUserEventHistoryDto,
  ) {
    return this.userService.getUserReferrals(req.user.id, query);
  }

  @Get('/external-reward')
  @ApiOperation({ summary: 'Get external rewards.' })
  @ApiOkResponse({
    type: () => GetExternalRewardRes,
  })
  @Authorize()
  getExternalReward(@Req() req: FastifyRequest) {
    return this.userService.getExternalReward(req.user.id);
  }

  @Post('/external-reward')
  @ApiOperation({ summary: 'apply external rewards.' })
  @ApiCreatedResponse()
  @Authorize()
  applyExternalReward(
    @Req() req: FastifyRequest,
    @Body() body: ApplyExternalRewardDto,
  ) {
    return this.userService.applyExternalReward(req.user.id, body);
  }

  @Post('/referral-token')
  @ApiOperation({ summary: 'apply referral token.' })
  @ApiCreatedResponse()
  @Authorize()
  applyReferralToken(
    @Req() req: FastifyRequest,
    @Body() body: ApplyReferralTokenDto,
  ) {
    return this.userService.applyReferralToken(req.user.id, body);
  }
}
