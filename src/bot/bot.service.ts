import {
  botStartFailureMessage,
  startGameMessage,
  welcomeDescription,
} from '@app/bot/bot.messages';
import { UserRepository } from '@app/database/repositories/user/user.repository';
import { createReferralToken } from '@app/utility/general/generateReferralToken';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { CONFIG_NAME, IAppConfig } from 'src/config/config.interface';
import { Telegraf } from 'telegraf';
@Injectable()
export class BotService {
  private bot: Telegraf | undefined;
  private appConfig: IAppConfig;
  constructor(
    private readonly config: ConfigService,
    private readonly userRepo: UserRepository,
  ) {
    this.appConfig = this.config.get<IAppConfig>(
      CONFIG_NAME.APP_CONFIG,
    ) as IAppConfig;
  }

  async bootstrap() {
    if (this.appConfig.proxyAddress) {
      this.bot = new Telegraf(this.appConfig.telegramClientId, {
        handlerTimeout: 10_000, // 10s in ms
        telegram: {
          agent: new HttpsProxyAgent(this.appConfig.proxyAddress),
        },
      });
    } else {
      this.bot = new Telegraf(this.appConfig.telegramClientId, {
        handlerTimeout: 10_000, // 10s in ms
      });
    }
    this.handleBotStartCommand();
    await this.bot.launch();
    Logger.log('Telegram bot started successfully');
  }
  async onModuleInit() {
    this.bootstrap().catch((err) => {
      Logger.error(err);
    });
  }

  onModuleDestroy() {
    this.bot?.stop();
  }

  handleBotStartCommand() {
    this.bot?.start(async (ctx) => {
      let referralToken: string | null;

      if (ctx.chat.type === 'private') {
        referralToken = ctx.payload;

        if (referralToken?.length > 60) {
          referralToken = null;
        }

        const telegramId = ctx.chat.id;

        let user = await this.userRepo.findUserByTelegramId(telegramId);
        const name =
          ctx.chat.first_name || ctx.chat.last_name || ctx.chat.username || '';
        if (!user) {
          const firstName = ctx.chat.first_name;
          const lastName = ctx.chat.last_name;

          user = await this.userRepo.createUser({
            referralToken: createReferralToken(telegramId),
            telegramId,
            firstName,
            lastName,
            telegramData: JSON.stringify(ctx.chat),
          });
          if (referralToken) {
            const owner =
              await this.userRepo.findUserByReferralToken(referralToken);
            if (
              owner &&
              owner.ReferralTokenUseCount < this.appConfig.referralLimit
            ) {
              const referral = await this.userRepo
                .addUserReferral({
                  Friend: {
                    connect: {
                      id: user.id,
                    },
                  },
                  Owner: {
                    connect: {
                      referralToken,
                    },
                  },
                  reward: this.appConfig.referralReward || 1,
                })
                .catch((err) => {
                  Logger.error(
                    `Create referral User failed. referralToken = ${referralToken}`,
                    err,
                  );
                });

              if (referral) {
                await this.userRepo.addUserReferralCount(owner.id);
              }
            }
          }
        }

        await ctx.setChatMenuButton({
          text: 'Play',
          type: 'web_app',
          web_app: {
            url: this.appConfig.webappUrl,
          },
        });

        if (user) {
          await ctx.reply(welcomeDescription(name), {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: startGameMessage,
                    web_app: {
                      url: this.appConfig.webappUrl,
                    },
                  },
                ],
              ],
            },
          });
        } else {
          await ctx.reply(botStartFailureMessage, {});
        }
      }
    });
  }

  async checkIsUserJoinedToTelegramChannel(data: {
    telegramId: number;
    channelName?: string | null;
  }) {
    const { telegramId } = data;
    if (data.channelName?.length) {
      const channelNameSplitted = data.channelName
        .split('/')
        .filter((item) => item);
      const channelName = channelNameSplitted[channelNameSplitted.length - 1];

      const res = await this.bot?.telegram
        .getChatMember(`@${channelName}`, telegramId)
        .catch(() => {
          status: undefined;
        });
      return res?.status;
    }
  }
}
