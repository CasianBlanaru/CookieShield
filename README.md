# CookieShield Dashboard

CookieShield ist eine 100% DSGVO/GDPR-konforme Cookie-Consent-Lösung mit anpassbarem Design. Dieses Frontend-Dashboard ermöglicht es, Cookie-Einstellungen anzupassen und zu verwalten.

## Features

- 🔒 **100% DSGVO/GDPR-konform**: Vollständige Einhaltung aller Datenschutzgesetze
- 🎨 **Anpassbares Design**: Passe Farben, Eckenradius und mehr an
- 🌐 **Mehrsprachig**: Unterstützung für Deutsch, Englisch und Französisch
- 📱 **Responsives Design**: Optimale Anzeige auf allen Geräten
- 🔄 **Einfache API-Integration**: Nahtlose Verbindung mit deinem Backend
- 📊 **Kategorie-Management**: Konfiguriere verschiedene Cookie-Kategorien

## Technologien

- **Next.js 15**: Modernes React-Framework für serverseitige Rendering
- **Tailwind CSS**: Utility-first CSS-Framework
- **PWA-Unterstützung**: Progressive Web App mit Offline-Funktionalität

## Schnellstart

1. Klone das Repository
2. Installiere die Abhängigkeiten

```bash
yarn install
```

3. Starte den Entwicklungsserver

```bash
yarn dev
```

4. Öffne [http://localhost:3000](http://localhost:3000) im Browser

## Konfiguration

Die Anwendung verwendet einen API-Proxy, um CORS-Probleme zu vermeiden. Die Backend-API-URL kann in `/app/api/proxy/route.js` konfiguriert werden.

## Deployment

Diese Anwendung ist für das Deployment auf Vercel optimiert:

```bash
yarn build
```

## Backend-Integration

Das Dashboard kommuniziert mit einem Laravel-Backend über die folgenden Endpunkte:

- `/api/login`: Authentifizierung
- `/api/register`: Benutzerregistrierung
- `/api/cookie-settings`: Abrufen und Speichern von Cookie-Einstellungen

## Demo-Zugangsdaten

Für Testzwecke kannst du dich mit den folgenden Zugangsdaten anmelden:

- **E-Mail**: admin@example.com
- **Passwort**: password

## Cookie-Banner-Integration

Das von dieser Anwendung konfigurierte Cookie-Banner kann über ein JavaScript-Snippet auf deiner Website eingebunden werden:

```html
<script src="https://cookieshield.vercel.app/banner.js" defer></script>
```

## Entwickelt von

Dieses Projekt wurde entwickelt von [PixelCoda](https://pixelcoda.com).

## Lizenz

MIT
