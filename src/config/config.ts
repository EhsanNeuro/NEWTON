import { registerAs } from '@nestjs/config';
import { env } from 'process';
import { CONFIG_NAME, IAppConfig } from 'src/config/config.interface';

export const AppConfig = registerAs(CONFIG_NAME.APP_CONFIG, (): IAppConfig => {
  return {
    proxyAddress: env.PROXY_ADDRESS || undefined,
    telegramClientId: env.TELEGRAM_CLIENT_ID || '',
    appPort: env.APP_PORT ? Number(env.APP_PORT) : 3000,
    database: {
      url:
        env.DATABASE_URL || 'mysql://root:123456@127.0.0.1:3306/telegram_bot',
      password: env.DATABASE_PASSWORD || '123456',
      username: env.DATABASE_USERNAME || 'root',
      port: env.DATABASE_PORT ? Number(env.DATABASE_PORT) : 3306,
    },
    webappUrl: env.WEBAPP_URL || '',
    jwtExpiration: env.JWT_EXPIRATION
      ? Number(env.JWT_EXPIRATION)
      : 3 * 60 * 60,
    jwtSecret: env.JWT_SECRET || 'topsecret',
    headerAccessTokenKey: env.HEADER_ACCESS_TOKEN_KEY || 'authorization',
    gameResultQueueIntervale: env.GAME_RESULT_QUEUE_INTERVALE
      ? Number(env.GAME_RESULT_QUEUE_INTERVALE)
      : 5, // mins
    appMode: env.APP_MODE || 'production',
    referralReward: env.REFERRAL_REWARD ? Number(env.REFERRAL_REWARD) : 1,
    referralLimit: env.REFERRAL_LIMIT ? Number(env.REFERRAL_LIMIT) : 5,
  };
});
