<?php
include 'connection.php';

// Fetch all users including id, username, email, password
$sql = "SELECT id, username, email, password FROM users";
$result = $conn->query($sql);

$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users); // Return the users as a JSON response

$conn->close();
?>
