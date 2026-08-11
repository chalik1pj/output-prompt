<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lecturers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->nullable()->constrained('programs')->nullOnDelete();
            $table->string('name', 150);
            $table->string('position', 150)->nullable();
            $table->string('photo_url', 500)->nullable();
            $table->text('bio')->nullable();
            $table->string('email', 150)->nullable();
            $table->boolean('is_certified')->default(false);
            $table->timestamp('created_at')->useCurrent();

            $table->index('program_id', 'idx_lecturers_program');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lecturers');
    }
};
