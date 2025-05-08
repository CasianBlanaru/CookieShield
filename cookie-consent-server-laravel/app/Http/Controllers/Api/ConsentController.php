<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consent;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class ConsentController extends Controller
{
    /**
     * Consent speichern
     */
    public function storeConsent(Request $request): JsonResponse
    {
        $request->validate([
            'api_key' => 'required|string',
            'preferences' => 'required|array',
            'action' => 'required|in:accept_all,deny,update,withdraw',
            'visitor_id' => 'nullable|string',
            'config_version' => 'nullable|string',
            'visitor_country' => 'nullable|string',
            'visitor_region' => 'nullable|string',
            'consent_policy' => 'nullable|string',
            'url' => 'nullable|string',
            'granular_metadata' => 'nullable|array',
        ]);

        // Generiere eine Besucher-ID, wenn keine vorhanden ist
        $visitorId = $request->input('visitor_id') ?? 'v-' . Str::uuid();

        // Erstelle einen neuen Consent-Eintrag
        $consent = new Consent([
            'api_key' => $request->input('api_key'),
            'visitor_id' => $visitorId,
            'preferences' => $request->input('preferences'),
            'action' => $request->input('action'),
            'config_version' => $request->input('config_version', '1.0.0'),
            'visitor_country' => $request->input('visitor_country'),
            'visitor_region' => $request->input('visitor_region'),
            'consent_policy' => $request->input('consent_policy'),
            'url' => $request->input('url'),
            'granular_metadata' => $request->input('granular_metadata'),
            'consent_timestamp' => now(),
        ]);

        $consent->save();

        return response()->json([
            'message' => 'Consent saved successfully',
            'visitor_id' => $visitorId
        ], 201);
    }

    /**
     * Consent für einen Besucher abrufen
     */
    public function getConsentByVisitor(string $visitorId, Request $request): JsonResponse
    {
        $request->validate([
            'apiKey' => 'required|string',
        ]);

        $apiKey = $request->input('apiKey');

        // Finde den neuesten Consent-Eintrag für den Besucher
        $consent = Consent::where('api_key', $apiKey)
            ->where('visitor_id', $visitorId)
            ->latest('consent_timestamp')
            ->first();

        if (!$consent) {
            return response()->json([
                'error' => 'No consent found for this visitor'
            ], 404);
        }

        return response()->json($consent);
    }

    /**
     * Alle Consents auflisten (Admin-Funktion)
     */
    public function index(): JsonResponse
    {
        $consents = Consent::latest('consent_timestamp')->paginate(20);
        return response()->json($consents);
    }

    /**
     * Einen bestimmten Consent zeigen (Admin-Funktion)
     */
    public function show(string $id): JsonResponse
    {
        $consent = Consent::findOrFail($id);
        return response()->json($consent);
    }

    /**
     * Consents für einen API-Key abrufen (Admin-Funktion)
     */
    public function getConsentsByApiKey(string $apiKey): JsonResponse
    {
        $consents = Consent::where('api_key', $apiKey)
            ->latest('consent_timestamp')
            ->paginate(20);

        return response()->json($consents);
    }

    /**
     * Löschen aller Consents eines Besuchers (Datenschutz-Funktion)
     */
    public function deleteVisitorConsents(string $visitorId, Request $request): JsonResponse
    {
        $request->validate([
            'apiKey' => 'required|string',
        ]);

        $apiKey = $request->input('apiKey');

        $deleted = Consent::where('api_key', $apiKey)
            ->where('visitor_id', $visitorId)
            ->delete();

        return response()->json([
            'message' => 'Visitor consents deleted successfully',
            'count' => $deleted
        ]);
    }
}
