# 📡 API Reference

Referensi lengkap REST API backend STIKOM Tunas Bangsa.

**Base URL**: `https://stikomtunasbangsa.ac.id/v2/api`

---

## Autentikasi

API admin menggunakan **Laravel Sanctum** dengan Personal Access Token (Bearer token).

```
Authorization: Bearer <token>
```

Token didapat dari endpoint `POST /api/admin/login` dan berlaku selama **12 jam** (konfigurasi `SANCTUM_TOKEN_EXPIRATION`).

---

## Endpoint Publik

Endpoint ini tidak memerlukan autentikasi.

### Program Studi

#### `GET /api/programs`

Daftar semua program studi.

**Response** `200`:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Sistem Informasi",
      "slug": "sistem-informasi",
      "degree": "S1",
      "accreditation": "B",
      "description": "...",
      "vision": "...",
      "mission": "...",
      "career_prospects": ["..."],
      "curriculum_highlights": ["..."],
      "head_name": "...",
      "head_photo": "...",
      "is_active": true,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

#### `GET /api/programs/{slug}`

Detail satu program studi berdasarkan slug.

**Parameter Path:**
| Param | Tipe | Contoh |
|-------|------|--------|
| `slug` | string | `sistem-informasi` |

**Response** `200`: Object program studi (sama seperti item di atas).

**Response** `404`: `{ "message": "Not found" }`

---

### Post / Artikel

#### `GET /api/posts`

Daftar semua post (berita, pengumuman, kegiatan, dll).

**Query Parameters:**
| Param | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `content_type` | string | — | Filter by type: `berita`, `pengumuman`, `kegiatan_akademik`, `prestasi_kampus`, `prestasi_dosen`, `kegiatan_mahasiswa`, `prestasi_mahasiswa` |
| `page` | int | `1` | Nomor halaman |
| `per_page` | int | `15` | Item per halaman |

**Response** `200`:
```json
{
  "data": [
    {
      "id": 1,
      "title": "...",
      "slug": "...",
      "content_type": "berita",
      "excerpt": "...",
      "content": "...",
      "featured_image": "...",
      "is_published": true,
      "published_at": "2026-01-01T00:00:00Z",
      "deadline": null,
      "credited_name": "...",
      "credited_program_text": "...",
      "credited_initials": "...",
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 3,
    "per_page": 15,
    "total": 42
  }
}
```

#### `GET /api/posts/{contentType}/{slug}`

Detail satu post berdasarkan content type dan slug.

**Parameter Path:**
| Param | Tipe | Contoh |
|-------|------|--------|
| `contentType` | string | `berita` |
| `slug` | string | `wisuda-angkatan-2026` |

---

### Dosen / Lecturer

#### `GET /api/lecturers`

Daftar semua dosen.

**Response** `200`:
```json
{
  "data": [
    {
      "id": 1,
      "name": "...",
      "nidn": "...",
      "title_prefix": "...",
      "title_suffix": "...",
      "specialization": "...",
      "photo": "...",
      "program_id": 1,
      "program": { "name": "...", "slug": "..." }
    }
  ]
}
```

#### `GET /api/lecturers/{lecturer}`

Detail satu dosen.

---

### Widget & Konten Situs

#### `GET /api/widgets`

Daftar semua site widget (statistik, testimoni, mitra, dll).

**Response** `200`:
```json
{
  "data": [
    {
      "id": 1,
      "type": "statistik",
      "title": "Mahasiswa Aktif",
      "value": "3000+",
      "content": null,
      "image": null,
      "sort_order": 1,
      "is_active": true
    }
  ]
}
```

---

### Program Mahasiswa

#### `GET /api/student-programs`

Daftar program mahasiswa (pertukaran, beasiswa, dll).

---

## Endpoint Admin

Semua endpoint di bawah ini memerlukan header `Authorization: Bearer <token>`.

### Autentikasi Admin

#### `POST /api/admin/login`

Login admin dan dapatkan token.

**Rate Limit**: 5 request per menit.

**Request Body:**
```json
{
  "email": "admin@stikomtb.ac.id",
  "password": "password"
}
```

**Response** `200`:
```json
{
  "token": "1|abc123...",
  "admin": {
    "id": 1,
    "name": "Super Admin",
    "email": "admin@stikomtb.ac.id",
    "role": "super_admin"
  }
}
```

**Response** `401`:
```json
{
  "message": "Kredensial tidak valid."
}
```

#### `POST /api/admin/logout`

Logout (revoke token aktif).

**Response** `200`: `{ "message": "Berhasil logout" }`

#### `GET /api/admin/me`

Dapatkan info admin yang sedang login.

---

### Dashboard

#### `GET /api/admin/dashboard/stats`

Statistik ringkasan dashboard.

**Response** `200`:
```json
{
  "total_posts": 29,
  "total_programs": 5,
  "total_lecturers": 10,
  "total_admins": 2
}
```

#### `GET /api/admin/dashboard/recent-posts`

Post terbaru (5 terakhir).

#### `GET /api/admin/dashboard/trend`

Data tren untuk chart di dashboard.

---

### CRUD — Posts (Admin)

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/admin/posts` | Daftar post (paginated) |
| `POST` | `/api/admin/posts` | Buat post baru |
| `GET` | `/api/admin/posts/{id}` | Detail post |
| `PUT` | `/api/admin/posts/{id}` | Update post |
| `DELETE` | `/api/admin/posts/{id}` | Hapus post |

**Create/Update Request Body:**
```json
{
  "title": "Judul Post",
  "content_type": "berita",
  "content": "<p>Isi artikel...</p>",
  "excerpt": "Ringkasan singkat...",
  "featured_image": "/storage/posts/image.jpg",
  "is_published": true,
  "published_at": "2026-01-01 10:00:00",
  "deadline": null,
  "credited_name": "John Doe",
  "credited_program_text": "Sistem Informasi",
  "credited_initials": "JD"
}
```

---

### CRUD — Programs (Admin)

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/admin/programs` | Daftar program |
| `POST` | `/api/admin/programs` | Buat program baru |
| `GET` | `/api/admin/programs/{id}` | Detail program |
| `PUT` | `/api/admin/programs/{id}` | Update program |
| `DELETE` | `/api/admin/programs/{id}` | Hapus program (**super_admin only**) |

---

### CRUD — Lecturers (Admin)

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/admin/lecturers` | Daftar dosen |
| `POST` | `/api/admin/lecturers` | Tambah dosen |
| `GET` | `/api/admin/lecturers/{id}` | Detail dosen |
| `PUT` | `/api/admin/lecturers/{id}` | Update dosen |
| `DELETE` | `/api/admin/lecturers/{id}` | Hapus dosen |

---

### CRUD — Widgets (Admin)

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/admin/widgets` | Daftar widget |
| `POST` | `/api/admin/widgets` | Buat widget |
| `GET` | `/api/admin/widgets/{id}` | Detail widget |
| `PUT` | `/api/admin/widgets/{id}` | Update widget |
| `DELETE` | `/api/admin/widgets/{id}` | Hapus widget |

---

### CRUD — Student Programs (Admin)

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/admin/student-programs` | Daftar program mahasiswa |
| `POST` | `/api/admin/student-programs` | Buat program |
| `GET` | `/api/admin/student-programs/{id}` | Detail |
| `PUT` | `/api/admin/student-programs/{id}` | Update |
| `DELETE` | `/api/admin/student-programs/{id}` | Hapus |

---

### CRUD — Admins (Super Admin Only)

Memerlukan role `super_admin`.

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/admin/admins` | Daftar admin |
| `POST` | `/api/admin/admins` | Buat akun admin baru |
| `PUT` | `/api/admin/admins/{id}` | Update admin |
| `DELETE` | `/api/admin/admins/{id}` | Hapus admin |

---

### Media Upload

#### `POST /api/admin/media/upload`

Upload file media (gambar).

**Request**: `multipart/form-data`

| Field | Tipe | Keterangan |
|-------|------|------------|
| `file` | file | Gambar (jpg, png, webp, max 10MB) |

**Response** `200`:
```json
{
  "url": "/storage/media/abc123.jpg",
  "path": "media/abc123.jpg"
}
```

---

## Error Responses

Semua error mengikuti format konsisten:

### 401 Unauthorized
```json
{
  "message": "Unauthenticated."
}
```

### 403 Forbidden
```json
{
  "message": "This action is unauthorized."
}
```

### 404 Not Found
```json
{
  "message": "No query results for model [App\\Models\\Post]."
}
```

### 422 Validation Error
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "title": ["The title field is required."],
    "content_type": ["The selected content type is invalid."]
  }
}
```

### 429 Too Many Requests
```json
{
  "message": "Too Many Attempts."
}
```

---

## Rate Limiting

| Endpoint | Limit |
|----------|-------|
| `POST /api/admin/login` | 5 per menit |
| Endpoint lainnya | Default Laravel (60 per menit) |
