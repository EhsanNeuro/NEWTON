import { gray, yellow, magenta, red, white, green, blue, Color } from 'colors';

export type ColorsType = {
  [key: string]: Color;
};
export const colors: ColorsType = {
  silly: gray,
  warn: yellow,
  http: magenta,
  error: red,
  verbose: white,
  info: green,
  debug: blue,
};
