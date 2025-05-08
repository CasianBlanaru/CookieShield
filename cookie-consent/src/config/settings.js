import { Logger } from '../utils/logger.js';

const defaultSettings = {
  apiKey: '',
  stealthMode: false,
  silentMode: true,
  debugMode: false,
  dataLayer: 'dataLayer',
  forcedLang: null,
  apiEndpoints: {
    config: 'https://api.cookiefirst.com/prod',
    consent: 'https://api.cookiefirst.com/prod/consent',
    location: 'https://edge.cookiefirst.com/prod/location',
  },
};

export function initSettings(rawSettings) {
  const logger = new Logger({
    debugMode: rawSettings.debugMode || defaultSettings.debugMode,
    silentMode: rawSettings.silentMode || defaultSettings.silentMode,
  });

  const settings = { ...defaultSettings, ...rawSettings };

  // Validate and sanitize API key
  if (!settings.apiKey || typeof settings.apiKey !== 'string') {
    logger.warn('Invalid or missing API key');
    settings.apiKey = '';
  }

  // Derive directory paths
  const hostname = window.location.hostname.replace(/^www\./, '');
  settings.dir = `sites/${hostname}-${settings.apiKey}`;
  settings.wildcardDir = `sites/*.${hostname.split('.').slice(-2).join('.')}-${settings.apiKey}`;

  return Object.freeze(settings);
}
