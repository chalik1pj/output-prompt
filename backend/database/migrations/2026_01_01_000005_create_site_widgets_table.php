<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_widgets', function (Blueprint $table) {
            $table->id();
            $table->enum('widget_type', ['testimonial', 'partner', 'gallery_image', 'campus_stat']);
            $table->string('title', 200)->nullable();
            $table->string('subtitle', 200)->nullable();
            $table->text('quote')->nullable();
            $table->integer('value')->nullable();
            $table->string('image_url', 500)->nullable();
            $table->string('link_url', 500)->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamp('created_at')->useCurrent();

            $table->index(['widget_type', 'is_active', 'display_order'], 'idx_widgets_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_widgets');
    }
};
