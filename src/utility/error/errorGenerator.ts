import { HttpStatus } from '@nestjs/common';

export interface IErrorForm {
  key?: string;
  message: string;
  extra?: any;
}

export class CustomError {
  constructor(
    public error: { errors: IErrorForm[]; status: keyof typeof HttpStatus },
  ) {}
}

export const generateError = (
  messages: IErrorForm[],
  status: keyof typeof HttpStatus,
) => {
  throw new CustomError({ errors: messages, status });
};
