import { Logger } from '../utils/logger.js';
import { createElement, appendChild, addEventListener } from '../utils/dom.js';

const logger = new Logger({ debugMode: false, silentMode: true });

export function renderBanner(consentManager, config) {
  const { translations } = config;
  const lang = consentManager.settings.forcedLang || navigator.language.split('-')[0];
  const t = translations[lang] || translations.en || {};

  // Create banner container
  const banner = createElement('div', {
    id: 'cf-banner',
    className: 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 z-50 shadow-lg'
  });

  // Banner content
  const content = createElement('div', { className: 'max-w-7xl mx-auto' });
  const message = createElement('p', {
    className: 'text-gray-700 mb-4 text-base md:text-lg'
  }, t.banner_message || 'We use cookies to enhance your experience. By continuing, you agree to our use of cookies.');
  const buttons = createElement('div', { className: 'flex flex-wrap gap-4' });

  // Accept All button
  const acceptAllBtn = createElement('button', {
    className: 'bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
  }, t.accept_all || 'Accept All');
  addEventListener(acceptAllBtn, 'click', async () => {
    await consentManager.acceptAll();
    banner.remove();
    logger.info('Banner closed: Accept All');
  });

  // Deny All button
  const denyAllBtn = createElement('button', {
    className: 'bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
  }, t.deny_all || 'Deny All');
  addEventListener(denyAllBtn, 'click', async () => {
    await consentManager.denyAll();
    banner.remove();
    logger.info('Banner closed: Deny All');
  });

  // Settings button
  const settingsBtn = createElement('button', {
    className: 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
  }, t.settings || 'Cookie Settings');
  addEventListener(settingsBtn, 'click', () => {
    renderSettingsModal(consentManager, config, banner);
    logger.info('Opened settings modal');
  });

  // Append elements
  appendChild(buttons, acceptAllBtn);
  appendChild(buttons, denyAllBtn);
  appendChild(buttons, settingsBtn);
  appendChild(content, message);
  appendChild(content, buttons);
  appendChild(banner, content);
  appendChild(document.body, banner);

  logger.info('Banner rendered');
}

function renderSettingsModal(consentManager, config, banner) {
  const { translations, scripts, categories, isGranularPolicy } = config;
  const lang = consentManager.settings.forcedLang || navigator.language.split('-')[0];
  const t = translations[lang] || translations.en || {};

  // Create modal
  const modal = createElement('div', {
    id: 'cf-settings-modal',
    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]'
  });

  const modalContent = createElement('div', {
    className: 'bg-white p-6 rounded-lg max-w-lg w-full mx-4'
  });

  const title = createElement('h2', {
    className: 'text-xl font-semibold text-gray-900 mb-4'
  }, t.settings_title || 'Cookie Settings');
  const form = createElement('form', { className: 'space-y-4' });

  // Consent categories or scripts
  const items = isGranularPolicy ? scripts : categories;
  for (const item of items) {
    const key = isGranularPolicy ? item.consent_key : item;
    const labelText = isGranularPolicy ? item.name : t[`category_${key}`] || key;

    const checkboxWrapper = createElement('div', { className: 'flex items-center' });
    const checkbox = createElement('input', {
      type: 'checkbox',
      id: `cf-${key}`,
      className: 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
      checked: consentManager.userConsent[key] || false,
      disabled: key === 'necessary'
    });
    const label = createElement('label', {
      htmlFor: `cf-${key}`,
      className: 'ml-2 text-gray-700'
    }, labelText);

    appendChild(checkboxWrapper, checkbox);
    appendChild(checkboxWrapper, label);
    appendChild(form, checkboxWrapper);
  }

  // Save button
  const saveBtn = createElement('button', {
    type: 'submit',
    className: 'w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
  }, t.save || 'Save Settings');
  addEventListener(form, 'submit', async (e) => {
    e.preventDefault();
    const newConsent = {};
    for (const item of items) {
      const key = isGranularPolicy ? item.consent_key : item;
      newConsent[key] = document.getElementById(`cf-${key}`).checked;
    }
    await consentManager.handleConsent(newConsent);
    modal.remove();
    banner.remove();
    logger.info('Settings saved and modal closed');
  });

  // Append elements
  appendChild(modalContent, title);
  appendChild(modalContent, form);
  appendChild(form, saveBtn);
  appendChild(modal, modalContent);
  appendChild(document.body, modal);
}
