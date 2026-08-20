<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

abstract class BaseController
{
    protected function jsonResponse(Response $response, array $data, int $status = 200): Response
    {
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json; charset=utf-8')
            ->withStatus($status);
    }
    
    protected function errorResponse(Response $response, string $message, int $status = 400): Response
    {
        return $this->jsonResponse($response, [
            'success' => false,
            'error' => $message,
        ], $status);
    }
    
    protected function successResponse(Response $response, array $data, int $status = 200): Response
    {
        return $this->jsonResponse($response, [
            'success' => true,
            'data' => $data,
        ], $status);
    }
    
    protected function getQueryParam(Request $request, string $name, $default = null)
    {
        $params = $request->getQueryParams();
        return $params[$name] ?? $default;
    }
    
    protected function getRouteParam(Request $request, string $name): ?string
    {
        $routeParams = $request->getAttribute('route')->getArgument($name);
        return $routeParams;
    }
    
    protected function getParsedBody(Request $request): array
    {
        $body = $request->getParsedBody();
        return is_array($body) ? $body : [];
    }
}
