<?php
declare(strict_types=1);

$directory = $argv[1] ?? __DIR__;
$config = require $directory . '/api/project-visitors/config.php';
$checks = [
    'Email provider' => $config['provider'] === 'smtp',
    'Sender address' => $config['from_email'] === 'projects@example.com',
    'Sender name with spaces' => $config['from_name'] === 'GR8 Nepal',
    'SMTP host' => $config['smtp_host'] === 'smtp.example.com',
    'SMTP port type' => $config['smtp_port'] === 587,
    'SMTP credentials loaded' => $config['smtp_user'] !== '' && $config['smtp_password'] !== '',
    'Blank optional Resend key' => $config['resend_api_key'] === '',
    'Local frontend origin' => in_array('http://localhost:3000', $config['allowed_origins'], true),
    'Local HTTP cookie setting' => $config['cookie_secure'] === false,
];
foreach ($checks as $label => $passed) {
    if (!$passed) {
        fwrite(STDERR, "FAIL: {$label}\n");
        exit(1);
    }
}
echo "PHP .env loading checks passed (9 settings).\n";
