<?php
declare(strict_types=1);

$config = require 'C:/xampp/htdocs/gr8/api/project-visitors/config.php';
$demo = [];
foreach (['from_email' => 'projects@example.com', 'smtp_host' => 'smtp.example.com',
    'smtp_user' => 'your-smtp-username', 'smtp_password' => 'your-smtp-password'] as $key => $value) {
    if (trim($config[$key]) === $value) $demo[] = $key;
}
echo json_encode([
    'provider' => $config['provider'],
    'smtp_host' => $config['smtp_host'],
    'smtp_port' => $config['smtp_port'],
    'smtp_encryption' => $config['smtp_encryption'],
    'sender_configured' => $config['from_email'] !== '',
    'sender_valid' => filter_var($config['from_email'], FILTER_VALIDATE_EMAIL) !== false,
    'username_configured' => $config['smtp_user'] !== '',
    'username_is_email' => filter_var($config['smtp_user'], FILTER_VALIDATE_EMAIL) !== false,
    'username_matches_sender_local_part' => $config['smtp_user'] === strstr($config['from_email'], '@', true),
    'username_matches_sender' => $config['smtp_user'] === $config['from_email'],
    'host_matches_sender' => $config['smtp_host'] === $config['from_email'],
    'password_configured' => $config['smtp_password'] !== '',
    'resend_key_configured' => $config['resend_api_key'] !== '',
    'remaining_demo_fields' => $demo,
    'phpmailer_available' => class_exists(PHPMailer\PHPMailer\PHPMailer::class),
    'openssl_available' => extension_loaded('openssl'),
    'curl_available' => extension_loaded('curl'),
    'php_version' => PHP_VERSION,
    'php_error_log' => ini_get('error_log'),
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), PHP_EOL;
