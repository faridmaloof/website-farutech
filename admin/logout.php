<?php
/** Admin Logout */
require_once __DIR__ . '/config.php';
$_SESSION = [];
session_destroy();
header('Location: /admin/');
exit;
