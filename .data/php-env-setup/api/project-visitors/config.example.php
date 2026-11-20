<?php
// Configure email settings in C:/xampp/htdocs/gr8/.env.
require_once __DIR__ . '/_env.php';

return [
    'provider' => project_env('PROJECT_EMAIL_PROVIDER', 'smtp'),
    'from_email' => project_env('PROJECT_VERIFICATION_FROM_EMAIL'),
    'from_name' => project_env('PROJECT_VERIFICATION_FROM_NAME', 'GR8 Nepal'),
    'smtp_host' => project_env('SMTP_HOST'),
    'smtp_port' => (int)project_env('SMTP_PORT', '587'),
    'smtp_user' => project_env('SMTP_USER'),
    'smtp_password' => project_env('SMTP_PASSWORD'),
    'smtp_encryption' => project_env('SMTP_ENCRYPTION', 'tls'),
    'resend_api_key' => project_env('RESEND_API_KEY'),
    'allowed_origins' => array_values(array_filter(array_map('trim', explode(',',
        project_env('PROJECT_ALLOWED_ORIGINS', 'https://gr8.com.np,https://www.gr8.com.np'))))),
    'cookie_secure' => filter_var(project_env('PROJECT_COOKIE_SECURE', 'false'), FILTER_VALIDATE_BOOLEAN),
];
