# 💻 Panduan Development

Panduan setup environment development lokal untuk STIKOM Tunas Bangsa.

---

## Prasyarat

### Tanpa Docker

| Software | Versi | Download |
|----------|-------|----------|
| **PHP** | 8.2+ | [php.net](https://php.net) |
| **Composer** | 2.x | [getcomposer.org](https://getcomposer.org) |
| **Node.js** | 20+ (LTS) | [nodejs.org](https://nodejs.org) |
| **MySQL** | 8.0+ | [mysql.com](https://mysql.com) |
| **Git** | 2.x | [git-scm.com](https://git-scm.com) |

**PHP Extensions yang diperlukan:**
- `pdo_mysql`, `mbstring`, `bcmath`, `gd`, `zip`, `intl`, `xml`, `curl`

### Dengan Docker

| Software | Versi | Download |
|----------|-------|----------|
| **Docker Desktop** | Latest | [docker.com](https://docker.com) |
| **Git** | 2.x | [git-scm.com](https://git-scm.com) |

---

## Setup Tanpa Docker (Rekomendasi untuk Development)

### 1. Clone Repository

```bash
git clone <REPO_URL>
cd stikomtb
```

### 2. Setup Backend (Laravel)

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 3. Setup Database

Buat database MySQL:

```sql
CREATE DATABASE `stikomtb-main` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Update `backend/.env` dengan credentials database lokal:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=stikomtb-main
DB_USERNAME=root
DB_PASSWORD=
```

Jalankan migration dan seeder:

```bash
php artisan migrate --seed
```

> **Catatan**: Seeder akan membuat akun admin default:
> - Email: `admin@stikomtb.ac.id`
> - Password: `password`
> - ⚠️ **Ganti password ini di production!**

### 4. Setup Frontend (React)

```bash
cd frontend

# Install Node dependencies
npm install
```

### 5. Jalankan Development Server

Buka **2 terminal** terpisah:

**Terminal 1 — Backend:**
```bash
cd backend
php artisan serve
# → http://localhost:8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# → http://localhost:5173
```

Buka `http://localhost:5173` di browser. Frontend akan otomatis proxy `/api` ke backend (`localhost:8000`) via Vite dev server.

### Alternatif: Jalankan Semua Sekaligus

Laravel sudah punya script `dev` yang menjalankan semua bersamaan:

```bash
cd backend
composer run dev
# Menjalankan: php artisan serve + queue + pail + npm run dev
```

---

## Setup Dengan Docker

Untuk development yang ingin environment mirip production:

```bash
# Copy environment
cp .env.production.example .env.production

# Edit untuk development
nano .env.production
# Set: APP_DEBUG=true, APP_ENV=local, dll
```

```bash
# Build & start
docker compose up -d

# Jalankan migration
docker compose exec app php artisan migrate --seed

# Lihat log
docker compose logs -f
```

Akses di `http://localhost` (port 80).

> **Catatan**: Saat menggunakan Docker untuk development, perubahan kode memerlukan rebuild:
> ```bash
> docker compose build app frontend
> docker compose up -d
> ```

---

## Perintah Berguna

### Backend (Laravel)

```bash
cd backend

# Jalankan migration
php artisan migrate

# Rollback migration terakhir
php artisan migrate:rollback

# Reset database + seed
php artisan migrate:fresh --seed

# Buat controller baru
php artisan make:controller Api/NamaController

# Buat model + migration
php artisan make:model NamaModel -m

# Buat seeder
php artisan make:seeder NamaSeeder

# Jalankan seeder
php artisan db:seed

# Laravel REPL (Tinker)
php artisan tinker

# Lihat semua routes
php artisan route:list

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Frontend (React)

```bash
cd frontend

# Development server (hot reload)
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## Struktur Kode

### Backend — Key Directories

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── Admin/           # Admin-only controllers
│   │   │       │   ├── AuthController.php
│   │   │       │   ├── DashboardController.php
│   │   │       │   ├── PostController.php
│   │   │       │   └── ...
│   │   │       ├── PostController.php    # Public API
│   │   │       ├── ProgramController.php
│   │   │       └── ...
│   │   └── Middleware/
│   └── Models/
│       ├── Admin.php
│       ├── Post.php
│       ├── Program.php
│       ├── Lecturer.php
│       ├── SiteWidget.php
│       └── StudentProgram.php
├── database/
│   ├── migrations/      # Schema definitions
│   ├── seeders/         # Seed data
│   └── factories/       # Test data factories
├── routes/
│   └── api.php          # Semua API endpoints
└── config/
    ├── cors.php         # CORS (baca FRONTEND_URL)
    └── sanctum.php      # Token auth config
```

### Frontend — Key Directories

```
frontend/src/
├── components/          # Reusable UI components
│   ├── ui/             # Base components (buttons, inputs, etc.)
│   └── sections/       # Page sections (hero, features, etc.)
├── pages/
│   ├── home.tsx
│   ├── profil/          # 7+ sub-pages
│   ├── programs/
│   ├── informations/
│   ├── students/
│   ├── academics/
│   ├── admissions.tsx
│   ├── contact.tsx
│   └── admin-panel/     # CMS admin
│       ├── login/
│       ├── dashboard/
│       ├── post/
│       ├── program/
│       ├── lecturer/
│       ├── widget/
│       ├── student-program/
│       └── admin/
├── layouts/
│   ├── public-layout.tsx    # Header + Footer
│   └── dashboard-layout.tsx # Admin sidebar
├── hooks/               # Custom hooks (useAuth, useApi, etc.)
├── lib/                 # Utilities, API client, helpers
├── routes/
│   └── router.tsx       # React Router configuration
├── assets/              # Images, static assets
├── index.css            # Global styles + Tailwind
└── main.tsx             # React entry point
```

---

## Konvensi Kode

### Backend

- **Controller naming**: `PascalCase`, suffix `Controller` (e.g. `PostController`)
- **Model naming**: `PascalCase`, singular (e.g. `Post`, `Program`)
- **Route prefix**: Semua API di bawah `/api`, admin di bawah `/api/admin`
- **Response format**: Selalu JSON, gunakan Laravel resources jika perlu
- **Validation**: Form Request classes

### Frontend

- **Component files**: `kebab-case.tsx` (e.g. `hero-section.tsx`)
- **Page files**: `page.tsx` di dalam folder route (e.g. `admin-panel/login/page.tsx`)
- **Hooks**: prefix `use` (e.g. `useAuth.ts`)
- **Path alias**: `@/` → `src/` (via Vite config)
- **State management**: React Query untuk server state, React state untuk UI state
- **Styling**: Tailwind CSS v4 utility classes
- **Animations**: Framer Motion

---

## Variabel Environment Penting

### Backend (`backend/.env`)

| Variabel | Default | Keterangan |
|----------|---------|------------|
| `APP_DEBUG` | `true` | Set `false` di production |
| `DB_HOST` | `127.0.0.1` | `mysql` jika pakai Docker |
| `FRONTEND_URL` | `http://localhost:5173` | Untuk CORS config |
| `SANCTUM_TOKEN_EXPIRATION` | `720` | Token expiry (menit) |

### Frontend (build-time via Vite)

| Variabel | Default | Keterangan |
|----------|---------|------------|
| `VITE_APP_NAME` | dari `APP_NAME` | Nama app di title |
| `VITE_API_BASE_URL` | `/api` | Base URL untuk API calls |

---

## Testing

### Backend

```bash
cd backend

# Jalankan semua test
php artisan test

# Atau dengan PHPUnit langsung
./vendor/bin/phpunit

# Test spesifik
php artisan test --filter=PostTest
```

### Frontend

```bash
cd frontend

# Lint check
npm run lint
```
