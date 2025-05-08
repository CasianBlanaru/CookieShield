# Cookie Consent Server

API-Server für das Cookie-Consent-System. Dieser Server bietet Endpunkte zum Abrufen von Konfigurationen und zum Speichern von Consent-Entscheidungen.

## Voraussetzungen

- Node.js 16+
- MongoDB (lokal oder in der Cloud)

## Installation

1. Repository klonen oder entpacken
2. Abhängigkeiten installieren:

```bash
npm install
```

3. `.env`-Datei nach Bedarf anpassen:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cookie-consent
NODE_ENV=development
```

## Setup

Bevor der Server gestartet wird, sollte eine Basis-Konfiguration erstellt werden:

```bash
npm run setup
```

Dies erstellt einen API-Key `test-api-key` mit einer Standardkonfiguration.

## Server starten

```bash
npm start
```

Für die Entwicklung mit automatischem Neuladen:

```bash
npm run dev
```

## API-Endpunkte

### Konfiguration

- `GET /prod/config.json?v=1.0.0&apiKey=test-api-key`: Konfiguration abrufen
- `POST /prod/config`: Konfiguration speichern oder aktualisieren

### Consent

- `POST /prod/consent`: Consent-Entscheidung speichern
- `GET /prod/consent/:visitorId?apiKey=test-api-key`: Consent-Entscheidungen für einen Besucher abrufen

## Integration mit dem Cookie-Consent-Client

Im Client (`config-example.js`) müssen die API-Endpunkte auf den lokalen Server verweisen:

```javascript
window.__COOKIE_BANNER_SETTINGS__ = {
  apiKey: 'test-api-key',
  // ...
  apiEndpoints: {
    config: 'http://localhost:5000/prod',
    consent: 'http://localhost:5000/prod/consent',
    location: 'http://localhost:5000/prod/location'
  }
};
``` 