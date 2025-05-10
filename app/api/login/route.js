import { NextResponse } from 'next/server';

// Backend-URL
const BACKEND_URL = 'https://cookieshield-backend-main-zdejjv.laravel.cloud/api';

// POST-Handler für Login
export async function POST(request) {
  try {
    // Request-Body extrahieren
    const body = await request.json();
    console.log('Login request body:', body);
    
    // Anfrage an das Backend weiterleiten
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    // Response vom Backend verarbeiten
    const data = await response.json();
    console.log('Login response:', data);
    
    // Response mit dem passenden Status zurückgeben
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { message: 'Login fehlgeschlagen', error: error.message },
      { status: 500 }
    );
  }
} 