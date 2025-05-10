import { NextResponse } from 'next/server';

// Backend-URL
const BACKEND_URL = 'https://cookieshield-backend-main-zdejjv.laravel.cloud/api';

// OPTIONS-Methode für CORS-Preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// POST-Handler für Registrierung
export async function POST(request) {
  try {
    // Request-Body extrahieren
    const body = await request.json();
    console.log('Register request body:', body);
    
    // Anfrage an das Backend weiterleiten
    const response = await fetch(`${BACKEND_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    // Response vom Backend verarbeiten
    const data = await response.json();
    console.log('Register response:', data);
    
    // Response mit dem passenden Status zurückgeben
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json(
      { message: 'Registrierung fehlgeschlagen', error: error.message },
      { status: 500 }
    );
  }
} 