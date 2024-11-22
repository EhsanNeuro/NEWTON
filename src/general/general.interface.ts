import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface IReqUser {
  id: number;
}
export type IPrismaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export enum QUEUE_NAME {
  GAME_RESULT = 'gameResult',
}
export enum EXTERNAL_REWARD_NAME {
  TELEGRAM = 'TELEGRAM',
}
