<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Frontend route

Route::get('/{path}', function () {
    return view('layouts.frontend');
})->where('path', '^(?!admin).*$');

// Route::get('/{path?}', function () {
//     return view('layouts.frontend');
// })->where('path', '.*');


//Backend
Route::get('/admin/{path?}', function () {
    return view('layouts.backend');
})->where('path', '.*');

