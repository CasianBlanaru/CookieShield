import { NextResponse } from 'next/server';

// Backend-URL
const BACKEND_URL = 'https://cookieshield-backend-main-zdejjv.laravel.cloud/api';

// GET-Handler für Cookie-Einstellungen
export async function GET(request) {
  try {
    // Token aus Header extrahieren
    const authHeader = request.headers.get('authorization');
    console.log('Cookie settings GET auth header:', authHeader);
    
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Nicht autorisiert' },
        { status: 401 }
      );
    }
    
    // Anfrage an das Backend weiterleiten
    const response = await fetch(`${BACKEND_URL}/cookie-settings`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
      },
    });
    
    // Response vom Backend verarbeiten
    const data = await response.json();
    console.log('Cookie settings GET response:', data);
    
    // Response mit dem passenden Status zurückgeben
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Cookie settings GET API error:', error);
    return NextResponse.json(
      { message: 'Fehler beim Abrufen der Cookie-Einstellungen', error: error.message },
      { status: 500 }
    );
  }
}

// POST-Handler für Cookie-Einstellungen
export async function POST(request) {
  try {
    // Request-Body und Token extrahieren
    const body = await request.json();
    const authHeader = request.headers.get('authorization');
    console.log('Cookie settings POST body:', body);
    console.log('Cookie settings POST auth header:', authHeader);
    
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Nicht autorisiert' },
        { status: 401 }
      );
    }
    
    // Anfrage an das Backend weiterleiten
    const response = await fetch(`${BACKEND_URL}/cookie-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify(body),
    });
    
    // Response vom Backend verarbeiten
    const data = await response.json();
    console.log('Cookie settings POST response:', data);
    
    // Response mit dem passenden Status zurückgeben
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Cookie settings POST API error:', error);
    return NextResponse.json(
      { message: 'Fehler beim Speichern der Cookie-Einstellungen', error: error.message },
      { status: 500 }
    );
  }
} 