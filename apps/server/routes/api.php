<?php
// routes/api.php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ArticleController; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// --- PUBLIC ROUTES ---
Route::post('/login', [AuthController::class, 'login']);
Route::get('/articles', [ArticleController::class, 'index']); 


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin-only Article Management Routes
    // We use Route::apiResource for standard CRUD operations.
    // This automatically creates GET, POST, PUT, DELETE endpoints for /admin/articles
    Route::apiResource('/admin/articles', ArticleController::class)->except(['index']);
    
    // We need a separate route for the admin to view all articles (published and drafts)
    Route::get('/admin/articles', [ArticleController::class, 'indexAdmin']);
});