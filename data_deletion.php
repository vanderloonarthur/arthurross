<?php
header('Content-Type: application/json');

if (!isset($_POST['signed_request'])) {
    echo json_encode(['error' => 'Missing signed_request']);
    exit;
}

$signed_request = $_POST['signed_request'];
$data = parse_signed_request($signed_request);

if (!$data || !isset($data['user_id'])) {
    echo json_encode(['error' => 'Invalid signed request']);
    exit;
}

$user_id = $data['user_id'];

// Perform data deletion process here (e.g., remove user from database)

// Generate a unique confirmation code
$confirmation_code = uniqid('del_', true);
$status_url = "https://www.arthurross.nl/deletion?id=" . urlencode($confirmation_code);

$response = [
    'url' => $status_url,
    'confirmation_code' => $confirmation_code
];

echo json_encode($response);

/**
 * Parse signed request from the platform
 */
function parse_signed_request($signed_request) {
    list($encoded_sig, $payload) = explode('.', $signed_request, 2);

    $secret = "appsecret"; // Replace with your actual app secret

    // Decode the signature and payload
    $sig = base64_url_decode($encoded_sig);
    $data = json_decode(base64_url_decode($payload), true);

    // Validate the signature
    $expected_sig = hash_hmac('sha256', $payload, $secret, true);
    if (!hash_equals($sig, $expected_sig)) {
        error_log('Invalid signed request signature!');
        return null;
    }

    return $data;
}

/**
 * Base64 URL decode function
 */
function base64_url_decode($input) {
    return base64_decode(strtr($input, '-_', '+/'));
}
?>
