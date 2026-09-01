# 🏗️ Arsitektur Sistem

## Overview

Aplikasi STIKOM Tunas Bangsa menggunakan arsitektur **SPA + REST API** yang dicontainerisasi dengan Docker.

- **Frontend**: Single Page Application (React) — di-build menjadi file statis, disajikan langsung oleh Nginx
- **Backend**: REST API (Laravel) — berjalan di PHP-FPM, diproxy oleh Nginx
- **Database**: MySQL 8.0 — container terpisah dengan persistent volume

---

## Diagram Arsitektur

```mermaid
graph TB
    subgraph Internet
        USER["🌐 Browser / Client"]
    end

    subgraph Server["Ubuntu Server (Docker)"]
        subgraph NGINX["Nginx Container"]
            N_STATIC["Static Files<br/>(Frontend SPA)"]
            N_PROXY["Reverse Proxy<br/>(/api → PHP-FPM)"]
            N_SSL["SSL Termination<br/>(Let's Encrypt)"]
        end

        subgraph APP["PHP-FPM Container"]
            LARAVEL["Laravel 11<br/>REST API"]
            SANCTUM["Sanctum<br/>(Token Auth)"]
            QUEUE["Queue Worker"]
        end

        subgraph DB["MySQL Container"]
            MYSQL[("MySQL 8.0<br/>stikomtb-main")]
        end

        subgraph CERT["Certbot Container"]
            CERTBOT["Let's Encrypt<br/>Auto-Renew"]
        end

        subgraph VOL["Docker Volumes"]
            V1["mysql-data"]
            V2["backend-storage"]
            V3["frontend-dist"]
            V4["certbot-conf"]
        end
    end

    USER -->|":443 HTTPS"| N_SSL
    N_SSL --> N_STATIC
    N_SSL --> N_PROXY
    N_PROXY -->|"FastCGI :9000"| LARAVEL
    LARAVEL --> SANCTUM
    LARAVEL -->|"PDO MySQL"| MYSQL
    LARAVEL --> QUEUE
    CERTBOT -.->|"SSL Certs"| N_SSL
    MYSQL --- V1
    LARAVEL --- V2
    N_STATIC --- V3
    CERTBOT --- V4

    classDef nginx fill:#2d9cdb,stroke:#1a7ab5,color:#fff
    classDef php fill:#8b5cf6,stroke:#6d28d9,color:#fff
    classDef db fill:#f59e0b,stroke:#d97706,color:#fff
    classDef cert fill:#10b981,stroke:#059669,color:#fff
    classDef vol fill:#64748b,stroke:#475569,color:#fff
    classDef user fill:#ec4899,stroke:#be185d,color:#fff

    class N_STATIC,N_PROXY,N_SSL nginx
    class LARAVEL,SANCTUM,QUEUE php
    class MYSQL db
    class CERTBOT cert
    class V1,V2,V3,V4 vol
    class USER user
```

---

## Alur Request

### 1. Request Halaman Frontend (SPA)

```
Browser → Nginx (:443)
       → Cek SSL certificate (Let's Encrypt)
       → Serve static files dari /var/www/frontend/
       → index.html (React SPA bootstrap)
       → Browser download JS/CSS bundles
       → React Router menangani navigasi client-side
```

### 2. Request API (`/api/*`)

```
Browser → Nginx (:443)
       → SSL termination
       → Match location /api
       → FastCGI proxy ke PHP-FPM (app:9000)
       → Laravel routing (routes/api.php)
       → Controller → Model → MySQL
       → JSON response kembali ke browser
```

### 3. Request Admin Panel (`/admin-panel/*`)

```
Browser → Nginx (:443)
       → Serve SPA (index.html) ← sama seperti frontend
       → React Router → /admin-panel/login
       → User login → POST /api/admin/login
       → Sanctum token (Bearer) disimpan di memory
       → Semua API call admin menyertakan token di header
```

---

## Komponen Docker

| Service    | Image               | Port                  | Fungsi                        |
| ---------- | ------------------- | --------------------- | ----------------------------- |
| `nginx`    | `nginx:1.27-alpine` | 80, 443               | Reverse proxy, SSL, serve SPA |
| `app`      | Custom PHP 8.2 FPM  | 9000 (internal)       | Laravel API backend           |
| `mysql`    | `mysql:8.0`         | 3306 (localhost only) | Database                      |
| `frontend` | Custom Node 20      | —                     | Build SPA (one-shot, exit)    |
| `certbot`  | `certbot/certbot`   | —                     | Kelola SSL certificate        |

### Docker Volumes

| Volume            | Mount Point                | Fungsi                                    |
| ----------------- | -------------------------- | ----------------------------------------- |
| `mysql-data`      | `/var/lib/mysql`           | Persistent database storage               |
| `backend-storage` | `/var/www/backend/storage` | Upload files, logs Laravel                |
| `frontend-dist`   | `/var/www/frontend`        | Built SPA files (shared Nginx ↔ Frontend) |
| `certbot-conf`    | `/etc/letsencrypt`         | SSL certificates                          |
| `certbot-www`     | `/var/www/certbot`         | ACME challenge files                      |

### Docker Network

Semua container terhubung via bridge network `stikomtb-net`. Hanya Nginx yang exposed ke host (port 80/443). MySQL hanya bisa diakses dari container lain dalam network yang sama, dan port 3306 hanya di-bind ke `127.0.0.1` (tidak bisa diakses dari luar server).

---

## Security Layers

```mermaid
graph LR
    A["UFW Firewall<br/>(OS level)"] --> B["Nginx<br/>(SSL + Headers)"]
    B --> C["Laravel Middleware<br/>(CORS, Rate Limit)"]
    C --> D["Sanctum<br/>(Token Auth)"]
    D --> E["Authorization<br/>(Admin Roles)"]

    classDef secure fill:#10b981,stroke:#059669,color:#fff
    class A,B,C,D,E secure
```

1. **UFW Firewall** — Hanya port 22 (SSH), 80 (HTTP), 443 (HTTPS) yang terbuka
2. **Nginx** — SSL termination, security headers (HSTS, X-Frame-Options, dll)
3. **Laravel Middleware** — CORS (hanya domain sendiri), rate limiting (5 login/menit)
4. **Sanctum Token Auth** — Bearer token untuk admin API, expiry 12 jam
5. **Role-based Authorization** — `super_admin` untuk manage admins & hapus program

---

## Performance Optimizations

| Layer        | Optimization                                                               |
| ------------ | -------------------------------------------------------------------------- |
| **PHP**      | OPcache enabled, `validate_timestamps=0`, autoloader optimized             |
| **Laravel**  | Config/route/view caching di production                                    |
| **Nginx**    | Gzip compression, static asset caching (1 year), HTTP/2                    |
| **Frontend** | Code splitting (lazy routes), tree shaking (Vite), immutable asset hashing |
| **Database** | Indexed columns, connection pooling via PHP-FPM                            |
