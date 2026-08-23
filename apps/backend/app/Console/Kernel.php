<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Laravel\Lumen\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Publica posts programados cuyo scheduled_for ya llegó.
        // Requiere cron: * * * * * php artisan schedule:run
        $schedule->call(function () {
            (new \App\Jobs\PublishScheduledBlogPost())->handle();
        })->everyMinute();
    }
}
