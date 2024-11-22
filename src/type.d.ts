import { IReqUser } from '@app/general/general.interface';

declare module 'fastify' {
  interface FastifyRequest {
    user: IReqUser;
  }
}

export {};
