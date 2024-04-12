<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations -> php artisan migrate
     *
     * feedbacks table -> columns
     * text, √
     * fingerprint, √
     * id: uuidv4(), √
     * apiKey, -> user apiKey (foreign) √
     * type: String(type).toUpperCase(), √
     * device, √
     * page, √
     * createdAt: new Date().getTime() √
     *
     */
    public function up(): void
    {
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id();
            $table->string('text');
            $table->string('fingerprint');
            $table->string('api_key');
            $table->enum('type', ['ISSUE', 'IDEA', 'OTHER']);
            $table->string('device');
            $table->string('page');
            $table->timestamps();
            //add foreign api_key
            $table->foreign('api_key')->references('api_token')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedbacks');
    }
};
