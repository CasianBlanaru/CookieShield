import { Logger } from '../utils/logger.js';

export class ApiClient {
  constructor(apiKey, endpoints) {
    this.apiKey = apiKey;
    this.endpoints = endpoints;
    this.logger = new Logger({ debugMode: false, silentMode: true });
  }

  async fetchConfig(version) {
    try {
      const url = `${this.endpoints.config}/config.json?v=${version}`;
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      this.logger.debug('Config fetched:', data);
      return data;
    } catch (error) {
      this.logger.error('Failed to fetch config, using fallback:', error);
      // Fallback configuration for demo purposes
      return {
        version: version || '1.0.0',
        consentType: 'opt-in',
        consentLifetime: 365 * 24 * 60 * 60, // 1 Jahr in Sekunden
        isGranularPolicy: false,
        googleConsentModeEnabled: false,
        microsoftConsentModeEnabled: false,
        bulkConsent: { id: '', baseDomain: '' },
        categories: ['necessary', 'performance', 'functional', 'advertising'],
        scripts: [],
        translations: {
          'en': {
            banner_message: 'We use cookies to enhance your experience. By continuing, you agree to our use of cookies.',
            accept_all: 'Accept All',
            deny_all: 'Deny All',
            settings: 'Cookie Settings',
            settings_title: 'Cookie Settings',
            save: 'Save Settings',
            category_necessary: 'Essential Cookies',
            category_performance: 'Performance Cookies',
            category_functional: 'Functional Cookies',
            category_advertising: 'Advertising Cookies'
          },
          'de': {
            banner_message: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die weitere Nutzung stimmen Sie der Verwendung von Cookies zu.',
            accept_all: 'Alle akzeptieren',
            deny_all: 'Alle ablehnen',
            settings: 'Cookie-Einstellungen',
            settings_title: 'Cookie-Einstellungen',
            save: 'Einstellungen speichern',
            category_necessary: 'Notwendige Cookies',
            category_performance: 'Performance-Cookies',
            category_functional: 'Funktionale Cookies',
            category_advertising: 'Werbe-Cookies'
          }
        }
      };
    }
  }

  async logConsent(preferences, action, visitorId, configVersion, country, region, policy, metadata) {
    try {
      const url = this.endpoints.consent;
      const body = {
        preferences,
        apiKey: this.apiKey,
        action,
        visitor_id: visitorId,
        config_version: configVersion,
        visitor_country: country,
        visitor_region: region,
        consent_policy: policy,
        granular_metadata: metadata,
        url: window.location.href,
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      this.logger.debug('Consent logged:', data);
      return data.visitor_id;
    } catch (error) {
      this.logger.error('Failed to log consent:', error);
      // Generate a random visitor ID for demo purposes
      return `demo-${Math.random().toString(36).substring(2, 15)}`;
    }
  }
}
