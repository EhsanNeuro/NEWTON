import { colors, ColorsType } from '@app/utility/logger/color';
import { WinstonModuleOptions } from 'nest-winston';
import { transports, format } from 'winston';
const { combine, timestamp, errors, simple, printf } = format;

const createCustomFormat = (colors: ColorsType) => {
  return printf((info) => {
    const { level, stack } = info;
    let { message } = info;

    if (message) {
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
    }

    switch (level) {
      case 'silly':
        return colors.silly(`[${level}] ${message}`);

      case 'warn':
        return colors.warn(`[${level}] ${message}`);

      case 'http':
        return colors.http(`[${level}] ${message}`);

      case 'error':
        return colors.error(`[${level}] ${message}\n ${stack || ''}`);

      case 'verbose':
        return colors.verbose(`[${level}] ${message}`);

      case 'info':
        return colors.info(`[${level}] ${message}`);

      case 'debug':
        return colors.debug(`[${level}] ${message}`);
      default:
        return colors.info(`[${level}] ${message}`);
    }
  });
};

const objectStringFormat = createCustomFormat(colors);
export const winstonConfig: WinstonModuleOptions = {
  format: combine(timestamp(), errors({ stack: true }), simple()),
  exitOnError: false,
  transports: [
    // new transports.File({
    //   filename: `./logs/${'develope'}.log`,
    // }),
    // new transports.File({
    //   filename: `./logs/${'develope'}-errors.log`,
    //   level: 'error',
    // }),
    new transports.Console({
      format: combine(timestamp(), objectStringFormat),
    }),
  ],
};
