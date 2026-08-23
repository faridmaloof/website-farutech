<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// ============================================================
// API Pública
// ============================================================

// Blog — endpoints públicos (sin autenticación)
$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('blog/posts', 'BlogController@index');
    $router->get('blog/posts/{slug}', 'BlogController@show');
    $router->get('blog/categories', 'BlogCategoryController@index');
    $router->get('blog/categories/{slug}', 'BlogCategoryController@show');
});

// ============================================================
// API ADMIN — CRUD de blog (autenticado)
// ============================================================

$router->group(['prefix' => 'api/admin/blog', 'middleware' => 'auth'], function () use ($router) {
    $router->get('/', 'BlogController@adminIndex');
    $router->post('/', 'BlogController@store');
    $router->get('{id}', 'BlogController@showAdmin');
    $router->put('{id}', 'BlogController@update');
    $router->delete('{id}', 'BlogController@destroy');
});

// ============================================================
// API ADMIN — Autenticación + panel (dashboard y leads CRM)
// ============================================================

$router->post('api/admin/login', 'AuthController@login');

// Registro público + confirmación (controlados por admin_settings)
$router->get('api/settings/public', 'SettingsController@publicPolicy');
$router->post('api/register', 'RegisterController@register');
$router->get('api/register/confirm', 'RegisterController@confirm');

$router->group(['prefix' => 'api/admin', 'middleware' => 'auth'], function () use ($router) {
    $router->get('dashboard/stats', 'DashboardController@stats');

    $router->group(['prefix' => 'leads'], function () use ($router) {
        $router->get('/', 'LeadController@index');
        $router->get('{lead}', 'LeadController@show');
    });

    // Configuración global del panel
    $router->get('settings', 'SettingsController@show');
    $router->put('settings', 'SettingsController@update');

    // Gestión de usuarios (creación condicionada por registration_enabled)
    $router->get('users', 'UserController@index');
    $router->post('users', 'UserController@store');
    $router->patch('users/{user}/status', 'UserController@toggleStatus');
});
