<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CRUDController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/add_update_product/{id?}', [CRUDController::class, "addOrUpdateProduct"]);

route::get('/get_categories/{id?}', [CRUDController::class, "getcategories"]);
route::get('/get_products/{id?}', [CRUDController::class, "getproducts"]);
Route::get('/product_category/{id}', [CRUDController::class, "getProductbyCategory"]);
route::post('/addimage', [ImageController::class, "addimage"]);
route::get('/add_favorite/{id?}', [CRUDController::class, "getcategories"]);
route::get('/add_cart/{id?}', [CRUDController::class, "getcategories"]);

route::get('/remove/{id?}', [CRUDController::class, "removeproduct"]);

route::get('/categories/{id?}', [CRUDController::class, "get_categories"]);


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
