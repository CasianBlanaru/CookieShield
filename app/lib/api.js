// API-Funktionen für die Kommunikation mit dem Backend

// API Basis-URL anpassen
const API_URL = 'https://cookieshield-backend-main-zdejjv.laravel.cloud/api';

/**
 * Verzögerung für Demo-Zwecke
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Allgemeine Fetch-Funktion mit Fehlerbehandlung
 */
async function fetchWithAuth(endpoint, options = {}) {
  try {
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
    // Mockup-Antwort für Entwicklung (entfernen für Produktion)
    if (email === 'admin@example.com' && password === 'password') {
      // Kleine Verzögerung für bessere UX
      await delay(800);
      return 'mock-auth-token-12345';
    }
    
    const data = await fetchWithAuth('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    return data.token;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
}

/**
 * Cookie-Einstellungen abrufen
 */
export async function fetchSettings(token) {
  try {
    // Mockup-Antwort für Entwicklung (entfernen für Produktion)
    if (token === 'mock-auth-token-12345') {
      await delay(600);
      return {
        bannerMessage: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.',
        acceptAllLabel: 'Alle akzeptieren',
        denyAllLabel: 'Alle ablehnen',
        bannerPosition: 'bottom',
        bannerBgColor: '#1a1a2e',
        bannerTextColor: '#ffffff',
        buttonBgColor: '#4361ee',
        buttonTextColor: '#ffffff',
        buttonBorderRadius: '8',
        bannerAnimation: 'fade',
        fontFamily: 'Inter, sans-serif',
      };
    }
    
    return await fetchWithAuth('/cookie-settings', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    throw error;
  }
}

/**
 * Cookie-Einstellungen speichern
 */
export async function saveSettings(settings, token) {
  try {
    // Mockup-Antwort für Entwicklung
    if (token === 'mock-auth-token-12345') {
      // Längere Verzögerung beim Speichern für bessere UX
      await delay(1500);
      console.log('Saving settings (mock):', settings);
      return { success: true };
    }
    
    return await fetchWithAuth('/cookie-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    });
  } catch (error) {
    console.error('Failed to save settings:', error);
    throw error;
  }
}