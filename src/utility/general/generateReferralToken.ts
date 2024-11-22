import { generate } from 'rand-token';

export const createReferralToken = (telegramId: number) => {
  return (
    generate(1, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') + `${telegramId}`
  ).substring(0, 6);
};
