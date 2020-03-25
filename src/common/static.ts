import path from 'path';
import * as url from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

interface GetStatic {
  (val: string): string;
}

declare const __static: string;

// see https://github.com/electron-userland/electron-/issues/99#issuecomment-459251702
export const getStatic: GetStatic = val => {
  if (isDevelopment) {
    return url.resolve(window.location.origin, val);
  }
  if (process.env.ELECTRON_START) {
    return path.resolve(__dirname, '../../static/', val);
  }
  return path.resolve(__static, val);
};
