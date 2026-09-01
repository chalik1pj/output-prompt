# 📚 Dokumentasi — STIKOM Tunas Bangsa

Website resmi **STIKOM Tunas Bangsa** (Pematangsiantar) — dibangun dengan React + Laravel.

**URL Produksi**: [https://stikomtunasbangsa.ac.id](https://stikomtunasbangsa.ac.id)

---

## Daftar Dokumen

| Dokumen                               | Deskripsi                                             |
| ------------------------------------- | ----------------------------------------------------- |
| [Arsitektur Sistem](arsitektur.md)    | Stack teknologi, diagram arsitektur, alur request     |
| [Panduan Deployment](deployment.md)   | Setup server Ubuntu, Docker, SSL, dan cara deploy     |
| [Panduan Development](development.md) | Setup development lokal, tanpa Docker & dengan Docker |
| [API Reference](api-reference.md)     | Semua endpoint REST API backend (publik & admin)      |
| [Database](database.md)               | Skema database, ERD, penjelasan tabel & relasi        |

---

## Quick Start

### Development Lokal (tanpa Docker)

```bash
# Backend
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve

# Frontend (terminal terpisah)
cd frontend
npm install
npm run dev
```

### Development dengan Docker

```bash
cp .env.production.example .env.production
# Edit .env.production sesuai kebutuhan
docker compose up -d
docker compose exec app php artisan migrate --seed
```

### Deploy ke Produksi

```bash
# Setup server baru (sekali)
sudo bash scripts/setup-server.sh

# Deploy / update
bash scripts/deploy.sh
```

---

## Tech Stack

| Layer         | Teknologi                                                  |
| ------------- | ---------------------------------------------------------- |
| **Frontend**  | React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion |
| **Backend**   | Laravel 11, PHP 8.2, Sanctum (API auth)                    |
| **Database**  | MySQL 8.0                                                  |
| **Server**    | Nginx (reverse proxy + static files)                       |
| **Container** | Docker, Docker Compose                                     |
| **SSL**       | Let's Encrypt (Certbot)                                    |

---

## Struktur Proyek

```
stikomtb/
├── backend/            # Laravel 11 API
│   ├── app/
│   │   ├── Http/       # Controllers, Middleware
│   │   ├── Models/     # Eloquent Models
│   │   └── Providers/
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── factories/
│   ├── routes/
│   │   └── api.php     # API routes
│   └── .env.example
│
├── frontend/           # React SPA
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route pages
│   │   ├── layouts/    # Public & Dashboard layouts
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utilities, API client
│   │   ├── routes/     # React Router config
│   │   └── assets/     # Images, fonts
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── docker/             # Docker configuration
│   ├── nginx/
│   │   ├── default.conf
│   │   └── default-http-only.conf
│   ├── php/
│   │   ├── Dockerfile
│   │   └── php-production.ini
│   └── node/
│       └── Dockerfile
│
├── scripts/            # Deployment scripts
│   ├── setup-server.sh
│   └── deploy.sh
│
├── docs/               # 📍 Anda di sini
│   ├── README.md
│   ├── arsitektur.md
│   ├── deployment.md
│   ├── development.md
│   ├── api-reference.md
│   └── database.md
│
├── docker-compose.yml
├── .env.production.example
└── .dockerignore
```

---

## Kontak & Kontributor

- **STIKOM Tunas Bangsa** — Pematangsiantar, Sumatera Utara
- Website: [stikomtunasbangsa.ac.id](https://stikomtunasbangsa.ac.id)
- Email: admissions@stikomtb.ac.id
