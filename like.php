<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "likes_db");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $imageId = $_POST["imageId"];
    $conn->query("UPDATE likes SET count = count + 1 WHERE image_id = '$imageId'");
    $result = $conn->query("SELECT count FROM likes WHERE image_id = '$imageId'");
    $row = $result->fetch_assoc();
    echo json_encode(["likes" => $row["count"]]);
}
?>
