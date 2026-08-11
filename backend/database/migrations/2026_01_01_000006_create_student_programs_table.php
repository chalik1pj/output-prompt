<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_programs', function (Blueprint $table) {
            $table->id();
            $table->enum('program_type', ['beasiswa', 'pertukaran']);
            $table->string('name', 200);
            $table->text('description')->nullable();
            $table->text('requirements')->nullable();
            $table->text('how_to_apply')->nullable();
            $table->string('country', 100)->nullable();
            $table->string('scope', 50)->nullable();
            $table->string('icon_name', 50)->nullable();
            $table->string('logo_url', 500)->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamp('created_at')->useCurrent();

            $table->index(['program_type', 'is_active', 'display_order'], 'idx_student_programs_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_programs');
    }
};
