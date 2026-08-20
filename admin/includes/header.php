<?php
/**
 * Admin Header — sidebar de navegación responsive.
 * Requiere: require_auth() ya ejecutado y $pageTitle definido.
 */
$currentPage = basename($_SERVER['SCRIPT_NAME']);
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title><?= e($pageTitle ?? 'Panel FaruTech') ?> · FaruTech Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/admin/assets/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.40.0/tabler-icons.min.js"></script>
</head>
<body>
<div class="admin-shell">
  <aside class="sidebar">
    <a class="brand" href="/admin/dashboard.php">
      <img src="/logo.webp" alt="FaruTech" class="brand-logo" />
      <span>FaruTech <em>Admin</em></span>
    </a>
    <nav class="nav">
      <a class="nav-item <?= $currentPage === 'dashboard.php' ? 'active' : '' ?>" href="/admin/dashboard.php"><i class="ti ti-dashboard"></i>Dashboard</a>
      <a class="nav-item <?= basename($currentPage) === 'leads.php' ? 'active' : '' ?>" href="/admin/leads.php"><i class="ti ti-inbox"></i>Leads</a>
      <a class="nav-item <?= in_array($currentPage, ['locations.php']) ? 'active' : '' ?>" href="/admin/locations.php"><i class="ti ti-map-pins"></i>Ubicaciones</a>
      <a class="nav-item <?= in_array($currentPage, ['services.php']) ? 'active' : '' ?>" href="/admin/services.php"><i class="ti ti-tools"></i>Servicios</a>
      <a class="nav-item <?= in_array($currentPage, ['application_types.php']) ? 'active' : '' ?>" href="/admin/application_types.php"><i class="ti ti-category"></i>Tipos de Aplicación</a>
      <a class="nav-item <?= in_array($currentPage, ['blog.php','blog-edit.php']) ? 'active' : '' ?>" href="/admin/blog.php"><i class="ti ti-news"></i>Blog</a>
      <a class="nav-item <?= $currentPage === 'contact-info.php' ? 'active' : '' ?>" href="/admin/contact-info.php"><i class="ti ti-phone"></i>Contacto</a>
    </nav>
    <div class="sidebar-foot">
      <a class="nav-item" href="/" target="_blank"><i class="ti ti-external-link"></i>Ver sitio</a>
      <a class="nav-item" href="/admin/logout.php"><i class="ti ti-logout"></i>Cerrar sesión</a>
    </div>
  </aside>
  <main class="content">
    <header class="topbar">
      <button class="menu-toggle" id="menuToggle" aria-label="Abrir menú"><i class="ti ti-menu-2"></i></button>
      <h1><?= e($pageTitle ?? '') ?></h1>
      <span class="user"><?= e($_SESSION['admin_name'] ?? 'Admin') ?></span>
    </header>
    <div class="page">
