<?php
declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

// Load the PHP backend's own .env file, independent of the frontend environment.
Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2))->safeLoad();

function project_env(string $name, string $default = ''): string
{
    // Environment variables configured on the PHP server take precedence.
    $serverValue = getenv($name);
    if ($serverValue !== false) {
        return $serverValue;
    }
    return (string)($_ENV[$name] ?? $_SERVER[$name] ?? $default);
}
