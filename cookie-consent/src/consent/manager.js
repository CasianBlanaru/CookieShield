import { setCookie, getCookie, removeCookie } from './storage.js';
import { Logger } from '../utils/logger.js';
import { CATEGORIES, CONSENT_TYPES } from './constants.js';

export class ConsentManager {
  constructor(config, settings) {
    this.config = config;
    this.settings = settings;
    this.logger = new Logger({
      debugMode: settings.debugMode,
      silentMode: settings.silentMode,
    });
    this.userConsent = {};
    this.consentTimestamp = 0;
    this.visitorId = null;
    this.hasConsented = false;
  }

  async loadPreviousConsent() {
    try {
      const cookie = getCookie('cookiefirst-consent');
      if (cookie && cookie !== 'WITHDRAW') {
        const { consent, timestamp } = JSON.parse(decodeURIComponent(cookie));
        this.userConsent = consent;
        this.consentTimestamp = timestamp;
        this.hasConsented = true;
        this.logger.info('Loaded previous consent:', consent);
      } else {
        this.logger.info('No previous consent found');
      }
    } catch (error) {
      this.logger.error('Failed to load previous consent:', error);
    }
  }

  async handleConsent(newConsent, action = 'update') {
    try {
      if (!this.isValidConsent(newConsent)) {
        throw new Error('Invalid consent object');
      }

      this.userConsent = { ...newConsent };
      this.consentTimestamp = Math.round(Date.now() / 1000);
      this.hasConsented = true;

      const cookieValue = JSON.stringify({
        consent: this.userConsent,
        timestamp: this.consentTimestamp,
        type: this.config.consentType,
        version: this.config.version,
      });

      setCookie('cookiefirst-consent', cookieValue, this.config.consentLifetime, {
        path: '/',
        sameSite: 'Lax',
        secure: window.location.protocol === 'https:',
        domain: this.config.bulkConsent.baseDomain || undefined,
      });

      this.logger.info(`Consent updated with action: ${action}`, this.userConsent);
      return true;
    } catch (error) {
      this.logger.error('Failed to handle consent:', error);
      return false;
    }
  }

  async acceptAll() {
    const consent = this.config.isGranularPolicy
      ? this.config.scripts.reduce((acc, script) => {
          acc[script.consent_key] = true;
          return acc;
        }, {})
      : CATEGORIES.reduce((acc, category) => {
          acc[category] = true;
          return acc;
        }, {});
    return this.handleConsent(consent, CONSENT_TYPES.ACCEPT_ALL);
  }

  async denyAll() {
    const consent = this.config.isGranularPolicy ? {} : { necessary: true };
    return this.handleConsent(consent, CONSENT_TYPES.DENY);
  }

  isValidConsent(consent) {
    if (typeof consent !== 'object' || consent === null) return false;
    const validKeys = this.config.isGranularPolicy
      ? this.config.scripts.map((s) => s.consent_key)
      : CATEGORIES;
    return Object.keys(consent).every((key) => validKeys.includes(key));
  }

  getPublicApi() {
    return {
      hasConsented: () => this.hasConsented,
      consent: () => ({ ...this.userConsent }),
      consentTimestamp: () => this.consentTimestamp,
      visitorId: () => this.visitorId,
      acceptAllCategories: () => this.acceptAll(),
      denyAllCategories: () => this.denyAll(),
      updateConsent: (consent) => this.handleConsent(consent),
    };
  }
}
