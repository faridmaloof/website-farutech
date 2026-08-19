<?php
/** Admin Dashboard */
require_once __DIR__ . '/config.php';
require_auth();
$pageTitle = 'Dashboard';

$totalLeads = db()->query('SELECT COUNT(*) c FROM leads')->fetch()['c'];
$hotLeads = db()->query("SELECT COUNT(*) c FROM leads WHERE lead_quality='hot'")->fetch()['c'];
$publishedPosts = db()->query("SELECT COUNT(*) c FROM blog_posts WHERE status='published'")->fetch()['c'];
$subscribers = db()->query('SELECT COUNT(*) c FROM newsletter_subscribers')->fetch()['c'];

$recentLeads = db()->query('SELECT id, name, email, service_interest, lead_quality, created_at FROM leads ORDER BY id DESC LIMIT 6')->fetchAll();

include __DIR__ . '/includes/header.php';
?>
<div class="grid cols-4">
  <div class="stat"><div class="num"><?= (int)$totalLeads ?></div><div class="lbl">Leads totales</div></div>
  <div class="stat"><div class="num"><?= (int)$hotLeads ?></div><div class="lbl">Leads hot</div></div>
  <div class="stat"><div class="num"><?= (int)$publishedPosts ?></div><div class="lbl">Posts publicados</div></div>
  <div class="stat"><div class="num"><?= (int)$subscribers ?></div><div class="lbl">Suscriptores</div></div>
</div>

<div class="card" style="margin-top:20px">
  <h2>Leads recientes</h2>
  <p class="sub">Últimas solicitudes recibidas.</p>
  <div class="table-wrap">
  <table>
    <thead><tr><th>#</th><th>Nombre</th><th>Email</th><th>Servicio</th><th>Calidad</th><th>Fecha</th></tr></thead>
    <tbody>
    <?php if (!$recentLeads): ?>
      <tr><td colspan="6" style="color:#64748b">Aún no hay leads.</td></tr>
    <?php else: foreach ($recentLeads as $l): ?>
      <tr>
        <td><?= (int)$l['id'] ?></td>
        <td><?= e($l['name']) ?></td>
        <td><?= e($l['email']) ?></td>
        <td><?= e($l['service_interest']) ?></td>
        <td><span class="badge <?= e($l['lead_quality'] ?? '') ?>"><?= e($l['lead_quality'] ?? '—') ?></span></td>
        <td><?= e($l['created_at']) ?></td>
      </tr>
    <?php endforeach; endif; ?>
    </tbody>
  </table>
  </div>
</div>
<?php include __DIR__ . '/includes/footer.php'; ?>
