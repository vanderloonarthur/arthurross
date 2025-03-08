<?php
$servername = "localhost"; // Change if using a remote server
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "travelblog";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
