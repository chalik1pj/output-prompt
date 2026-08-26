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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
        ]);

        $file = $request->file('image');
        $filename = 'img_' . time() . '_' . Str::random(5) . '.webp';
        
        // Target directory in the frontend codebase
        $targetDir = base_path('../frontend/public/images');
        
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0755, true);
        }
        
        $targetPath = $targetDir . '/' . $filename;
        
        // Convert to webp using GD
        $extension = strtolower($file->getClientOriginalExtension());
        $imagePath = $file->getRealPath();
        
        $image = null;
        switch ($extension) {
            case 'jpeg':
            case 'jpg':
                $image = @imagecreatefromjpeg($imagePath);
                break;
            case 'png':
                $image = @imagecreatefrompng($imagePath);
                if ($image) {
                    imagepalettetotruecolor($image);
                    imagealphablending($image, true);
                    imagesavealpha($image, true);
                }
                break;
            case 'gif':
                $image = @imagecreatefromgif($imagePath);
                break;
            case 'webp':
                // Just move the file if it's already webp
                copy($imagePath, $targetPath);
                return response()->json([
                    'url' => '/images/' . $filename
                ]);
        }
        
        if ($image) {
            imagewebp($image, $targetPath, 85);
            imagedestroy($image);
        } else {
            // Fallback if conversion fails
            copy($imagePath, $targetPath);
        }

        return response()->json([
            'url' => '/images/' . $filename
        ]);
    }
}
