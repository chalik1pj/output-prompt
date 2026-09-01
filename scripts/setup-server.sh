#!/usr/bin/env bash
# ============================================================
# Setup Server Ubuntu — STIKOM Tunas Bangsa
# ============================================================
# Script ini dijalankan SEKALI di server Ubuntu baru.
# Menginstall Docker, Docker Compose, dan dependensi lainnya.
#
# Usage (sebagai root atau sudo):
#   bash scripts/setup-server.sh
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

# ── Cek root ─────────────────────────────────────────────────
if [ "$EUID" -ne 0 ]; then
    error "Script ini harus dijalankan sebagai root. Gunakan: sudo bash $0"
fi

echo ""
echo "=============================================="
echo "  STIKOM Tunas Bangsa — Server Setup"
echo "=============================================="
echo ""

# ── 1. Update sistem ────────────────────────────────────────
info "Mengupdate sistem..."
apt-get update -qq
apt-get upgrade -y -qq
log "Sistem berhasil diupdate"

# ── 2. Install dependensi dasar ──────────────────────────────
info "Menginstall dependensi dasar..."
apt-get install -y -qq \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    ufw \
    htop \
    unzip \
    software-properties-common
log "Dependensi dasar terinstall"

# ── 3. Install Docker ───────────────────────────────────────
if command -v docker &> /dev/null; then
    warn "Docker sudah terinstall: $(docker --version)"
else
    info "Menginstall Docker..."

    # Tambah Docker GPG key
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
        | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    # Tambah repository Docker
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
        https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" \
        | tee /etc/apt/sources.list.d/docker.list > /dev/null

    apt-get update -qq
    apt-get install -y -qq \
        docker-ce \
        docker-ce-cli \
        containerd.io \
        docker-buildx-plugin \
        docker-compose-plugin

    log "Docker terinstall: $(docker --version)"
fi

# ── 4. Verifikasi Docker Compose ─────────────────────────────
if docker compose version &> /dev/null; then
    log "Docker Compose tersedia: $(docker compose version --short)"
else
    error "Docker Compose plugin tidak terinstall. Coba install ulang Docker."
fi

# ── 5. Konfigurasi Firewall (UFW) ───────────────────────────
info "Mengkonfigurasi firewall..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp     # HTTP
ufw allow 443/tcp    # HTTPS
ufw reload
log "Firewall dikonfigurasi (SSH, HTTP, HTTPS)"

# ── 6. Buat user deploy (opsional) ──────────────────────────
DEPLOY_USER="deploy"
if id "$DEPLOY_USER" &> /dev/null; then
    warn "User '$DEPLOY_USER' sudah ada"
else
    info "Membuat user '$DEPLOY_USER'..."
    adduser --disabled-password --gecos "" $DEPLOY_USER
    usermod -aG docker $DEPLOY_USER
    log "User '$DEPLOY_USER' dibuat dan ditambahkan ke grup docker"
    info "Jangan lupa setup SSH key untuk user ini!"
fi

# ── 7. Setup direktori proyek ────────────────────────────────
PROJECT_DIR="/var/www/stikomtb"
if [ -d "$PROJECT_DIR" ]; then
    warn "Direktori $PROJECT_DIR sudah ada"
else
    info "Membuat direktori proyek..."
    mkdir -p $PROJECT_DIR
    chown $DEPLOY_USER:$DEPLOY_USER $PROJECT_DIR
    log "Direktori $PROJECT_DIR dibuat"
fi

# ── 8. Setup Docker log rotation ────────────────────────────
info "Mengkonfigurasi Docker log rotation..."
cat > /etc/docker/daemon.json << 'EOF'
{
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "10m",
        "max-file": "3"
    }
}
EOF
systemctl restart docker
log "Docker log rotation dikonfigurasi"

# ── 9. Aktifkan Docker auto-start ────────────────────────────
systemctl enable docker
log "Docker diset untuk auto-start saat boot"

# ── Selesai ──────────────────────────────────────────────────
echo ""
echo "=============================================="
echo "  Setup selesai!"
echo "=============================================="
echo ""
info "Langkah selanjutnya:"
echo "  1. Clone repository ke $PROJECT_DIR:"
echo "     su - $DEPLOY_USER"
echo "     cd $PROJECT_DIR"
echo "     git clone <REPO_URL> ."
echo ""
echo "  2. Copy dan isi environment production:"
echo "     cp .env.production.example .env.production"
echo "     nano .env.production"
echo ""
echo "  3. Jalankan deployment:"
echo "     bash scripts/deploy.sh"
echo ""
echo "  Lihat docs/deployment.md untuk panduan lengkap."
echo ""
