<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    use HasFactory;

    /**
     * Die Attribute, die zuweisbar sind.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'api_key',
        'version',
        'consent_type',
        'consent_lifetime',
        'is_granular_policy',
        'google_consent_mode_enabled',
        'microsoft_consent_mode_enabled',
        'bulk_consent',
        'categories',
        'scripts',
        'translations',
    ];

    /**
     * Die Attribute, die gecastet werden sollen.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'consent_lifetime' => 'integer',
        'is_granular_policy' => 'boolean',
        'google_consent_mode_enabled' => 'boolean',
        'microsoft_consent_mode_enabled' => 'boolean',
        'bulk_consent' => 'json',
        'categories' => 'json',
        'scripts' => 'json',
        'translations' => 'json',
    ];

    /**
     * Beziehung zu Consents
     */
    public function consents()
    {
        return $this->hasMany(Consent::class, 'api_key', 'api_key');
    }
}
