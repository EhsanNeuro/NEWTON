import { CONFIG_NAME, IAppConfig } from '@app/config/config.interface';
import { generateError } from '@app/utility/error/errorGenerator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

export const AuthorizeOptions = Reflector.createDecorator();

@Injectable()
export class Authorization implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    await this.authorize(req);
    return true;
  }

  async authorize(req: FastifyRequest) {
    const headerAccessTokenKey = this.config.get<IAppConfig>(
      CONFIG_NAME.APP_CONFIG,
    )?.headerAccessTokenKey as string;

    let access_token = req.headers[headerAccessTokenKey] as string | undefined;

    if (!access_token) {
      throw generateError(
        [
          {
            key: 'ACCESS_TOKEN_INVALID',
            message: 'Invalid access token. Please login again.',
          },
        ],
        'UNAUTHORIZED',
      );
    }

    access_token = access_token.split(' ').at(-1);

    if (!access_token) {
      throw generateError(
        [
          {
            key: 'ACCESS_TOKEN_INVALID',
            message: 'Invalid access token. Please login again.',
          },
        ],
        'UNAUTHORIZED',
      );
    }

    const access = this.jwtService.verify(access_token, {
      secret: this.config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)?.jwtSecret,
    });

    if (access?.err || !access.id) {
      throw generateError(
        [
          {
            key: 'ACCESS_TOKEN_EXPIRED',
            message: 'access token expired! Please login.',
          },
        ],
        'UNAUTHORIZED',
      );
    }

    req.user = {
      id: access.id,
    };
  }
}

export function Authorize() {
  return applyDecorators(AuthorizeOptions(), UseGuards(Authorization));
}
