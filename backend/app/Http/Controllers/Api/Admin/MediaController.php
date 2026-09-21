<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:1024',
        ]);

        $file = $request->file('image');
        $targetDir = base_path('../frontend/public/images');

        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0755, true);
        }

        $extension = strtolower($file->getClientOriginalExtension());
        $imagePath = $file->getRealPath();
        $base = 'img_' . time() . '_' . Str::random(5);

        // webp -> file sudah dalam format tujuan, cukup dipindah apa adanya.
        if ($extension === 'webp') {
            $filename = $base . '.webp';
            copy($imagePath, $targetDir . '/' . $filename);

            return response()->json(['url' => '/images/' . $filename]);
        }

        $image = match ($extension) {
            'jpeg', 'jpg' => @imagecreatefromjpeg($imagePath),
            'png' => $this->loadPngWithAlpha($imagePath),
            'gif' => @imagecreatefromgif($imagePath),
            default => null,
        };

        // BUG YANG DIPERBAIKI (regresi dari commit "Fix bug image" -- sempat
        // diperbaiki sebelumnya lalu balik lagi ke versi ini): imagewebp()
        // dipanggil TANPA pernah mengecek nilai kembaliannya. imagewebp() TIDAK
        // melempar error kalau GD di server dikompilasi tanpa dukungan WebP --
        // ia cuma mengeluarkan PHP warning dan return `false`, sementara kode di
        // sini tetap lanjut menganggap file berhasil dibuat dan mengembalikan URL
        // ke file yang sebenarnya TIDAK PERNAH ADA/rusak. Ini persis kondisi yang
        // sekarang terjadi di image Docker (docker/php/Dockerfile TIDAK menginstal
        // `libwebp-dev`, jadi imagewebp() di dalam container itu pasti gagal) --
        // efeknya SEMUA upload gambar lewat admin panel di deployment Docker akan
        // menghasilkan URL rusak, persis gejala "logo/gambar tidak tampil".
        $webpOk = false;
        if ($image) {
            $filename = $base . '.webp';
            $webpOk = @imagewebp($image, $targetDir . '/' . $filename, 85);
            imagedestroy($image);
        }

        if (!$webpOk) {
            // Source gagal di-decode ATAU encode WebP gagal (GD tanpa dukungan
            // WebP) -- fallback aman: salin file asli apa adanya dengan ekstensi
            // aslinya. Ini SELALU berhasil karena hanya menyalin byte, tidak
            // bergantung pada dukungan format tertentu di GD.
            $filename = $base . '.' . $extension;
            copy($imagePath, $targetDir . '/' . $filename);
        }

        return response()->json(['url' => '/images/' . $filename]);
    }

    /** PNG bisa transparan -- jaga alpha channel-nya waktu load supaya tidak jadi background hitam. */
    private function loadPngWithAlpha(string $path)
    {
        $image = @imagecreatefrompng($path);
        if ($image) {
            imagepalettetotruecolor($image);
            imagealphablending($image, true);
            imagesavealpha($image, true);
        }

        return $image;
    }
}
