<<<<<<< HEAD
# Cookie Consent Plugin

A modular, GDPR-compliant cookie consent management system built with vanilla JavaScript and Tailwind CSS 4. Supports consent tracking, banner rendering, Google Consent Mode, Microsoft Clarity, and bulk consent.

## Features
- Modular architecture with ES6 modules
- Responsive cookie banner styled with Tailwind CSS
- Consent management for categories and services
=======
# CookieShield - Comprehensive Cookie Consent System

CookieShield is a modular, GDPR-compliant cookie consent management solution that includes a client and two backend implementations.

## Components

### 1. Frontend (cookie-consent)
- Modular architecture with ES6 modules
- Responsive cookie banner styled with Tailwind CSS
- Support for category and service-based consent
>>>>>>> 22e1fbe7c2ab0a380870f6aaf12c194c2f88b136
- Integrations with Google Consent Mode, Microsoft Clarity, and bulk consent
- Multi-language support
- Event dispatching for consent changes

<<<<<<< HEAD
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
=======
### 2. Node.js Backend (cookie-consent-server)
- Express.js server with MongoDB integration
- API endpoints for configuration and consent management
- Fallback mechanisms for missing API connections

### 3. Laravel Backend (cookie-consent-server-laravel)
- Complete migration system for database structure
- Models for Config and Consent
- REST API endpoints with validation
- Seed data for initial configuration
- Admin interface for management

## Getting Started

### Starting the Frontend
```bash
cd cookie-consent
npm install
npm start
```

### Starting the Laravel Backend
```bash
cd cookie-consent-server-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

## Features

- **GDPR Compliance**: Complete control over cookie categories
- **Modular Architecture**: Extensible components for various use cases
- **Multi-language Support**: Built-in translations for different languages
- **Responsive Design**: Optimized for mobile and desktop views
- **Integrations**: Google Consent Mode, Microsoft Clarity, and more
- **Backend Options**: Flexibility through choice between Node.js or Laravel 
>>>>>>> 22e1fbe7c2ab0a380870f6aaf12c194c2f88b136
