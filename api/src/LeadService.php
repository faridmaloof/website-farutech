<?php
/**
 * Lead Service
 * 
 * Implements Open/Closed Principle (OCP) and Single Responsibility Principle (SRP)
 * Handles business logic, validation, and lead scoring
 */

namespace App\Src;

class LeadService
{
    private LeadRepository $repository;

    public function __construct(LeadRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Process and save a new lead with validation and scoring
     */
    public function processLead(array $data): array
    {
        // Validation
        $validation = $this->validateLeadData($data);
        
        if (!$validation['valid']) {
            return [
                'success' => false,
                'errors' => $validation['errors']
            ];
        }

        // Calculate lead score
        $leadScore = $this->calculateLeadScore($data);
        
        // Determine lead quality
        $leadQuality = $this->determineLeadQuality($leadScore);

        try {
            // Save to database
            $leadId = $this->repository->saveLead([
                ...$data,
                'lead_score' => $leadScore,
                'lead_quality' => $leadQuality
            ]);

            return [
                'success' => true,
                'lead_id' => $leadId,
                'lead_score' => $leadScore,
                'lead_quality' => $leadQuality,
                'message' => 'Lead successfully saved'
            ];
        } catch (\Exception $e) {
            error_log("Error saving lead: " . $e->getMessage());
            
            return [
                'success' => false,
                'errors' => ['database' => 'Error saving lead. Please try again.']
            ];
        }
    }

    /**
     * Process newsletter subscription
     */
    public function processSubscription(string $email, string $source = 'website'): array
    {
        // Validate email
        if (!$this->isValidEmail($email)) {
            return [
                'success' => false,
                'errors' => ['email' => 'Invalid email address']
            ];
        }

        // Check if already subscribed
        if ($this->repository->emailExistsInSubscribers($email)) {
            return [
                'success' => false,
                'errors' => ['email' => 'This email is already subscribed']
            ];
        }

        try {
            $subscriberId = $this->repository->saveSubscriber($email, $source);

            return [
                'success' => true,
                'subscriber_id' => $subscriberId,
                'message' => 'Successfully subscribed to newsletter'
            ];
        } catch (\Exception $e) {
            error_log("Error saving subscriber: " . $e->getMessage());
            
            return [
                'success' => false,
                'errors' => ['database' => 'Error subscribing. Please try again.']
            ];
        }
    }

    /**
     * Validate lead data
     */
    private function validateLeadData(array $data): array
    {
        $errors = [];

        // Required fields
        if (empty(trim($data['name'] ?? ''))) {
            $errors['name'] = 'Name is required';
        }

        if (empty(trim($data['email'] ?? ''))) {
            $errors['email'] = 'Email is required';
        } elseif (!$this->isValidEmail($data['email'])) {
            $errors['email'] = 'Invalid email format';
        }

        if (empty(trim($data['service_interest'] ?? ''))) {
            $errors['service_interest'] = 'Service interest is required';
        }

        if (empty(trim($data['message'] ?? ''))) {
            $errors['message'] = 'Message is required';
        } elseif (strlen(trim($data['message'])) < 10) {
            $errors['message'] = 'Message must be at least 10 characters';
        }

        // Optional field validations
        if (!empty($data['phone'] ?? '') && !$this->isValidPhone($data['phone'])) {
            $errors['phone'] = 'Invalid phone number format';
        }

        if (!empty($data['budget_range'] ?? '') && !in_array($data['budget_range'], $this->getValidBudgetRanges())) {
            $errors['budget_range'] = 'Invalid budget range';
        }

        if (!empty($data['project_timeline'] ?? '') && !in_array($data['project_timeline'], $this->getValidTimelines())) {
            $errors['project_timeline'] = 'Invalid project timeline';
        }

        return [
            'valid' => empty($errors),
            'errors' => $errors
        ];
    }

    /**
     * Calculate lead score based on provided information
     * Score range: 0-100
     */
    private function calculateLeadScore(array $data): int
    {
        $score = 0;

        // Base score for completing required fields (40 points)
        $score += 40;

        // Phone provided (+10 points)
        if (!empty($data['phone'])) {
            $score += 10;
        }

        // Company provided (+10 points)
        if (!empty($data['company'])) {
            $score += 10;
        }

        // Position provided (+5 points)
        if (!empty($data['position'])) {
            $score += 5;
        }

        // Budget range provided (+15 points)
        if (!empty($data['budget_range'])) {
            $score += 15;
            
            // Higher scores for larger budgets
            if (in_array($data['budget_range'], ['5000-10000', '10000+'])) {
                $score += 10;
            }
        }

        // Timeline provided (+10 points)
        if (!empty($data['project_timeline'])) {
            $score += 10;
            
            // Sooner timelines get higher scores
            if ($data['project_timeline'] === 'immediate') {
                $score += 10;
            } elseif ($data['project_timeline'] === '1-3_months') {
                $score += 5;
            }
        }

        // Message length bonus (max +10 points)
        $messageLength = strlen($data['message'] ?? '');
        if ($messageLength > 200) {
            $score += 10;
        } elseif ($messageLength > 100) {
            $score += 5;
        }

        return min($score, 100); // Cap at 100
    }

    /**
     * Determine lead quality based on score
     */
    private function determineLeadQuality(int $score): string
    {
        if ($score >= 80) {
            return 'hot';
        } elseif ($score >= 60) {
            return 'warm';
        } elseif ($score >= 40) {
            return 'cold';
        } else {
            return 'unqualified';
        }
    }

    /**
     * Validate email format
     */
    private function isValidEmail(string $email): bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Validate phone number format (flexible for international numbers)
     */
    private function isValidPhone(string $phone): bool
    {
        // Remove common separators
        $cleaned = preg_replace('/[\s\-\(\)\.]/', '', $phone);
        
        // Check if it contains only digits and optional + at the start
        return preg_match('/^\+?\d{7,15}$/', $cleaned) === 1;
    }

    /**
     * Get valid budget ranges
     */
    private function getValidBudgetRanges(): array
    {
        return [
            'less_than_1000',
            '1000-2500',
            '2500-5000',
            '5000-10000',
            '10000+'
        ];
    }

    /**
     * Get valid project timelines
     */
    private function getValidTimelines(): array
    {
        return [
            'immediate',
            '1-3_months',
            '3-6_months',
            '6+_months',
            'just_exploring'
        ];
    }
}
