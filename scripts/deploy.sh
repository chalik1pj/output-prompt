#!/usr/bin/env bash
# ============================================================
# Deploy Script — STIKOM Tunas Bangsa
# ============================================================
# Script ini dijalankan setiap kali deploy (update) aplikasi.
# Bisa dijalankan oleh user 'deploy' (tidak perlu root).
#
# Usage:
#   bash scripts/deploy.sh
#
# Opsi:
#   --skip-build    Skip Docker image rebuild (deploy cepat)
#   --fresh-db      Jalankan migrate:fresh + seed (HAPUS DATA!)
# ============================================================

set -euo pipefail

# ── Warna output ─────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()   { echo -e "${GREEN}[✓]${NC} $1"; }
warn()  { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }
info()  { echo -e "${CYAN}[i]${NC} $1"; }

# ── Parse arguments ──────────────────────────────────────────
SKIP_BUILD=false
FRESH_DB=false

for arg in "$@"; do
    case $arg in
        --skip-build) SKIP_BUILD=true ;;
        --fresh-db)   FRESH_DB=true ;;
        *) warn "Argumen tidak dikenal: $arg" ;;
    esac
done

# ── Pindah ke root proyek ────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo ""
echo "=============================================="
echo "  STIKOM Tunas Bangsa — Deployment"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "=============================================="
echo ""

# ── 1. Cek prasyarat ────────────────────────────────────────
info "Memeriksa prasyarat..."

if ! command -v docker &> /dev/null; then
    error "Docker belum terinstall. Jalankan scripts/setup-server.sh terlebih dahulu."
fi

if ! docker compose version &> /dev/null; then
    error "Docker Compose plugin belum terinstall."
fi

if [ ! -f ".env.production" ]; then
    error "File .env.production tidak ditemukan. Copy dari .env.production.example dan isi nilainya."
fi

log "Prasyarat terpenuhi"

# ── 2. Pull latest code ─────────────────────────────────────
info "Mengambil kode terbaru dari Git..."
if git rev-parse --is-inside-work-tree &> /dev/null; then
    git pull --ff-only origin main 2>/dev/null || git pull --ff-only origin master 2>/dev/null || warn "Git pull gagal atau bukan git repo"
    log "Kode terbaru berhasil diambil"
else
    warn "Bukan git repository, skip git pull"
fi

# ── 3. Build Docker images ──────────────────────────────────
if [ "$SKIP_BUILD" = true ]; then
    warn "Skip build (--skip-build)"
else
    info "Membangun Docker images..."
    docker compose build --parallel
    log "Docker images berhasil dibangun"
fi

# ── 4. Start/restart containers ──────────────────────────────
info "Memulai containers..."
docker compose up -d
log "Containers berhasil dimulai"

# Tunggu sebentar agar MySQL benar-benar siap
info "Menunggu database siap..."
sleep 5

# Cek ulang container app running
if ! docker compose ps --format json | grep -q '"stikomtb-app"'; then
    # Fallback: cek dengan cara lain
    docker compose ps app
fi

# ── 5. Laravel setup ────────────────────────────────────────
info "Menjalankan Laravel setup..."

# Generate key jika belum ada
if grep -q "APP_KEY=<GANTI_INI>" .env.production 2>/dev/null; then
    warn "APP_KEY belum diset. Generating..."
    NEW_KEY=$(docker compose exec -T app php artisan key:generate --show)
    info "APP_KEY baru: $NEW_KEY"
    info "PENTING: Update APP_KEY di .env.production dengan nilai di atas!"
fi

# Run migrations
if [ "$FRESH_DB" = true ]; then
    warn "FRESH DATABASE: Menghapus semua data dan menjalankan migration + seeder..."
    docker compose exec -T app php artisan migrate:fresh --seed --force
    log "Database fresh + seeder selesai"
else
    docker compose exec -T app php artisan migrate --force
    log "Migration selesai"
fi

# Cache config, routes, views
docker compose exec -T app php artisan config:cache
docker compose exec -T app php artisan route:cache
docker compose exec -T app php artisan view:cache
docker compose exec -T app php artisan storage:link 2>/dev/null || true
log "Laravel cache di-optimize"


# ── 7. Verifikasi ───────────────────────────────────────────
info "Memverifikasi status containers..."
echo ""
docker compose ps
echo ""

# Cek apakah semua service running
RUNNING=$(docker compose ps --format '{{.State}}' 2>/dev/null | grep -c "running" || echo "0")
EXPECTED=3  # app, nginx, mysql (frontend exits after build)

if [ "$RUNNING" -ge "$EXPECTED" ]; then
    log "Semua $EXPECTED service utama berjalan"
else
    warn "Hanya $RUNNING dari $EXPECTED service yang running. Cek logs:"
    echo "  docker compose logs app"
    echo "  docker compose logs nginx"
    echo "  docker compose logs mysql"
fi

# ── 8. Selesai ───────────────────────────────────────────────
echo ""
echo "=============================================="
echo "  Deployment selesai!"
echo "=============================================="
echo ""
info "Aplikasi bisa diakses di:"
echo "  https://stikomtunasbangsa.ac.id/v2"
echo "  (Nginx container berjalan di port 8800)"
echo ""
info "Perintah berguna:"
echo "  docker compose logs -f app       # Log backend"
echo "  docker compose logs -f nginx     # Log Nginx"
echo "  docker compose exec app php artisan tinker  # Laravel REPL"
echo "  docker compose down              # Stop semua"
echo "  docker compose up -d             # Start semua"
echo ""
