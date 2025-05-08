# CookieShield - Comprehensive Cookie Consent System

CookieShield is a modular, GDPR-compliant cookie consent management solution that includes a client and two backend implementations.

## Components

### 1. Frontend (cookie-consent)
- Modular architecture with ES6 modules
- Responsive cookie banner styled with Tailwind CSS
- Support for category and service-based consent
- Integrations with Google Consent Mode, Microsoft Clarity, and bulk consent
- Multi-language support
- Event dispatching for consent changes

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