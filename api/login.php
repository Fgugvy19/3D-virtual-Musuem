<?php
header('Content-Type: application/json');
require_once '../config/db.php';

try {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if(empty($email) || empty($password)) {
        throw new Exception('Missing credentials');
    }

    $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$user || !password_verify($password, $user['password'])) {
        throw new Exception('Incorrect email or password');
    }

    if($user['status'] !== 'approved') {
        throw new Exception('Account pending approval');
    }

    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'status' => $user['status']
        ]
    ]);
} catch(Exception $e) {
    error_log("Login Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
