import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

// GET-Handler für manifest.json
export async function GET() {
  try {
    // Pfad zur manifest.json-Datei
    const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
    
    // Datei lesen
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifestData = JSON.parse(manifestContent);
    
    // Response zurückgeben
    return NextResponse.json(manifestData, {
      status: 200,
      headers: {
        'Content-Type': 'application/manifest+json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Manifest API error:', error);
    return NextResponse.json(
      { message: 'Fehler beim Laden des Manifests', error: error.message },
      { status: 500 }
    );
  }
} 