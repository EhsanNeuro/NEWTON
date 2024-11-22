export interface IAppConfig {
  proxyAddress?: string;
  telegramClientId: string;
  appPort: number;
  database: {
    url: string;
    port: number;
    username: string;
    password: string;
  };

  webappUrl: string;
  jwtExpiration: number;
  jwtSecret: string;
  headerAccessTokenKey: string;
  gameResultQueueIntervale: number;
  appMode: string;
  referralReward: number;
  referralLimit: number;
}
export enum CONFIG_NAME {
  APP_CONFIG = 'AppConfig',
}
