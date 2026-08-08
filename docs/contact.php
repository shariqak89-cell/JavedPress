<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed';
    exit;
}

$to = 'digisparkxx@gmail.com';
$subject = isset($_POST['_subject']) && trim((string) $_POST['_subject']) !== ''
    ? trim((string) $_POST['_subject'])
    : 'New website enquiry for Javed Press';

$fields = [
    'Name',
    'Phone',
    'Email',
    'Service',
    'Quantity',
    'Paper and size',
    'Finishing',
    'Deadline',
    'Project details',
];

$lines = [];
foreach ($fields as $field) {
    $value = isset($_POST[$field]) ? trim((string) $_POST[$field]) : '';
    if ($value !== '') {
        $lines[] = $field . ': ' . $value;
    }
}
$lines[] = 'Submitted from: ' . ($_SERVER['HTTP_HOST'] ?? 'Javed Press website');
$message = implode("\n", $lines);

$replyTo = filter_var($_POST['Email'] ?? '', FILTER_VALIDATE_EMAIL) ?: $to;
$host = preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'javedpress.in');
$from = 'no-reply@' . $host;
$headers = [
    'From: Javed Press Website <' . $from . '>',
    'Reply-To: ' . $replyTo,
    'MIME-Version: 1.0',
];

$attachment = $_FILES['attachment'] ?? null;
$hasAttachment = is_array($attachment)
    && ($attachment['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK
    && is_uploaded_file((string) $attachment['tmp_name']);

if ($hasAttachment) {
    $boundary = 'javedpress-' . bin2hex(random_bytes(12));
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $body .= $message . "\r\n";

    $filename = basename((string) $attachment['name']);
    $fileContent = chunk_split(base64_encode((string) file_get_contents((string) $attachment['tmp_name'])));
    $mimeType = mime_content_type((string) $attachment['tmp_name']) ?: 'application/octet-stream';

    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: {$mimeType}; name=\"{$filename}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
    $body .= $fileContent . "\r\n";
    $body .= "--{$boundary}--";
} else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $body = $message;
}

$sent = mail($to, $subject, $body, implode("\r\n", $headers));
$status = $sent ? 'success' : 'error';
header('Location: /thank-you.html?status=' . $status);
exit;
