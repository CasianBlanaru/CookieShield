<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ConfigController;
use App\Http\Controllers\Api\ConsentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Cookie Consent API Routen
Route::prefix('prod')->group(function () {
    // Konfiguration abrufen
    Route::get('/config.json', [ConfigController::class, 'getConfig']);

    // Konfiguration speichern
    Route::post('/config', [ConfigController::class, 'storeConfig']);

    // Consent Routen
    Route::prefix('consent')->group(function () {
        // Consent speichern
        Route::post('/', [ConsentController::class, 'storeConsent']);

        // Consent für einen Besucher abrufen
        Route::get('/{visitorId}', [ConsentController::class, 'getConsentByVisitor']);

        // Consents eines Besuchers löschen
        Route::delete('/{visitorId}', [ConsentController::class, 'deleteVisitorConsents']);
    });
});

// Admin-Routen (optional mit Authentifizierung absichern)
Route::prefix('admin')->group(function () {
    // Config-Verwaltung
    Route::get('/configs', [ConfigController::class, 'index']);
    Route::get('/configs/{id}', [ConfigController::class, 'show']);
    Route::put('/configs/{id}', [ConfigController::class, 'update']);
    Route::delete('/configs/{id}', [ConfigController::class, 'destroy']);

    // Consent-Verwaltung
    Route::get('/consents', [ConsentController::class, 'index']);
    Route::get('/consents/{id}', [ConsentController::class, 'show']);
    Route::get('/consents/api-key/{apiKey}', [ConsentController::class, 'getConsentsByApiKey']);
});
