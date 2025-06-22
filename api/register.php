<?php
header('Content-Type: application/json');
require_once '../config/db.php';

try {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['pass'] ?? '';
    $device_info = $_POST['device_info'] ?? '';

    if(empty($email) || empty($password)) {
        throw new Exception('Missing required fields');
    }

    // Check if email exists
    $stmt = $db->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if($stmt->fetchColumn() > 0) {
        throw new Exception('Email already exists');
    }

    // Create user
    $sql = "INSERT INTO users (name, email, password, device_info, status, created_at) 
            VALUES (?, ?, ?, ?, 'pending', NOW())";
    $stmt = $db->prepare($sql);
    $success = $stmt->execute([
        $name,
        $email,
        password_hash($password, PASSWORD_DEFAULT),
        $device_info
    ]);

    if(!$success) {
        throw new Exception('Failed to create account');
    }

    echo json_encode([
        'success' => true,
        'message' => 'Registration successful'
    ]);

} catch(Exception $e) {
    error_log("Registration Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
