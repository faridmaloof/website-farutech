<?php
/** Admin Login */
require_once __DIR__ . '/config.php';

if (is_logged_in()) { header('Location: /admin/dashboard.php'); exit; }

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === '' || $password === '') {
        $error = 'Ingresa usuario y contraseña.';
    } else {
        $stmt = db()->prepare('SELECT id, name, username, password_hash FROM admin_users WHERE username = :u OR email = :u LIMIT 1');
        $stmt->execute([':u' => $username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_user_id'] = (int)$user['id'];
            $_SESSION['admin_name'] = $user['name'];
            $_SESSION['admin_username'] = $user['username'];
            header('Location: /admin/dashboard.php');
            exit;
        }
        $error = 'Credenciales incorrectas.';
    }
}
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Iniciar sesión · FaruTech Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/admin/assets/style.css" />
</head>
<body>
<div class="login-wrap">
  <form class="login-card" method="post" autocomplete="off">
    <div class="brand"><img src="/logo.webp" alt="" /><span style="font-weight:700">FaruTech <span style="color:#2563eb">Admin</span></span></div>
    <h1>Bienvenido</h1>
    <p class="sub">Ingresa para gestionar tu panel de administración.</p>

    <?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

    <div class="field">
      <label for="username">Usuario o email</label>
      <input class="input" id="username" name="username" required autofocus />
    </div>
    <div class="field">
      <label for="password">Contraseña</label>
      <input class="input" type="password" id="password" name="password" required />
    </div>
    <button class="btn block" type="submit">Iniciar sesión</button>
    <p style="margin-top:16px;font-size:12px;color:#64748b;text-align:center">
      Usuario por defecto: <code>admin</code> · contraseña: <code>Admin123!</code>
    </p>
  </form>
</div>
</body>
</html>
