<?php
/** Admin Leads */
require_once __DIR__ . '/config.php';
require_auth();
$pageTitle = 'Leads';

$leads = db()->query('SELECT * FROM leads ORDER BY id DESC')->fetchAll();

include __DIR__ . '/includes/header.php';
?>
<div class="card">
  <h2>Leads recibidos</h2>
  <p class="sub">Todas las solicitudes del formulario de contacto.</p>
  <div class="table-wrap">
  <table>
    <thead>
      <tr><th>#</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Empresa</th><th>Servicio</th><th>Presupuesto</th><th>Calidad</th><th>Estado</th><th>Fecha</th></tr>
    </thead>
    <tbody>
    <?php if (!$leads): ?>
      <tr><td colspan="10" style="color:#64748b">Aún no hay leads.</td></tr>
    <?php else: foreach ($leads as $l): ?>
      <tr>
        <td><?= (int)$l['id'] ?></td>
        <td><?= e($l['name']) ?></td>
        <td><?= e($l['email']) ?></td>
        <td><?= e($l['phone'] ?? '—') ?></td>
        <td><?= e($l['company'] ?? '—') ?></td>
        <td><?= e($l['service_interest']) ?></td>
        <td><?= e($l['budget_range'] ?? '—') ?></td>
        <td><span class="badge <?= e($l['lead_quality'] ?? '') ?>"><?= e($l['lead_quality'] ?? '—') ?></span></td>
        <td><?= e($l['status'] ?? 'new') ?></td>
        <td><?= e($l['created_at']) ?></td>
      </tr>
    <?php endforeach; endif; ?>
    </tbody>
  </table>
  </div>
</div>
<?php include __DIR__ . '/includes/footer.php'; ?>
