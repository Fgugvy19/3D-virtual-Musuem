<?php
// Set proper headers to prevent caching
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/db.php';

try {
    // Debug Point 1: Check database connection
    error_log("Debug Point 1: Checking database connection");
    if (!$db) {
        error_log("Database connection failed");
        throw new Exception("Database connection failed");
    }
    error_log("Database connection successful");

    $action = $_GET['action'] ?? '';
    error_log("Debug Point 2: Requested action: " . $action);

    switch($action) {
        case 'list':
            // Debug Point 3: Database query
            error_log("Debug Point 3: Executing users query");
            try {
                // Test query first
                $test = $db->query("SHOW TABLES LIKE 'users'");
                $tableExists = $test->rowCount() > 0;
                error_log("Users table exists: " . ($tableExists ? 'Yes' : 'No'));

                $stmt = $db->query("SELECT * FROM users");
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                error_log("Found " . count($users) . " users");
                error_log("Users data: " . print_r($users, true));

                echo json_encode([
                    'success' => true,
                    'users' => $users,
                    'debug' => [
                        'tableExists' => $tableExists,
                        'userCount' => count($users),
                        'timestamp' => date('Y-m-d H:i:s')
                    ]
                ]);
            } catch (PDOException $e) {
                error_log("Database query error: " . $e->getMessage());
                throw $e;
            }
            break;

        case 'approve':
            $userId = $_POST['userId'] ?? null;
            if($userId) {
                $stmt = $db->prepare("UPDATE users SET status = 'approved' WHERE id = ?");
                $success = $stmt->execute([$userId]);
                echo json_encode(['success' => $success]);
            }
            break;

        case 'reject':
            $userId = $_POST['userId'] ?? null;
            if($userId) {
                $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
                $success = $stmt->execute([$userId]);
                echo json_encode(['success' => $success]);
            }
            break;

        case 'delete':
            $userId = $_POST['userId'] ?? null;
            if($userId) {
                try {
                    $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
                    $success = $stmt->execute([$userId]);
                    echo json_encode([
                        'success' => $success,
                        'message' => $success ? 'User deleted successfully' : 'Failed to delete user'
                    ]);
                } catch(PDOException $e) {
                    error_log("Delete Error: " . $e->getMessage());
                    echo json_encode(['success' => false, 'error' => 'Database error']);
                }
            }
            break;

        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action', 'users' => []]);
    }
} catch(Exception $e) {
    error_log("API Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'debug' => true
    ]);
}
?>
