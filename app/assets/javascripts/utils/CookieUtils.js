import Cookie from 'cookie';

const CookieUtils = {
  SESSION_COOKIE_NAME: 'ticTacToeSession',

  setSessionCookie(value) {
    return this.setCookie(this.SESSION_COOKIE_NAME, value);
  },

  readSessionCookie() {
    return this.readCookie(this.SESSION_COOKIE_NAME);
  },

  deleteSessionCookie() {
    this.deleteCookie(this.SESSION_COOKIE_NAME);
  },

  setCookie(name, value) {
    document.cookie = Cookie.serialize(name, value);
    return document.cookie;
  },

  readCookie(name) {
    const cookies = Cookie.parse(document.cookie);
    return cookies[name];
  },

  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thur, 01 Jan 1970 00:00:00 UTC;`;
  }
};

export default CookieUtils;
