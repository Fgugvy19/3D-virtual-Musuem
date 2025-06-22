<?php
require_once '../config/db.php';

try {
    // Read and execute the SQL file
    $sql = file_get_contents(__DIR__ . '/create_users_table.sql');
    $db->exec($sql);
    echo json_encode(['success' => true, 'message' => 'Users table created successfully']);
} catch(PDOException $e) {
    error_log("Table Creation Error: " . $e->getMessage());
    echo json_encode([
        'success' => false, 
        'error' => 'Failed to create users table: ' . $e->getMessage()
    ]);
}
?>
