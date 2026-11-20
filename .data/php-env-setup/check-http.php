<?php
declare(strict_types=1);

function request(string $path): array
{
    $curl = curl_init('http://localhost/gr8/' . $path);
    curl_setopt_array($curl, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Origin: http://localhost:3000']]);
    $body = curl_exec($curl);
    $status = (int)curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);
    return [$status, $body];
}

foreach (['.env', '.env.example'] as $file) {
    [$status] = request($file);
    if ($status !== 403) {
        fwrite(STDERR, "Environment file access protection failed.\n");
        exit(1);
    }
}
[$status, $body] = request('api/project-visitors/get_session.php');
$session = json_decode((string)$body, true);
if ($status !== 200 || ($session['success'] ?? false) !== true) {
    fwrite(STDERR, "The PHP session endpoint did not load successfully.\n");
    exit(1);
}
[$status, $body] = request('api/works/get_works.php');
$works = json_decode((string)$body, true);
if ($status !== 200 || ($works['success'] ?? false) !== true) {
    fwrite(STDERR, "The Works endpoint did not load successfully.\n");
    exit(1);
}
echo "Live checks passed: .env files return 403; PHP session and Works endpoints return 200.\n";
