# CookieShield - Umfassendes Cookie-Consent-System

CookieShield ist eine modulare, GDPR-konforme Cookie-Consent-Management-Lösung, die einen Client und zwei Backend-Implementierungen umfasst.

## Komponenten

### 1. Frontend (cookie-consent)
- Modulare Architektur mit ES6-Modulen
- Responsive Cookie-Banner mit Tailwind CSS
- Unterstützung für Kategorie- und Service-basierte Zustimmung
- Integrationen mit Google Consent Mode, Microsoft Clarity und Bulk-Consent
- Mehrsprachenunterstützung
- Event-Dispatching für Zustimmungsänderungen

### 2. Node.js-Backend (cookie-consent-server)
- Express.js-Server mit MongoDB-Integration
- API-Endpunkte für Konfiguration und Consent-Verwaltung
- Fallback-Mechanismen für fehlende API-Verbindungen

### 3. Laravel-Backend (cookie-consent-server-laravel)
- Vollständiges Migrations-System für die Datenbankstruktur
- Modelle für Config und Consent
- REST-API-Endpunkte mit Validierung
- Seed-Daten für die erste Konfiguration
- Admin-Schnittstelle für die Verwaltung

## Erste Schritte

### Frontend starten
```bash
cd cookie-consent
npm install
npm start
```

### Laravel-Backend starten
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

- **GDPR-Konformität**: Vollständige Kontrolle über Cookie-Kategorien
- **Modulare Architektur**: Erweiterbare Komponenten für verschiedene Anwendungsfälle
- **Mehrsprachenunterstützung**: Integrierte Übersetzungen für verschiedene Sprachen
- **Responsives Design**: Optimiert für mobile und Desktop-Ansichten
- **Integrationen**: Google Consent Mode, Microsoft Clarity und mehr
- **Backend-Optionen**: Flexibilität durch Wahl zwischen Node.js oder Laravel 