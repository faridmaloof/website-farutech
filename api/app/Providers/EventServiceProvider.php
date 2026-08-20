<?php

namespace App\Providers;

use App\Events\BlogPostPublished;
use App\Events\BlogPostViewed;
use App\Listeners\TrackBlogStats;
use Laravel\Lumen\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        BlogPostViewed::class => [
            TrackBlogStats::class,
        ],
        BlogPostPublished::class => [
            // Futuros listeners de notificaciones se registran aquí
        ],
    ];

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
