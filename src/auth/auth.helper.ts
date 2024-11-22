import { CONFIG_NAME, IAppConfig } from '@app/config/config.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  verifyInitDataFromWebApp({ decodedInitData }) {
    const hash = decodedInitData.get('hash');
    decodedInitData.delete('hash');
    const v = Array.from(decodedInitData.entries());
    v.sort(([aN], [bN]) => aN.localeCompare(bN));
    const dataCheckString = v.map(([n, c]) => `${n}=${c}`).join('\n');
    const secretKey = createHmac('sha256', 'WebAppData')
      .update(
        this.config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)
          ?.telegramClientId as string,
      )
      .digest();
    const hmacHash = crypto;
    createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    return hash === hmacHash;
  }

  getJwtToken(user: { id: number }) {
    const expirationTime = this.config.get<IAppConfig>(
      CONFIG_NAME.APP_CONFIG,
    )?.jwtExpiration;

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: expirationTime,
        secret: this.config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)?.jwtSecret,
      },
    );

    return {
      token,
      expirationTime,
    };
  }
}
