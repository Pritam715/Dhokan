<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Frontend
 

//Header Categories
Route::get('get-categories','Api\FrontendController@getNavCategories');
//Home Categories wit Products
Route::get('get-categories-products','Api\FrontendController@categorieswithproducts');
//Get Product Details
Route::get('products-info/{slug}','Api\FrontendController@productinfo');
Route::get('get-price/{id}','Api\FrontendController@getpricewithsku');

//SIgnUp
Route::post('/signup','Api\CustomerUserController@signup');
Route::post('/verify-account','Api\CustomerUserController@verify');

//SignIn
Route::post('/signin','Api\CustomerUserController@signin');
Route::post('/resend-otp','Api\CustomerUserController@resend');

// Email
// Route::post('/send_email','Api\EmailController@send_email');

//Payment

// Route::get('payment', 'Api\PayPalController@payment');
// Route::get('cancel', 'Api\PayPalController@cancel');
// Route::get('payment/success', 'Api\PayPalController@success');

//Shop
Route::get('get-all-products','Api\FrontendController@getAllProducts');
Route::get('get/{id}/category-products','Api\FrontendController@getCategoryProducts');
Route::get('get/{id}/subcategory-products','Api\FrontendController@getSubCategoryProducts');
Route::get('get/{id}/subsubcategory-products','Api\FrontendController@getSubSubCategoryProducts');
Route::get('{search}/products','Api\FrontendController@getSearchProducts');










//Backend

Route::post('admin/login', 'Api\UserController@login');

Route::group(['middleware' =>'api','auth:api'], function () {
    
    //Category
    Route::get('admin/category/index','Api\CategoryController@index');
    Route::post('admin/category/store','Api\CategoryController@store');
    Route::get('admin/category/{id}/edit','Api\CategoryController@edit');
    Route::post('admin/category/{id}/update','Api\CategoryController@update');
    Route::get('admin/category/{id}/delete','Api\CategoryController@delete');
    Route::post('admin/update/category/popularity/{id}','Api\CategoryController@updatePopularity');
    Route::post('admin/update/category/status/{id}','Api\CategoryController@updateStatus');
 
    //Sub Category
    Route::get('admin/subcategory/categorylist','Api\SubCategoryController@getCategory');
    Route::get('admin/subcategory/index','Api\SubCategoryController@index');
    Route::post('admin/subcategory/store','Api\SubCategoryController@store');
    Route::get('admin/subcategory/{id}/edit','Api\SubCategoryController@edit');
    Route::post('admin/subcategory/{id}/update','Api\SubCategoryController@update');
    Route::get('admin/subcategory/{id}/delete','Api\SubCategoryController@delete');
    Route::post('admin/update/subcategory/status/{id}','Api\SubCategoryController@updateStatus');
     
    //Sub SubCategory
    Route::get('admin/sub_subcategory/index','Api\SubSubCategoryController@index');
    Route::get('admin/subsubcategory/categorylist','Api\SubSubCategoryController@getCategory');
    Route::get('admin/subcategory/index/{id}','Api\SubSubCategoryController@getSubcategory');
    Route::post('admin/sub_subcategory/store','Api\SubSubCategoryController@store');
    Route::get('admin/sub_subcategory/{id}/edit','Api\SubSubCategoryController@edit');
    Route::post('admin/sub_subcategory/{id}/update','Api\SubSubCategoryController@update');
    Route::get('admin/sub_subcategory/{id}/delete','Api\SubSubCategoryController@delete');
    Route::post('admin/update/sub_subcategory/status/{id}','Api\SubSubCategoryController@updateStatus');
         

    //Product
    Route::get('admin/product/categorylist','Api\ProductController@getCategory');
    Route::get('admin/sub_subcategory/index/{id}','Api\ProductController@getSubSubCategory');
    Route::get('admin/product/index','Api\ProductController@index');
    Route::get('admin/product_details/{id}','Api\ProductController@productdetails');
    Route::post('admin/product/store','Api\ProductController@store');
    Route::post('admin/product/update/{id}','Api\ProductController@update');
    Route::post('admin/update/product/status/{id}','Api\ProductController@updateStatus');
    Route::get('admin/product/{id}/delete','Api\ProductController@delete');
   
    //Product Attributes
    Route::post('admin/product-attributes/store','Api\ProductAttributesController@store');
    Route::get('admin/get-product-attributes/{id}','Api\ProductAttributesController@index');
    Route::post('admin/product-attributes/{id}/update','Api\ProductAttributesController@update');
    Route::get('admin/product-attributes/{id}/delete','Api\ProductAttributesController@delete');

    //Product Discount
    Route::get('admin/deals/get-discount','Api\ProductDiscountController@getDeals');
    Route::get('admin/product-discount/{id}','Api\ProductDiscountController@index');
    Route::post('admin/product-discount/store','Api\ProductDiscountController@store');

    // deals
    Route::get('admin/deals/index','Api\DealController@index');
    Route::post('admin/deals/store','Api\DealController@store');
    Route::post('admin/update/deals/status/{id}','Api\DealController@updateStatus');
    Route::get('admin/deals/{id}/edit','Api\DealController@edit');
    Route::post('admin/deals/{id}/update','Api\DealController@update');
    Route::get('admin/deals/{id}/delete','Api\DealController@delete');

});
