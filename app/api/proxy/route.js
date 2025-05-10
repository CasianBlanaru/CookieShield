import { NextResponse } from 'next/server';

// Basis-URL deines Laravel-Backends
const API_BASE_URL = 'https://cookieshield-backend-main-zdejjv.laravel.cloud';

// Hilfsfunktion zum Weiterleiten von Anfragen
async function proxyRequest(request, path) {
  try {
    // URL zusammenbauen
    const url = `${API_BASE_URL}${path}`;
    
    // Anfrage-Methode und Header extrahieren
    const method = request.method;
    const requestHeaders = new Headers(request.headers);
    
    // Kopiere relevante Header, aber entferne host, da dieser zum Backend gehört
    const headers = {};
    requestHeaders.forEach((value, key) => {
      // Diese Header werden vom Browser oder Next.js gesetzt und sollten nicht weitergeleitet werden
      if (!['host', 'connection', 'content-length'].includes(key.toLowerCase())) {
        headers[key] = value;
      }
    });
    
    // Anfragekonfiguration
    const requestOptions = {
      method,
      headers,
      redirect: 'follow',
    };
    
    // Bei POST/PUT/PATCH-Anfragen den Body hinzufügen
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const contentType = requestHeaders.get('content-type');
      if (contentType?.includes('application/json')) {
        // JSON-Body
        const body = await request.json();
        requestOptions.body = JSON.stringify(body);
      } else {
        // Form oder anderer Body
        const body = await request.text();
        requestOptions.body = body;
      }
    }
    
    // Anfrage an das Backend senden
    const response = await fetch(url, requestOptions);
    
    // Antwort-Daten und Header extrahieren
    const data = await response.text(); // Verwende text() statt json(), um Fehler bei Nicht-JSON-Antworten zu vermeiden
    const responseHeaders = new Headers(response.headers);
    
    // Antwortkonfiguration erstellen
    const responseOptions = {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Content-Type': responseHeaders.get('content-type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    };
    
    // Antwort zurückgeben
    return new NextResponse(data, responseOptions);
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse(JSON.stringify({ 
      error: 'Interner Server-Fehler',
      message: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

// GET-Anfragen-Handler
export async function GET(request) {
  const url = new URL(request.url);
  // Extrahiere den Teil nach /api/proxy
  const pathParts = url.pathname.split('/api/proxy');
  // Wenn es Teile nach /api/proxy gibt, verwende sie, sonst leeren String
  const path = pathParts.length > 1 ? pathParts[1] : '';
  // Füge Suchparameter hinzu
  const fullPath = path + url.search;
  return proxyRequest(request, fullPath);
}

// POST-Anfragen-Handler
export async function POST(request) {
  const url = new URL(request.url);
  // Extrahiere den Teil nach /api/proxy
  const pathParts = url.pathname.split('/api/proxy');
  // Wenn es Teile nach /api/proxy gibt, verwende sie, sonst leeren String
  const path = pathParts.length > 1 ? pathParts[1] : '';
  // Füge Suchparameter hinzu
  const fullPath = path + url.search;
  return proxyRequest(request, fullPath);
}

// PUT-Anfragen-Handler
export async function PUT(request) {
  const url = new URL(request.url);
  // Extrahiere den Teil nach /api/proxy
  const pathParts = url.pathname.split('/api/proxy');
  // Wenn es Teile nach /api/proxy gibt, verwende sie, sonst leeren String
  const path = pathParts.length > 1 ? pathParts[1] : '';
  // Füge Suchparameter hinzu
  const fullPath = path + url.search;
  return proxyRequest(request, fullPath);
}

// DELETE-Anfragen-Handler
export async function DELETE(request) {
  const url = new URL(request.url);
  // Extrahiere den Teil nach /api/proxy
  const pathParts = url.pathname.split('/api/proxy');
  // Wenn es Teile nach /api/proxy gibt, verwende sie, sonst leeren String
  const path = pathParts.length > 1 ? pathParts[1] : '';
  // Füge Suchparameter hinzu
  const fullPath = path + url.search;
  return proxyRequest(request, fullPath);
}

// OPTIONS-Anfragen-Handler (für CORS-Preflight-Anfragen)
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