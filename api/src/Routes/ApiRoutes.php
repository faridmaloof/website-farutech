<?php

namespace App\Routes;

use Slim\App;
use App\Controllers\HealthController;
use App\Controllers\ServiceController;
use App\Controllers\ApplicationTypeController;
use App\Controllers\ContactInfoController;
use App\Controllers\LocationController;
use App\Controllers\BlogController;
use App\Controllers\LeadController;
use App\Controllers\AuthController;
use App\Controllers\DashboardController;
use App\Middleware\AuthMiddleware;

class ApiRoutes
{
    public static function register(App $app): void
    {
        // Health check (public)
        $app->get('/api/health', HealthController::class . ':check');
        
        // Public API endpoints
        $app->group('/api', function ($api) {
            // Services
            $api->get('/services', ServiceController::class . ':index');
            $api->get('/services/featured', ServiceController::class . ':featured');
            $api->get('/services/{slug}', ServiceController::class . ':show');
            
            // Application Types
            $api->get('/application-types', ApplicationTypeController::class . ':index');
            $api->get('/application-types/{id}', ApplicationTypeController::class . ':show');
            
            // Contact Info
            $api->get('/contact-info', ContactInfoController::class . ':index');
            
            // Locations
            $api->get('/locations', LocationController::class . ':index');
            $api->get('/locations/countries', LocationController::class . ':countries');
            $api->get('/locations/states/{countryId}', LocationController::class . ':statesByCountry');
            $api->get('/locations/cities/{stateId}', LocationController::class . ':citiesByState');
            
            // Blog
            $api->get('/blog/posts', BlogController::class . ':index');
            $api->get('/blog/posts/{slug}', BlogController::class . ':show');
            $api->get('/blog/categories', BlogController::class . ':categories');
            $api->get('/blog/categories/{slug}', BlogController::class . ':categoryShow');
            $api->get('/blog/recent', BlogController::class . ':recent');
            
            // Lead submission (public form)
            $api->post('/leads', LeadController::class . ':store');
            
            // Auth (public login)
            $api->post('/auth/login', AuthController::class . ':login');
        });
        
        // Protected admin endpoints
        $app->group('/api/admin', function ($admin) {
            // Dashboard
            $admin->get('/dashboard/stats', DashboardController::class . ':stats');
            
            // Auth protected routes
            $admin->get('/auth/me', AuthController::class . ':me');
            
            // CRUD endpoints for admin (to be expanded)
            // Services CRUD
            // Application Types CRUD
            // Blog CRUD
            // Contact Info CRUD
            // Locations CRUD
            // Leads management
        })->add(new AuthMiddleware());
    }
}
