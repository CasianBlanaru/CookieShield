import { Logger } from '../utils/logger.js';

const logger = new Logger({ debugMode: false, silentMode: true });

export function initializeBulkConsent(consentManager, bulkConfig) {
  const { baseDomain, id } = bulkConfig;

  function sendConsentToIframe(consent) {
    const message = {
      type: 'cookiefirst_consent',
      consent,
      timestamp: consentManager.consentTimestamp,
      visitorId: consentManager.visitorId
    };
    window.top.postMessage(message, `*.${baseDomain}`);
    logger.info('Sent bulk consent to iframe:', message);
  }

  // Initial consent
  if (consentManager.hasConsented) {
    sendConsentToIframe(consentManager.userConsent);
  }

  // Listen for consent changes
  window.addEventListener('cf_consent', (e) => {
    sendConsentToIframe(e.detail);
  });

  // Listen for iframe messages
  window.addEventListener('message', (e) => {
    if (e.data.type === 'cookiefirst_bulk_consent') {
      consentManager.handleConsent(e.data.consent);
      logger.info('Received bulk consent from iframe:', e.data);
    }
  });

  logger.info('Bulk consent initialized with ID:', id);
}
