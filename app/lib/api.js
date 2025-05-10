// API-Funktionen für die Kommunikation mit dem Backend

// Verwende die direkte Backend-URL, um die Rewrites zu umgehen und das Problem zu diagnostizieren
const API_URL = 'https://cookieshield-backend-main-zdejjv.laravel.cloud/api';

/**
 * Allgemeine Fetch-Funktion mit Fehlerbehandlung
 */
async function fetchWithAuth(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  console.log('Fetching URL:', url, 'with options:', options);
  
  try {
    const response = await fetch(url, options);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      // Versuchen, Fehlermeldung aus der Antwort zu lesen
      try {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        throw new Error(errorData.message || `HTTP Error ${response.status}`);
      } catch (parseError) {
        console.log('Error parsing error response:', parseError);
        throw new Error(`HTTP Error ${response.status}`);
      }
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    return data;
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
 * Registrierungsfunktion
 */
export async function register(name, email, password, passwordConfirmation) {
  try {
    const data = await fetchWithAuth('/register', {
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