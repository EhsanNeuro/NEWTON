import { CustomError, IErrorForm } from '@app/utility/error/errorGenerator';
import { HttpService } from '@app/utility/http/http.service';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FastifyReply } from 'fastify';
import { env } from 'process';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    // eslint-disable-next-line no-console
    const res = host.switchToHttp().getResponse<FastifyReply>();

    if (exception instanceof CustomError) {
      Logger.log(exception);
      return HttpService.UnsuccessfulResponse(
        res,
        exception.error.errors,
        exception.error.status,
      );
    }

    if (exception instanceof PrismaClientKnownRequestError) {
      if (env.NODE_ENV === 'production') {
        Logger.log(exception);
        return HttpService.UnsuccessfulResponse(
          // runtime errors
          res,
          [{ message: 'Something went wrong!' }],
          'INTERNAL_SERVER_ERROR',
        );
      }

      // database errors
      const errors: IErrorForm[] = [];
      let status: keyof typeof HttpStatus | undefined;

      if (exception.code === 'P2002') {
        errors.push({
          message: (exception.meta as any)?.target,
        });
        status = 'BAD_REQUEST';
      } else if (exception.code === 'P2017') {
        errors.push({
          message: `${(exception.meta as any)?.child_name} not found`,
        });
        status = 'NOT_FOUND';
      }

      return HttpService.UnsuccessfulResponse(res, errors, status);
    }

    if (exception instanceof BadRequestException) {
      // validation errors

      const errors: IErrorForm[] = [];

      const errResponse = exception.getResponse() as
        | string
        | {
            status: number;
            errors: { [key: string]: string };
          };

      if (errResponse instanceof Object) {
        Object.values(errResponse.errors).forEach((item) => {
          errors.push({
            message: item,
          });
        });
      } else {
        errors.push({
          message: exception.message,
        });
      }

      return HttpService.UnsuccessfulResponse(res, errors, 'BAD_REQUEST');
    }

    return HttpService.UnsuccessfulResponse(
      res,
      [{ message: exception.message }],
      'INTERNAL_SERVER_ERROR',
    );
  }
}
