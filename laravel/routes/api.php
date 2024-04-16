<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('user');

    Route::post('/user/generate', [\App\Http\Controllers\UserTokenController::class, 'generate'])
        ->name('user.generate');

    Route::get('/feedbacks', [\App\Http\Controllers\FeedbackController::class, 'getAll'])
        ->name('feedbacks.getAll');

});

Route::get('/feedbacks/summary', [\App\Http\Controllers\FeedbackController::class, 'getSummary'])
    ->name('feedbacks.getSummary');
