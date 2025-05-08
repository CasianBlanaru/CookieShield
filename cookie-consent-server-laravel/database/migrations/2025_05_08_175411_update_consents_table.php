<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('consents', function (Blueprint $table) {
            $table->string('api_key')->index()->after('id');
            $table->string('visitor_id')->index()->after('api_key');
            $table->json('preferences')->nullable()->after('visitor_id');
            $table->enum('action', ['accept_all', 'deny', 'update', 'withdraw'])->after('preferences');
            $table->string('config_version')->after('action');
            $table->string('visitor_country')->nullable()->after('config_version');
            $table->string('visitor_region')->nullable()->after('visitor_country');
            $table->string('consent_policy')->nullable()->after('visitor_region');
            $table->string('url')->nullable()->after('consent_policy');
            $table->json('granular_metadata')->nullable()->after('url');
            $table->timestamp('consent_timestamp')->nullable()->after('granular_metadata');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('consents', function (Blueprint $table) {
            $table->dropColumn([
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
                'consent_timestamp'
            ]);
        });
    }
};
