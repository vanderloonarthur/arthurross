<?php
include 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["profile_image"])) {
    $target_dir = "uploads/";
    $file_name = basename($_FILES["profile_image"]["name"]);
    $target_file = $target_dir . $file_name;

    if (move_uploaded_file($_FILES["profile_image"]["tmp_name"], $target_file)) {
        $user_id = $_SESSION['user_id'];
        $sql = "UPDATE users SET profile_image = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $file_name, $user_id);
        $stmt->execute();
        $_SESSION['profile_image'] = $file_name;
        header("Location: profile.php");
    } else {
        echo "File upload failed.";
    }
}
?>
