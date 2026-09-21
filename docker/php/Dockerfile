# ============================================================
# PHP-FPM Production Image — STIKOM Tunas Bangsa Backend
# ============================================================
# Multi-stage build:
#   Stage 1 (composer): install PHP dependencies
#   Stage 2 (production): lean runtime image with OPcache
# ============================================================

# ── Stage 1: Composer dependency install ─────────────────────
FROM composer:2 AS composer

WORKDIR /build

COPY backend/composer.json backend/composer.lock ./

RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist \
    --no-interaction

COPY backend/ .

RUN composer dump-autoload --optimize --no-dev


# ── Stage 2: Production runtime ─────────────────────────────
FROM php:8.2-fpm-alpine AS production

# Install system dependencies & PHP extensions
# CATATAN: `libwebp-dev` WAJIB ada di sini -- tanpanya, GD dikompilasi tanpa
# dukungan WebP dan imagewebp() akan selalu gagal (return false + PHP warning,
# bukan error yang jelas) di dalam container ini. Sebelumnya hilang dari daftar,
# menyebabkan SEMUA upload gambar lewat admin panel menghasilkan file rusak/tidak
# ada saat dijalankan lewat Docker (lihat MediaController.php untuk fallback-nya).
RUN apk add --no-cache \
        freetype-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        libwebp-dev \
        libzip-dev \
        icu-dev \
        oniguruma-dev \
        mysql-client \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        bcmath \
        gd \
        zip \
        intl \
        opcache \
        pcntl

# Copy custom PHP production config
COPY docker/php/php-production.ini /usr/local/etc/php/conf.d/99-production.ini

# Create app user (non-root)
RUN addgroup -g 1000 -S appgroup \
    && adduser -u 1000 -S appuser -G appgroup

WORKDIR /var/www/backend

# Copy application code from composer stage
COPY --from=composer /build /var/www/backend

# Create required Laravel directories
RUN mkdir -p \
        storage/app/public \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/testing \
        storage/framework/views \
        storage/logs \
        bootstrap/cache

# Set ownership & permissions
RUN chown -R appuser:appgroup /var/www/backend \
    && chmod -R 775 storage bootstrap/cache

USER appuser

EXPOSE 9000

CMD ["php-fpm"]
