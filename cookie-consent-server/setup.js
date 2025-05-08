import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Config from './models/Config.js';

// Lade Umgebungsvariablen
dotenv.config();

// API-Key, der erstellt werden soll
const API_KEY = 'test-api-key';

async function setup() {
  try {
    // Verbinde mit der Datenbank
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Mit MongoDB verbunden');

    // Prüfe, ob bereits eine Konfiguration mit diesem API-Key existiert
    const existingConfig = await Config.findOne({ apiKey: API_KEY });

    if (existingConfig) {
      console.log(`Konfiguration für API-Key ${API_KEY} existiert bereits`);
    } else {
      // Erstelle eine neue Konfiguration
      const config = new Config({
        apiKey: API_KEY,
        version: '1.0.0',
        consentType: 'opt-in',
        consentLifetime: 365 * 24 * 60 * 60,
        isGranularPolicy: false,
        googleConsentModeEnabled: false,
        microsoftConsentModeEnabled: false,
        bulkConsent: { id: '', baseDomain: '' },
        categories: ['necessary', 'performance', 'functional', 'advertising'],
        scripts: []
      });

      await config.save();
      console.log(`Konfiguration für API-Key ${API_KEY} wurde erstellt`);
    }

    // Disconnect von der Datenbank
    await mongoose.disconnect();
    console.log('Verbindung zur Datenbank getrennt');
  } catch (error) {
    console.error('Fehler beim Setup:', error);
  }
}

setup(); 