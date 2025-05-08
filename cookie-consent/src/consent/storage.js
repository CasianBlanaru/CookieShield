import { Logger } from '../utils/logger.js';

const logger = new Logger({ debugMode: false, silentMode: true });

export function setCookie(name, value, expiresInSeconds, options = {}) {
  try {
    const expires = new Date(Date.now() + expiresInSeconds * 1000).toUTCString();
    const cookieParts = [
      `${name}=${encodeURIComponent(value)}`,
      `expires=${expires}`,
      `path=${options.path || '/'}`,
      `SameSite=${options.sameSite || 'Lax'}`,
      options.secure ? 'secure' : '',
      options.domain ? `domain=${options.domain}` : '',
    ].filter(Boolean);
    document.cookie = cookieParts.join('; ');
    logger.debug(`Cookie set: ${name}`);
  } catch (error) {
    logger.error(`Failed to set cookie ${name}:`, error);
  }
}

export function getCookie(name) {
  try {
    const cookies = document.cookie.split(';').map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(`${name}=`)) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  } catch (error) {
    logger.error(`Failed to get cookie ${name}:`, error);
    return null;
  }
}

export function removeCookie(name, options = {}) {
  try {
    setCookie(name, '', -1, options);
    logger.debug(`Cookie removed: ${name}`);
  } catch (error) {
    logger.error(`Failed to remove cookie ${name}:`, error);
  }
}
