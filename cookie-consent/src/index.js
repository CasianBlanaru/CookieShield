import { initSettings } from './config/settings.js';
import { ConsentManager } from './consent/manager.js';
import { setupConsentEvents } from './consent/events.js';
import { ApiClient } from './api/client.js';
import { Logger } from './utils/logger.js';
import { renderBanner } from './ui/banner.js';
import { initializeGoogleConsent } from './integrations/google.js';
import { initializeMicrosoftConsent } from './integrations/microsoft.js';
import { initializeBulkConsent } from './integrations/bulk.js';

const logger = new Logger({ debugMode: false, silentMode: true });

async function initializeCookieConsent() {
  try {
    logger.info('Initializing cookie consent system');

    // Load and parse settings
    const settings = initSettings(window.__COOKIE_BANNER_SETTINGS__ || {});
    logger.debug('Settings loaded:', settings);

    // Initialize API client
    const apiClient = new ApiClient(settings.apiKey, settings.apiEndpoints);

    // Load configuration from API if necessary
    const config = await apiClient.fetchConfig(settings.version);
    logger.debug('Configuration fetched:', config);

    // Initialize consent manager
    const consentManager = new ConsentManager(config, settings);
    await consentManager.loadPreviousConsent();

    // Setup consent event listeners
    setupConsentEvents(consentManager);

    // Initialize integrations
    if (config.googleConsentModeEnabled) {
      initializeGoogleConsent(consentManager, config);
    }
    if (config.microsoftConsentModeEnabled) {
      initializeMicrosoftConsent(consentManager, config);
    }
    if (config.bulkConsent.id) {
      initializeBulkConsent(consentManager, config.bulkConsent);
    }

    // Render banner if not in stealth mode
    if (!settings.stealthMode) {
      renderBanner(consentManager, config);
    }

    // Expose public API
    window.CookieConsent = consentManager.getPublicApi();
    logger.info('Cookie consent system initialized');
  } catch (error) {
    logger.error('Initialization failed:', error);
  }
}

// Start initialization
if (!window.__COOKIE_BANNER_INIT_TIME__) {
  window.__COOKIE_BANNER_INIT_TIME__ = Date.now();
  initializeCookieConsent();
}

export { initializeCookieConsent };
