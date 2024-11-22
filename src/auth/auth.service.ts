import { AuthHelper } from '@app/auth/auth.helper';
import { ITelegramUser } from '@app/auth/auth.interface';
import { LoginUserDto } from '@app/auth/dto/loginUser.dto';
import { LoginUserForTestDto } from '@app/auth/dto/loginUserForTest.dto';
import { CONFIG_NAME, IAppConfig } from '@app/config/config.interface';
import { UserRepository } from '@app/database/repositories/user/user.repository';
import { generateError } from '@app/utility/error/errorGenerator';
import { createReferralToken } from '@app/utility/general/generateReferralToken';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly authHelper: AuthHelper,
    private readonly userRepo: UserRepository,
    private readonly config: ConfigService,
  ) {}
  async userLogin(data: LoginUserDto) {
    const { initData, referralToken } = data;

    const decodedInitData = new URLSearchParams(initData);

    const isDataValid = this.authHelper.verifyInitDataFromWebApp({
      decodedInitData,
    });

    if (!isDataValid) {
      throw generateError(
        [
          {
            message: 'ERROR_IN_DATA',
          },
        ],
        'BAD_REQUEST',
      );
    }
    const telegramUser = decodedInitData.get('user');

    if (!telegramUser) {
      throw generateError(
        [
          {
            message: 'ERROR_IN_USER',
          },
        ],
        'BAD_REQUEST',
      );
    }

    // const authDate = decodedInitData.get('auth_date');

    // if (
    //   authDate &&
    //   Number(authDate) <
    //     Math.floor(
    //       (Date.now() - config.telegramBot.tokenExpirationTime * 1000) / 1000,
    //     )
    // ) {
    //   return res.status(400).send({ info: 'ERROR_IN_AUTH_DATE' });
    // }

    const parsedUser: ITelegramUser = JSON.parse(telegramUser);
    const telegramId = parsedUser.id;
    const user = await this.userRepo.findUserByTelegramId(telegramId);
    if (!user) {
      const firstName = parsedUser.first_name;
      const lastName = parsedUser.last_name;
      const newUser = await this.userRepo.createUser({
        referralToken: createReferralToken(telegramId),
        telegramId,
        firstName,
        lastName,
        lastLogin: new Date(),
        loginStreak: 1,
        telegramData: telegramUser,
      });
      if (referralToken) {
        const owner =
          await this.userRepo.findUserByReferralToken(referralToken);
        if (
          owner &&
          owner.ReferralTokenUseCount <
            (this.config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)
              ?.referralLimit as number)
        ) {
          const referral = await this.userRepo
            .addUserReferral({
              Friend: {
                connect: {
                  id: newUser.id,
                },
              },
              Owner: {
                connect: {
                  referralToken,
                },
              },
              reward:
                this.config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)
                  ?.referralReward || 1,
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
      const { token, expirationTime } = this.authHelper.getJwtToken(newUser);

      return {
        access_token: token,
        expirationTime,
      };
    }
    if (user.lastLogin) {
      if (
        dayjs(user.lastLogin).add(1, 'day').format('YYYY-MM-DD') ===
        dayjs().format('YYYY-MM-DD')
      ) {
        await this.userRepo.addUserStreak(user.id, user.loginStreak + 1);
      } else if (
        dayjs(user.lastLogin).add(1, 'day').format('YYYY-MM-DD') <
        dayjs().format('YYYY-MM-DD')
      ) {
        await this.userRepo.addUserStreak(user.id, 1);
      } else {
        await this.userRepo.updateUserLastLogin(user.id);
      }
    } else {
      await this.userRepo.updateUserLastLogin(user.id);
    }

    const { token, expirationTime } = this.authHelper.getJwtToken(user);

    return {
      access_token: token,
      expirationTime,
    };
  }

  async loginUserForTest(data: LoginUserForTestDto) {
    if (
      this.config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)?.appMode !== 'test'
    ) {
      throw generateError(
        [
          {
            message: 'This api is just for test mode',
          },
        ],
        'FORBIDDEN',
      );
    }
    const user = await this.userRepo.findUserById(data.id);
    if (!user) {
      throw generateError(
        [
          {
            message: 'USER_NOT_FOUND',
          },
        ],
        'NOT_FOUND',
      );
    }
    const { token, expirationTime } = this.authHelper.getJwtToken(user);

    return {
      access_token: token,
      expirationTime,
    };
  }
}
