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
        Schema::table('configs', function (Blueprint $table) {
            $table->string('api_key')->unique()->index()->after('id');
            $table->string('version')->default('1.0.0')->after('api_key');
            $table->enum('consent_type', ['opt-in', 'opt-out'])->default('opt-in')->after('version');
            $table->unsignedBigInteger('consent_lifetime')->default(365 * 24 * 60 * 60)->after('consent_type'); // 1 Jahr in Sekunden
            $table->boolean('is_granular_policy')->default(false)->after('consent_lifetime');
            $table->boolean('google_consent_mode_enabled')->default(false)->after('is_granular_policy');
            $table->boolean('microsoft_consent_mode_enabled')->default(false)->after('google_consent_mode_enabled');
            $table->json('bulk_consent')->nullable()->after('microsoft_consent_mode_enabled');
            $table->json('categories')->nullable()->after('bulk_consent');
            $table->json('scripts')->nullable()->after('categories');
            $table->json('translations')->nullable()->after('scripts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('configs', function (Blueprint $table) {
            $table->dropColumn([
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
                'translations'
            ]);
        });
    }
};
