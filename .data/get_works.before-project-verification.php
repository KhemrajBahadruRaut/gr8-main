<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';
works_require_method('GET');

$result = $conn->query('SELECT content_json, updated_at FROM works_content WHERE id = 1 LIMIT 1');
$row = $result ? $result->fetch_assoc() : null;
if (!$row) {
    works_respond(['success' => false, 'message' => 'Unable to load works content'], 500);
}

$content = json_decode($row['content_json'], true);
if (!is_array($content)) {
    $content = works_default_content();
}
$content = works_hydrate_client_links($conn, $content);

works_respond([
    'success' => true,
    'content' => $content,
    'updated_at' => $row['updated_at'],
]);
