<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Models\Location;

class LocationController extends BaseController
{
    private Location $locationModel;
    
    public function __construct()
    {
        $this->locationModel = new Location();
    }
    
    /**
     * GET /api/locations
     * Get all locations in hierarchical structure
     */
    public function index(Request $request, Response $response): Response
    {
        try {
            $locations = $this->locationModel->getAllHierarchical();
            return $this->successResponse($response, $locations);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching locations: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/locations/countries
     * Get countries list
     */
    public function countries(Request $request, Response $response): Response
    {
        try {
            $countries = $this->locationModel->getCountries();
            return $this->successResponse($response, $countries);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching countries: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/locations/states/{countryId}
     * Get states by country ID
     */
    public function statesByCountry(Request $request, Response $response, array $args): Response
    {
        try {
            $countryId = (int) $args['countryId'];
            $states = $this->locationModel->getStatesByCountry($countryId);
            return $this->successResponse($response, $states);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching states: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * GET /api/locations/cities/{stateId}
     * Get cities by state ID
     */
    public function citiesByState(Request $request, Response $response, array $args): Response
    {
        try {
            $stateId = (int) $args['stateId'];
            $cities = $this->locationModel->getCitiesByState($stateId);
            return $this->successResponse($response, $cities);
        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Error fetching cities: ' . $e->getMessage(), 500);
        }
    }
}
