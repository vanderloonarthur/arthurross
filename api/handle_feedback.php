<?php
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize input data
    $selectedFeedback = isset($_POST['selectedFeedback']) ? htmlspecialchars(trim($_POST['selectedFeedback'])) : '';
    $additionalComments = isset($_POST['additionalComments']) ? htmlspecialchars(trim($_POST['additionalComments'])) : '';

    // Validate input (optional, depending on your requirements)

    // Example processing: Log to a file (for demonstration purposes)
    $logMessage = "Feedback: " . $selectedFeedback . "\n";
    $logMessage .= "Additional Comments: " . $additionalComments . "\n";
    file_put_contents('feedback.log', $logMessage, FILE_APPEND);

    // Respond with a success message (JSON format)
    http_response_code(200);
    echo json_encode(['message' => 'Feedback submitted successfully.']);
} else {
    // Handle requests other than POST (e.g., GET, PUT, DELETE)
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Method not allowed']);
}
?>
