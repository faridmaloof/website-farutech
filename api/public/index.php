<?php

use Slim\Factory\AppFactory;
use App\Middleware\CorsMiddleware;
use App\Routes\ApiRoutes;
use DI\Container;

require __DIR__ . '/../vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Create container
$container = new Container();
AppFactory::setContainer($container);

// Create app
$app = AppFactory::create();

// Add CORS middleware
$app->add(new CorsMiddleware());

// Add body parsing middleware
$app->addBodyParsingMiddleware();

// Add routing middleware
$app->addRoutingMiddleware();

// Add error middleware
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Register API routes
ApiRoutes::register($app);

// Run the application
$app->run();
