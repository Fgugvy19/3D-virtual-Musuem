# 3D Virtual Museum

This project is a 3D Virtual Museum application designed to showcase various historical sites and artifacts with detailed descriptions and immersive 3D models. It includes user authentication (sign-up/sign-in with admin approval), a carousel for browsing exhibits, multilingual support (English and Arabic), and text-to-speech functionality for accessibility.

## Table of Contents

* [Features]
* [Technologies Used]
* [Project Structure]
* [Setup and Installation]
    * [Prerequisites]
    * [Database Setup]
    * [Backend Setup (PHP)]
    * [Frontend Setup]
* [Usage]
    * [User Registration and Login]
    * [Admin Panel]
    * [Browsing the Museum]
* [Contributing]
* [License]
* [Contact]

## Features

* **User Authentication:**
    * User registration and login system.
    * Admin approval mechanism for new user accounts.
    * Session management using local storage (for the frontend).
* **Admin Panel:**
    * View, approve, reject, and delete pending user accounts.
    * Add new tourist attraction content (though the backend integration for this might need further development based on the provided `admin.html`).
* **Interactive 3D Carousel:**
    * Smooth carousel navigation for browsing different exhibits.
    * Each exhibit features a background image, title, topic, short description, and a "MORE INFO" button.
* **Detailed Exhibit Modals:**
    * Clicking "MORE INFO" opens a modal with a comprehensive description of the historical site.
    * Integrated 3D models (using `model-viewer` for `.glb` files and Matterport iframes for virtual tours).
    * Dynamic content loading for exhibit details.
* **Multilingual Support:**
    * Toggle between English and Arabic languages for all textual content.
    * Text-to-speech (TTS) functionality for reading exhibit descriptions in the selected language.
* **Responsive Design:**
    * Adjusts layout and elements for optimal viewing on various screen sizes (desktop, tablet, mobile).
* **Error Handling and User Feedback:**
    * Provides messages for login/registration status, errors, and admin actions.

## Technologies Used

* **Frontend:**
    * HTML5
    * CSS3 (with `style.css` for custom styles and responsive adjustments)
    * JavaScript (ES6+)
    * `@google/model-viewer`: For displaying interactive 3D models (`.glb` files).
    * Matterport iFrames: For embedding 3D virtual tours.
    * Web Speech API: For Text-to-Speech functionality.
* **Backend:**
    * PHP (based on the `api/*.php` references in HTML files, though PHP files themselves are not provided in the uploaded content, their existence is inferred).
    * MySQL (as indicated by `database.sql` for user management).
* **Database:**
    * MySQL / MariaDB (for user data storage and status management).
* **Development & Testing:**
    * Playwright: For end-to-end testing (indicated by `playwright.config.js`).

## Project Structure

```
.
├── 404.html               // Custom 404 page
├── admin.html             // Admin panel for user management and content adding
├── app.js                 // Main JavaScript file for carousel, modals, TTS, and client-side user management (local storage)
├── css/                   // Directory for CSS files
│   └── style.css          // Main stylesheet for the application
├── database.sql           // SQL script for creating the 'users' table
├── fonts/                 // Directory for fonts (e.g., Material Icons)
├── image/                 // Directory for images and 3D models
│   ├── img1.jpg
│   ├── img2.jpg
│   ├── ...
│   ├── logo1.png
│   ├── signin-image.jpg
│   ├── signup-image.jpg
│   ├── sphinx.glb         // 3D model of Sphinx
│   └── statue_of_ramses_iii.glb // 3D model of Ramses III statue
├── index.html             // Main museum page with carousel and exhibit display
├── playwright.config.js   // Playwright configuration for E2E tests
├── signin.html            // User login page
├── signup.html            // User registration page
└── tests/                 // Directory for Playwright tests (not provided, but inferred)
    └── example.spec.js    // Example test file (inferred)
```

**Note:** The actual PHP backend files (e.g., `api/login.php`, `api/register.php`, `api/users.php`) are *not* provided. You will need to implement these based on the frontend's expected API calls.

## Setup and Installation

### Prerequisites

* A web server (e.g., Apache, Nginx) capable of serving HTML, CSS, and JavaScript.
* PHP installed and configured for your web server (if you plan to use the inferred backend logic).
* MySQL/MariaDB database server.
* Git (for cloning the repository).
* Node.js and npm (if you plan to run Playwright tests or manage frontend dependencies, though none are explicitly listed beyond `model-viewer` from unpkg).

### Database Setup

1.  **Create a database:**
    ```sql
    CREATE DATABASE `3d_museum`;
    USE `3d_museum`;
    ```
2.  **Import the schema:**
    Use the `database.sql` file to create the `users` table.
    ```bash
    mysql -u your_username -p 3d_museum < database.sql
    ```
    (Replace `your_username` with your MySQL username and enter your password when prompted.)

### Backend Setup (PHP)

**Note:** The actual PHP backend files (`api/register.php`, `api/login.php`, `api/users.php`) are *not* provided. You will need to implement these based on the frontend's expected API calls.

Based on the frontend code, the PHP scripts should handle:

* **`api/register.php` (POST):**
    * Receives `name`, `email`, `pass`, `device_info`.
    * Encrypts password (the `app.js` has `simpleEncrypt` for local storage, but for a real backend, use strong hashing like `password_hash()`).
    * Inserts user into `users` table with `status` as 'pending'.
    * Returns JSON: `{"success": true}` or `{"success": false, "error": "..."}`.
* **`api/login.php` (POST):**
    * Receives `email`, `password`.
    * Authenticates user against the database.
    * Checks if `status` is 'approved'.
    * Returns JSON: `{"success": true, "user": {...}}` or `{"success": false, "error": "..."}`.
* **`api/users.php?action=list` (GET):**
    * Retrieves a list of all users from the `users` table.
    * Returns JSON: `{"success": true, "users": [...]}`.
* **`api/users.php?action=approve` (POST):**
    * Receives `userId`.
    * Updates user `status` to 'approved'.
    * Returns JSON: `{"success": true}`.
* **`api/users.php?action=reject` (POST):**
    * Receives `userId`.
    * Updates user `status` to 'rejected'.
    * Returns JSON: `{"success": true}`.
* **`api/users.php?action=delete` (POST):**
    * Receives `userId`.
    * Deletes user from `users` table.
    * Returns JSON: `{"success": true}`.

### Frontend Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Fgugvy19/3D-virtual-Musuem.git](https://github.com/Fgugvy19/3D-virtual-Musuem.git)
    cd 3D-virtual-Musuem
    ```
2.  **Place files on your web server:**
    Copy all the files and folders (e.g., `404.html`, `admin.html`, `app.js`, `css/`, `fonts/`, `image/`, `index.html`, `signin.html`, `signup.html`, `style.css`) into your web server's document root (e.g., `htdocs` for Apache, `www` for Nginx).

## Usage

### User Registration and Login

1.  **Register:** Navigate to `signup.html`. Fill in your name, email, and password. You will need to agree to the terms of service.
2.  **Admin Approval:** After registration, your account will be in 'pending' status. An administrator must approve your account via the admin panel before you can log in.
3.  **Sign In:** Once approved, go to `signin.html`. Enter your registered email and password to log in. Upon successful login, you will be redirected to `index.html`.

### Admin Panel

1.  **Access:** Navigate to `admin.html`.
2.  **Login:** Use the hardcoded admin credentials:
    * **Username:** `admin`
    * **Password:** `A1B2C3`
3.  **Manage Users:** After logging in, you will see a list of pending user accounts. You can:
    * **Approve:** Change a user's status to 'approved'.
    * **Reject:** Change a user's status to 'rejected'.
    * **Delete:** Permanently remove a user account.
4.  **Add Content (Frontend only):** The admin panel has a form to "Add Tourist Attraction Content". Note that the provided `admin.html` only handles the frontend form submission and clears the fields, without sending data to a backend. This part would require backend implementation to store the attraction data persistently.

### Browsing the Museum

1.  **Carousel Navigation:** On `index.html`, use the "previous" (`<`) and "next" (`>`) arrows to navigate through different historical sites.
2.  **More Info:** Click the "MORE INFO" button on any carousel item to open a modal with a detailed description and an embedded 3D model/virtual tour.
3.  **Language Toggle:** Use the "العربية" / "English" button to switch the entire application's content language.
4.  **Text-to-Speech:** When a modal is open, a speaker icon will appear. Click it to start/pause/stop the text-to-speech narration of the exhibit details.
5.  **Logout:** Click the "Sign out" (or "تسجيل الخروج" in Arabic) button to log out and return to the `signin.html` page.

## Contact

For any inquiries or support, please contact: ae9122948@gmail.com


#### Quote

"The journey of a thousand miles begins with a single step." - Lao Tzu
