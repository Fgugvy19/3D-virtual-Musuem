<?php
require_once '../config/db.php';

try {
    // Create users table if not exists
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        device_info TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $db->exec($sql);

    // Insert a test user
    $stmt = $db->prepare("INSERT INTO users (name, email, password, device_info, status) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        'Test User',
        'test@example.com',
        password_hash('test123', PASSWORD_DEFAULT),
        'Test Device',
        'pending'
    ]);
    
    echo "Test data inserted successfully";
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
