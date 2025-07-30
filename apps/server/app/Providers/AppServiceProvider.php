<?php

namespace App\Providers;

use App\Models\User; // 1. Import the User model
use Illuminate\Support\Facades\Gate; // 2. Import the Gate facade
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // 3. This is the new code we are adding.
        // It defines a simple authorization check called 'is_admin'.
        // When called, it checks if the currently logged-in user's
        // 'is_admin' property is true.
        Gate::define('is_admin', function (User $user) {
            return $user->is_admin;
        });
    }
}