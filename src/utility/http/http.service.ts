import { IErrorForm } from '@app/utility/error/errorGenerator';
import { HttpStatus, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Injectable()
export class HttpService {
  static UnsuccessfulResponse(
    res: FastifyReply,
    errors: IErrorForm[] = [],
    status: keyof typeof HttpStatus = 'BAD_REQUEST',
  ) {
    const model: { success: boolean; errors: IErrorForm[]; data?: unknown } = {
      success: false,
      errors,
    };

    res.status(HttpStatus[status]);

    return res.send(model);
  }
}
