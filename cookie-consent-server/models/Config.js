import mongoose from 'mongoose';

const ConfigSchema = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  version: {
    type: String,
    required: true,
    default: '1.0.0'
  },
  consentType: {
    type: String,
    enum: ['opt-in', 'opt-out'],
    default: 'opt-in'
  },
  consentLifetime: {
    type: Number,
    default: 365 * 24 * 60 * 60 // 1 Jahr in Sekunden
  },
  isGranularPolicy: {
    type: Boolean,
    default: false
  },
  googleConsentModeEnabled: {
    type: Boolean,
    default: false
  },
  microsoftConsentModeEnabled: {
    type: Boolean,
    default: false
  },
  bulkConsent: {
    id: String,
    baseDomain: String
  },
  categories: {
    type: [String],
    default: ['necessary', 'performance', 'functional', 'advertising']
  },
  scripts: [{
    consent_key: String,
    name: String,
    category: String,
    url: String
  }],
  translations: {
    type: Map,
    of: Map,
    default: {
      'en': {
        'banner_message': 'We use cookies to enhance your experience. By continuing, you agree to our use of cookies.',
        'accept_all': 'Accept All',
        'deny_all': 'Deny All',
        'settings': 'Cookie Settings',
        'settings_title': 'Cookie Settings',
        'save': 'Save Settings',
        'category_necessary': 'Essential Cookies',
        'category_performance': 'Performance Cookies',
        'category_functional': 'Functional Cookies',
        'category_advertising': 'Advertising Cookies'
      },
      'de': {
        'banner_message': 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die weitere Nutzung stimmen Sie der Verwendung von Cookies zu.',
        'accept_all': 'Alle akzeptieren',
        'deny_all': 'Alle ablehnen',
        'settings': 'Cookie-Einstellungen',
        'settings_title': 'Cookie-Einstellungen',
        'save': 'Einstellungen speichern',
        'category_necessary': 'Notwendige Cookies',
        'category_performance': 'Performance-Cookies',
        'category_functional': 'Funktionale Cookies',
        'category_advertising': 'Werbe-Cookies'
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Aktualisiere updatedAt vor jedem Speichern
ConfigSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Config', ConfigSchema); 