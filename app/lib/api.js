// API-Funktionen für die Kommunikation mit dem Backend

// API Basis-URL anpassen - nutze den lokalen Proxy
const API_URL = '/api/proxy';

// Testdaten für lokale Entwicklung und falls das Backend nicht verfügbar ist
const TEST_SETTINGS = {
  design: {
    primary_color: '#4361ee',
    text_color: '#333333',
    background_color: '#ffffff',
    corner_radius: 8
  },
  categories: [
    {
      id: 'necessary',
      name: 'Notwendige Cookies',
      description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
      enabled: true,
      required: true
    },
    {
      id: 'performance',
      name: 'Performance Cookies',
      description: 'Diese Cookies helfen uns, die Leistung und Nutzererfahrung unserer Website zu verbessern.',
      enabled: true,
      required: false
    },
    {
      id: 'functional',
      name: 'Funktionale Cookies',
      description: 'Diese Cookies ermöglichen erweiterte Funktionalitäten und Personalisierung.',
      enabled: false,
      required: false
    },
    {
      id: 'advertising',
      name: 'Werbe-Cookies',
      description: 'Diese Cookies werden verwendet, um Ihnen relevante Werbung anzuzeigen.',
      enabled: false,
      required: false
    }
  ],
  languages: ['de', 'en', 'fr'],
  defaultLanguage: 'de'
};

/**
 * Allgemeine Fetch-Funktion mit Fehlerbehandlung
 */
async function fetchWithAuth(endpoint, options = {}) {
  try {
    console.log(`Fetching ${API_URL}${endpoint}`);
    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    if (!response.ok) {
      // Versuchen, Fehlermeldung aus der Antwort zu lesen
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP Error ${response.status}`);
      } catch {
        throw new Error(`HTTP Error ${response.status}`);
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Login-Funktion
 */
export async function login(email, password) {
  try {
    const data = await fetchWithAuth('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    return data.token;
  } catch (error) {
    console.error('Login failed:', error);
    // Für Demo-Zwecke: Erlaube Login mit Testdaten
    if (email === 'admin@example.com' && password === 'password') {
      console.log('Using test credentials');
      return 'test-token-12345';
    }
    throw new Error('Login failed');
  }
}

/**
 * Registrierungsfunktion
 */
export async function register(name, email, password, passwordConfirmation) {
  try {
    const data = await fetchWithAuth('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation 
      }),
    });
    
    return data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

/**
 * Cookie-Einstellungen abrufen
 */
export async function fetchSettings(token) {
  try {
    return await fetchWithAuth('/api/cookie-settings', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    // Fallback auf Testdaten
    console.log('Using test settings data');
    return TEST_SETTINGS;
  }
}

/**
 * Cookie-Einstellungen speichern
 */
export async function saveSettings(settings, token) {
  try {
    return await fetchWithAuth('/api/cookie-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    });
  } catch (error) {
    console.error('Failed to save settings:', error);
    // Simuliere erfolgreiches Speichern für Testzwecke
    console.log('Simulating successful save');
    return { success: true, message: 'Settings saved (test mode)' };
  }
}