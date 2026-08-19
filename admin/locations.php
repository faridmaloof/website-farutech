<?php
/** Admin Ubicaciones — CRUD países, estados y ciudades */
require_once __DIR__ . '/config.php';
require_auth();
$pageTitle = 'Ubicaciones';

$message = '';

if (isset($_POST['action_country']) && csrf_verify($_POST['csrf'] ?? null)) {
    $iso2 = strtoupper(trim($_POST['iso2'] ?? ''));
    $name = trim($_POST['name'] ?? '');
    $code = trim($_POST['calling_code'] ?? '');
    if ($iso2 !== '' && $name !== '') {
        db()->prepare('INSERT INTO countries (iso2, name, calling_code) VALUES (?,?,?)')->execute([$iso2, $name, $code ?: null]);
        $message = 'País agregado.';
    }
}
if (isset($_POST['action_state']) && csrf_verify($_POST['csrf'] ?? null)) {
    $countryId = (int)($_POST['country_id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    if ($countryId > 0 && $name !== '') {
        db()->prepare('INSERT INTO states (country_id, name) VALUES (?,?)')->execute([$countryId, $name]);
        $message = 'Estado/departamento agregado.';
    }
}
if (isset($_POST['action_city']) && csrf_verify($_POST['csrf'] ?? null)) {
    $stateId = (int)($_POST['state_id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    if ($stateId > 0 && $name !== '') {
        db()->prepare('INSERT INTO cities (state_id, name) VALUES (?,?)')->execute([$stateId, $name]);
        $message = 'Ciudad agregada.';
    }
}
if (isset($_GET['delete']) && csrf_verify($_GET['csrf'] ?? null)) {
    $id = (int)$_GET['delete']; $table = $_GET['table'] ?? '';
    if (in_array($table, ['countries','states','cities'], true)) {
        db()->prepare("DELETE FROM `$table` WHERE id=:id")->execute([':id' => $id]);
        $message = 'Registro eliminado.';
    }
}

$countries = db()->query('SELECT * FROM countries ORDER BY name')->fetchAll();
$activeCountry = isset($_GET['country']) ? (int)$_GET['country'] : (int)($countries[0]['id'] ?? 0);
$st = db()->prepare('SELECT * FROM states WHERE country_id=? ORDER BY name'); $st->execute([$activeCountry]); $states = $st->fetchAll();
$activeState = isset($_GET['state']) ? (int)$_GET['state'] : (int)($states[0]['id'] ?? 0);
$ct = db()->prepare('SELECT * FROM cities WHERE state_id=? ORDER BY name'); $ct->execute([$activeState]); $cities = $ct->fetchAll();

include __DIR__ . '/includes/header.php';
?>
<?php if ($message): ?><div class="alert success"><?= e($message) ?></div><?php endif; ?>

<div class="grid cols-3">
  <div class="card">
    <h2>Países</h2>
    <p class="sub">Agregar países del mundo.</p>
    <form method="post">
      <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>" />
      <input type="hidden" name="action_country" value="1" />
      <div class="field"><label>ISO2 (ej: CO)</label><input class="input" name="iso2" maxlength="2" required /></div>
      <div class="field"><label>Nombre</label><input class="input" name="name" required /></div>
      <div class="field"><label>Prefijo tel (opcional)</label><input class="input" name="calling_code" placeholder="+57" /></div>
      <button class="btn" type="submit">Agregar país</button>
    </form>
    <div class="table-wrap" style="margin-top:14px">
    <table><tbody>
      <?php foreach ($countries as $c): ?>
      <tr>
        <td><?= e($c['name']) ?></td>
        <td><a href="?country=<?= $c['id'] ?>" class="btn small secondary">Ver</a></td>
        <td><a href="?table=countries&delete=<?= $c['id'] ?>&csrf=<?= e(csrf_token()) ?>" class="btn small danger" onclick="return confirm('¿Eliminar?')">✕</a></td>
      </tr>
      <?php endforeach; ?>
    </tbody></table>
    </div>
  </div>
