/* eslint-disable no-console */
import { createReferralToken } from '@app/utility/general/generateReferralToken';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const users: Prisma.UserCreateInput[] = [];

for (let i = 0; i < 10; i++) {
  users.push({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    referralToken: createReferralToken(faker.number.int()),
    telegramId: faker.number.bigInt(),
  });
}

prisma.user
  .createMany({
    data: users,
  })
  .catch((err) => {
    console.log(err);
  });

const games: Prisma.GameCreateInput[] = [
  {
    name: 'GAME number one',
    rewardType: 'test',
    type: 'HIGHEST_UNIQUE',
    iteration: 1,
    startAt: faker.date.recent(),
    endAt: faker.date.soon(),
  },
  {
    name: 'GAME number two',
    rewardType: 'test2',
    type: 'TWO_THIRDS_AVERAGE',
    iteration: 1,
    startAt: faker.date.recent(),
    endAt: faker.date.soon(),
  },
];

prisma.game
  .createMany({
    data: games,
  })
  .catch((err) => {
    console.log(err);
  });
