# Cookie Consent Server (Laravel)

Ein Laravel-basierter API-Server für das Cookie-Consent-System. Dieser Server bietet Endpunkte zum Abrufen von Konfigurationen und zum Speichern von Consent-Entscheidungen.

## Funktionen

- REST-API für Cookie-Consent-Konfigurationen
- Speichern und Abrufen von Consent-Entscheidungen
- Administrationsschnittstelle für die Verwaltung von Konfigurationen
- Multi-Language-Unterstützung
- JSON-basierte Konfiguration für flexible Anpassungen

## Voraussetzungen

- PHP 8.1+
- Composer
- MySQL, PostgreSQL oder SQLite

## Installation

1. Repository klonen
2. Abhängigkeiten installieren:

```bash
composer install
```

3. `.env`-Datei konfigurieren (aus `.env.example` kopieren):

```bash
cp .env.example .env
php artisan key:generate
```

4. Datenbank-Verbindung in der `.env`-Datei konfigurieren:

```
DB_CONNECTION=sqlite
DB_DATABASE=/absoluter/pfad/zur/database/database.sqlite
```

Oder für MySQL:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cookie_consent
DB_USERNAME=root
DB_PASSWORD=
```

5. Datenbank-Migrationen ausführen:

```bash
php artisan migrate
```

6. Seed-Daten einspielen:

```bash
php artisan db:seed
```

## Server starten

Entwicklungsserver starten:

```bash
php artisan serve
```

Der Server ist dann unter `http://localhost:8000` erreichbar.

## API-Endpunkte

### Konfiguration

- `GET /api/prod/config.json?apiKey=test-api-key&v=1.0.0`: Konfiguration abrufen
- `POST /api/prod/config`: Konfiguration speichern

### Consent

- `POST /api/prod/consent`: Consent-Entscheidung speichern
- `GET /api/prod/consent/{visitorId}?apiKey=test-api-key`: Consent für einen Besucher abrufen
- `DELETE /api/prod/consent/{visitorId}?apiKey=test-api-key`: Consent für einen Besucher löschen

### Admin-Bereich

- `GET /api/admin/configs`: Alle Konfigurationen auflisten
- `GET /api/admin/configs/{id}`: Eine bestimmte Konfiguration anzeigen
- `PUT /api/admin/configs/{id}`: Eine Konfiguration aktualisieren
- `DELETE /api/admin/configs/{id}`: Eine Konfiguration löschen
- `GET /api/admin/consents`: Alle Consents auflisten
- `GET /api/admin/consents/{id}`: Einen bestimmten Consent anzeigen
- `GET /api/admin/consents/api-key/{apiKey}`: Consents für einen API-Key auflisten

## Integration mit dem Cookie-Consent-Client

Im Client (`config-example.js`) die API-Endpunkte anpassen:

```javascript
window.__COOKIE_BANNER_SETTINGS__ = {
  apiKey: 'test-api-key',
  // ...
  apiEndpoints: {
    config: 'http://localhost:8000/api/prod',
    consent: 'http://localhost:8000/api/prod/consent',
    location: 'http://localhost:8000/api/prod/location'
  }
};
```

## Produktionsumgebung

Für die Produktionsumgebung empfehlen wir:

1. Einen echten Webserver (Nginx, Apache) einzurichten
2. SSL/TLS zu konfigurieren
3. Rate-Limiting und Caching einzurichten
4. Die Admin-Routen mit einer Authentifizierung zu schützen
