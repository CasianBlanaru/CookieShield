<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consent extends Model
{
    use HasFactory;

    /**
     * Die Attribute, die zuweisbar sind.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'api_key',
        'visitor_id',
        'preferences',
        'action',
        'config_version',
        'visitor_country',
        'visitor_region',
        'consent_policy',
        'url',
        'granular_metadata',
        'consent_timestamp',
    ];

    /**
     * Die Attribute, die gecastet werden sollen.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'preferences' => 'json',
        'granular_metadata' => 'json',
        'consent_timestamp' => 'datetime',
    ];

    /**
     * Beziehung zur Konfiguration
     */
    public function config()
    {
        return $this->belongsTo(Config::class, 'api_key', 'api_key');
    }
}
