<?php

use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\Admin\LecturerController as AdminLecturerController;
use App\Http\Controllers\Api\Admin\PostController as AdminPostController;
use App\Http\Controllers\Api\Admin\ProgramController as AdminProgramController;
use App\Http\Controllers\Api\Admin\SiteWidgetController as AdminSiteWidgetController;
use App\Http\Controllers\Api\Admin\StudentProgramController as AdminStudentProgramController;
use App\Http\Controllers\Api\LecturerController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\SiteWidgetController;
use App\Http\Controllers\Api\StudentProgramController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API (dikonsumsi oleh frontend React)
|--------------------------------------------------------------------------
*/
Route::get('/programs', [ProgramController::class, 'index']);
Route::get('/programs/{slug}', [ProgramController::class, 'show']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{contentType}/{slug}', [PostController::class, 'show']);

Route::get('/lecturers', [LecturerController::class, 'index']);
Route::get('/lecturers/{lecturer}', [LecturerController::class, 'show']);

Route::get('/widgets', [SiteWidgetController::class, 'index']);
Route::get('/student-programs', [StudentProgramController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Admin API (CMS) - dilindungi Sanctum
|--------------------------------------------------------------------------
*/
Route::post('/admin/login', [AdminAuthController::class, 'login'])
    ->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('/logout', [AdminAuthController::class, 'logout']);
    Route::get('/me', [AdminAuthController::class, 'me']);

    Route::get('/dashboard/stats', [AdminDashboardController::class, 'stats']);
    Route::get('/dashboard/recent-posts', [AdminDashboardController::class, 'recentPosts']);
    Route::get('/dashboard/trend', [AdminDashboardController::class, 'trend']);

    Route::apiResource('posts', AdminPostController::class);
    Route::apiResource('programs', AdminProgramController::class)->except('destroy');
    Route::apiResource('lecturers', AdminLecturerController::class);
    Route::apiResource('widgets', AdminSiteWidgetController::class);
    Route::apiResource('student-programs', AdminStudentProgramController::class);

    Route::middleware('admin.role:super_admin')->group(function () {
        Route::apiResource('admins', AdminController::class)->except(['show']);
        Route::delete('/programs/{program}', [AdminProgramController::class, 'destroy']);
    });
});
