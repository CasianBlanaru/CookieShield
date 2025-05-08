import { Logger } from '../utils/logger.js';

const logger = new Logger({ debugMode: false, silentMode: true });

export function setupConsentEvents(consentManager) {
  const events = {
    consent: 'cf_consent',
    consentLoaded: 'cf_consent_loaded',
    consentAction: 'cf_consent_action',
  };

  function dispatchEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
    logger.debug(`Dispatched event: ${eventName}`, detail);
  }

  consentManager.handleConsent = ((original) => {
    return async (...args) => {
      const result = await original.apply(consentManager, args);
      if (result) {
        dispatchEvent(events.consent, consentManager.userConsent);
        dispatchEvent(events.consentLoaded, consentManager.userConsent);
      }
      return result;
    };
  })(consentManager.handleConsent);
}
