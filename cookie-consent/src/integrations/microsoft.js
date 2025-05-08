import { Logger } from '../utils/logger.js';

const logger = new Logger({ debugMode: false, silentMode: true });

export function initializeMicrosoftConsent(consentManager, config) {
  function updateClarityConsent(consent) {
    if (window.clarity) {
      window.clarity('consent', consent.performance);
      logger.info('Microsoft Clarity consent updated:', consent.performance);
    }
  }

  // Initial consent
  updateClarityConsent(consentManager.userConsent);

  // Listen for consent changes
  window.addEventListener('cf_consent', (e) => {
    updateClarityConsent(e.detail);
  });

  logger.info('Microsoft Clarity consent initialized');
}
