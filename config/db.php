<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database credentials
$db_host = 'localhost'; // Changed back to localhost since this is shared hosting
$db_name = 'tvayhrte_3D-musuem';
$db_user = 'tvayhrte_3D-musuem';
$db_pass = '~js@_Srk~q81';

try {
    $dsn = "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ];
    
    $db = new PDO($dsn, $db_user, $db_pass, $options);
    
    // Verify connection
    $test = $db->query('SELECT 1')->fetch();
    if (!$test) {
        throw new Exception("Database connection test failed");
    }
    
} catch(PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    die(json_encode(['success' => false, 'error' => 'Database connection failed']));
}
?>
