<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Config;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ConfigController extends Controller
{
    /**
     * Konfiguration abrufen
     */
    public function getConfig(Request $request): JsonResponse
    {
        $request->validate([
            'apiKey' => 'required|string',
            'v' => 'nullable|string',
        ]);

        $apiKey = $request->input('apiKey');
        $version = $request->input('v');

        // Finde die Konfiguration basierend auf dem API-Key
        $config = Config::where('api_key', $apiKey)->first();

        // Wenn keine Konfiguration gefunden wurde, erstelle eine neue
        if (!$config) {
            $config = new Config([
                'api_key' => $apiKey,
                'version' => $version ?? '1.0.0',
                'categories' => ['necessary', 'performance', 'functional', 'advertising'],
                'translations' => [
                    'en' => [
                        'banner_message' => 'We use cookies to enhance your experience. By continuing, you agree to our use of cookies.',
                        'accept_all' => 'Accept All',
                        'deny_all' => 'Deny All',
                        'settings' => 'Cookie Settings',
                        'settings_title' => 'Cookie Settings',
                        'save' => 'Save Settings',
                        'category_necessary' => 'Essential Cookies',
                        'category_performance' => 'Performance Cookies',
                        'category_functional' => 'Functional Cookies',
                        'category_advertising' => 'Advertising Cookies'
                    ],
                    'de' => [
                        'banner_message' => 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die weitere Nutzung stimmen Sie der Verwendung von Cookies zu.',
                        'accept_all' => 'Alle akzeptieren',
                        'deny_all' => 'Alle ablehnen',
                        'settings' => 'Cookie-Einstellungen',
                        'settings_title' => 'Cookie-Einstellungen',
                        'save' => 'Einstellungen speichern',
                        'category_necessary' => 'Notwendige Cookies',
                        'category_performance' => 'Performance-Cookies',
                        'category_functional' => 'Funktionale Cookies',
                        'category_advertising' => 'Werbe-Cookies'
                    ]
                ]
            ]);
            $config->save();
        }

        // Wenn eine Version angegeben ist, prüfe, ob die Konfiguration aktualisiert werden muss
        if ($version && $config->version !== $version) {
            $config->version = $version;
            $config->save();
        }

        // Rückgabe der Konfiguration ohne interne Felder
        return response()->json($config);
    }

    /**
     * Konfiguration speichern
     */
    public function storeConfig(Request $request): JsonResponse
    {
        $request->validate([
            'api_key' => 'required|string',
            'version' => 'nullable|string',
            'consent_type' => 'nullable|in:opt-in,opt-out',
            'consent_lifetime' => 'nullable|integer',
            'is_granular_policy' => 'nullable|boolean',
            'google_consent_mode_enabled' => 'nullable|boolean',
            'microsoft_consent_mode_enabled' => 'nullable|boolean',
            'bulk_consent' => 'nullable|array',
            'categories' => 'nullable|array',
            'scripts' => 'nullable|array',
            'translations' => 'nullable|array',
        ]);

        $apiKey = $request->input('api_key');

        // Finde die Konfiguration oder erstelle eine neue
        $config = Config::firstOrNew(['api_key' => $apiKey]);

        // Aktualisiere die Konfiguration mit den Daten aus dem Request
        $config->fill($request->all());
        $config->save();

        return response()->json([
            'message' => 'Configuration saved successfully',
            'api_key' => $apiKey
        ], 201);
    }

    /**
     * Konfigurationen auflisten (Admin-Funktion)
     */
    public function index(): JsonResponse
    {
        $configs = Config::all();
        return response()->json($configs);
    }

    /**
     * Eine bestimmte Konfiguration zeigen (Admin-Funktion)
     */
    public function show(string $id): JsonResponse
    {
        $config = Config::findOrFail($id);
        return response()->json($config);
    }

    /**
     * Eine Konfiguration aktualisieren (Admin-Funktion)
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $config = Config::findOrFail($id);
        $config->update($request->all());
        return response()->json($config);
    }

    /**
     * Eine Konfiguration löschen (Admin-Funktion)
     */
    public function destroy(string $id): JsonResponse
    {
        $config = Config::findOrFail($id);
        $config->delete();
        return response()->json(['message' => 'Configuration deleted successfully']);
    }
}
