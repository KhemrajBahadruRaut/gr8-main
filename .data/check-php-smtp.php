<?php
declare(strict_types=1);

$config = require 'C:/xampp/htdocs/gr8/api/project-visitors/config.php';
$mail = new PHPMailer\PHPMailer\PHPMailer(true);
$mail->isSMTP();
$mail->Host = $config['smtp_host'];
$mail->Port = (int)$config['smtp_port'];
$mail->SMTPAuth = $config['smtp_user'] !== '';
$mail->Username = $config['smtp_user'];
$mail->Password = $config['smtp_password'];
$mail->SMTPSecure = $config['smtp_encryption'] === 'ssl'
    ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
    : PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
$mail->Timeout = 15;
$mail->SMTPDebug = 0;
$failed = false;
try {
    if (!$mail->smtpConnect()) throw new RuntimeException('SMTP connection failed.');
    echo "SMTP connection, TLS, and authentication passed. No email was sent.\n";
} catch (Throwable $error) {
    $failed = true;
    $details = $mail->getSMTPInstance()->getError();
    $message = $error->getMessage() . ' ' . json_encode($details, JSON_UNESCAPED_SLASHES);
    foreach (['smtp_password', 'smtp_user', 'from_email'] as $key) {
        if ($config[$key] !== '') $message = str_replace($config[$key], '[redacted]', $message);
    }
    echo preg_replace('/[\r\n]+/', ' ', $message), PHP_EOL;
} finally {
    $mail->smtpClose();
}
exit($failed ? 1 : 0);
