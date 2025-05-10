// API-Konfiguration für das Frontend
// Integriert aus frontend-integration/api.js

// Basis-URL des Backends - Direkt auf die Laravel-API verweisen statt auf einen Proxy
// Keine doppelten /api-Pfade mehr
const API_BASE_URL = 'https://cookieshield-backend-main-zdejjv.laravel.cloud/api';

// Funktion zum Abrufen des CSRF-Tokens (falls benötigt)
async function getCsrfToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/csrf-token`, {
      method: 'GET',
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    return null;
  }
}

// Funktion zum Registrieren eines Benutzers
export async function register(name, email, password, passwordConfirmation) {
  try {
    const userData = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    };
    
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });
    
    if (!response.ok) {
      // Versuchen, Fehlermeldung aus der Antwort zu lesen
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP Error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

// Funktion zum Einloggen eines Benutzers
export async function login(email, password) {
  try {
    const credentials = { email, password };
    
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    
    if (!response.ok) {
      // Versuchen, Fehlermeldung aus der Antwort zu lesen
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP Error ${response.status}`);
    }
    
    const data = await response.json();
    
    // Token im localStorage speichern
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data.token;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
}

// Funktion zum Abrufen der Cookie-Einstellungen
export async function fetchSettings(token) {
  try {
    const authToken = token || localStorage.getItem('token');
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/cookie-settings`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    throw error;
  }
}

// Funktion zum Aktualisieren der Cookie-Einstellungen
export async function saveSettings(settings, token) {
  try {
    const authToken = token || localStorage.getItem('token');
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/cookie-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(settings),
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to save settings:', error);
    throw error;
  }
}

// Funktion zum Ausloggen eines Benutzers
export function logout() {
  localStorage.removeItem('token');
  // Weitere Aufräumaufgaben hier hinzufügen
}

// Für Kompatibilität mit bestehender Code-Basis
export { 
  getCsrfToken
};