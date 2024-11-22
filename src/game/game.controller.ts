import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserPlayGameDto } from '@app/game/dto/userPlayGame.dto';
import { FastifyRequest } from 'fastify';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetActiveGames } from '@app/game/dto/getActiveGames.dto';
import { GameService } from '@app/game/game.service';
import { Authorize } from '@app/utility/guard/authorization';
@ApiTags('Game')
@ApiBearerAuth()
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // @Post('/')
  // adminCreateGame(@Body() body: AdminCreateGameDto) {
  //   return this.gameService.adminCreateGame(body);
  // }

  @Post('/play')
  @ApiCreatedResponse()
  @ApiOperation({ summary: 'User plays an game.' })
  @Authorize()
  userPlayGame(@Req() req: FastifyRequest, @Body() body: UserPlayGameDto) {
    return this.gameService.userPlayGame(req.user.id, body);
  }

  @Get('/active')
  @ApiOperation({ summary: 'Get All active games.' })
  @ApiOkResponse({
    type: () => GetActiveGames,
  })
  @Authorize()
  getActiveGames() {
    return this.gameService.getActiveGames();
  }
}
