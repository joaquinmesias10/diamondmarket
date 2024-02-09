import cookie from 'js-cookie';
import nextCookie from 'next-cookies';
// import { isBrowser } from './isBrowser';
const isBrowser = typeof window !== 'undefined';

export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

export const getCookieFromServer = (ctx, key = 'id_token') => {
  const cookie = nextCookie(ctx);
  const token = cookie && cookie[key] ? cookie[key] : false;
  if (!token) {
    return null;
  }
  return token;
};

export const getCookie = (key, context?) => {
  return isBrowser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(context, key);
};

export const setCookie = (key, token) => {
  cookie.set(key, token, { expires: 7 });
};

export const removeCookie = (key) => {
  cookie.remove(key);
};
