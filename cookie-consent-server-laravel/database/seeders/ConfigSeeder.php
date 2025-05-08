<?php

namespace Database\Seeders;

use App\Models\Config;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Erstelle eine Test-Konfiguration
        Config::create([
            'api_key' => 'test-api-key',
            'version' => '1.0.0',
            'consent_type' => 'opt-in',
            'consent_lifetime' => 365 * 24 * 60 * 60, // 1 Jahr in Sekunden
            'is_granular_policy' => false,
            'google_consent_mode_enabled' => false,
            'microsoft_consent_mode_enabled' => false,
            'bulk_consent' => [
                'id' => '',
                'baseDomain' => ''
            ],
            'categories' => ['necessary', 'performance', 'functional', 'advertising'],
            'scripts' => [],
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
    }
}
