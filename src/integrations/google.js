import { Logger } from '../utils/logger.js';

const logger = new Logger({ debugMode: false, silentMode: true });

export function initializeGoogleConsent(consentManager, config) {
  const { dataLayer } = consentManager.settings;
  const gtag = window[dataLayer] || (window[dataLayer] = []);

  function updateGoogleConsent(consent) {
    const consentMap = {
      ad_storage: consent.advertising ? 'granted' : 'denied',
      analytics_storage: consent.performance ? 'granted' : 'denied',
      functionality_storage: consent.functional ? 'granted' : 'denied',
      personalization_storage: consent.advertising ? 'granted' : 'denied',
      security_storage: 'granted'
    };

    gtag.push(['consent', 'update', consentMap]);
    logger.info('Google Consent Mode updated:', consentMap);
  }

  // Initial consent
  updateGoogleConsent(consentManager.userConsent);

  // Listen for consent changes
  window.addEventListener('cf_consent', (e) => {
    updateGoogleConsent(e.detail);
  });

  logger.info('Google Consent Mode initialized');
}
