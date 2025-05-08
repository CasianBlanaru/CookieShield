# Cookie Consent Plugin

A modular, GDPR-compliant cookie consent management system built with vanilla JavaScript and Tailwind CSS 4. Supports consent tracking, banner rendering, Google Consent Mode, Microsoft Clarity, and bulk consent.

## Features
- Modular architecture with ES6 modules
- Responsive cookie banner styled with Tailwind CSS
- Consent management for categories and services
- Integrations with Google Consent Mode, Microsoft Clarity, and bulk consent
- Multi-language support
- Event dispatching for consent changes

## Installation

1. Clone or download the repository.
2. Open `index.html` in a browser to see the cookie consent banner.
3. For development, install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm start
```

## Configuration

Configure the plugin by setting `window.__COOKIE_BANNER_SETTINGS__` before loading the script:

```javascript
window.__COOKIE_BANNER_SETTINGS__ = {
  apiKey: 'your-api-key',
  stealthMode: false,
  debugMode: true,
  forcedLang: 'en',
  apiEndpoints: {
    config: 'https://api.cookiefirst.com/prod',
    consent: 'https://api.cookiefirst.com/prod/consent',
    location: 'https://edge.cookiefirst.com/prod/location'
  }
};
```

## Usage

The plugin exposes a public API via `window.CookieConsent`:

```javascript
// Accept all cookies
window.CookieConsent.acceptAllCategories();

// Deny all cookies
window.CookieConsent.denyAllCategories();

// Get current consent
console.log(window.CookieConsent.consent());
```

## Customization

- **Styling**: Modify Tailwind classes in `src/ui/banner.js` or extend the `tailwind.config.js`.
- **Translations**: Update the `translations` object in the configuration fetched by `api/client.js`.
- **Integrations**: Add new integrations in `src/integrations/`.

## License

MIT
