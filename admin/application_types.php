<?php
/**
 * Admin Panel - Gestión de Tipos de Aplicación
 * CRUD completo para tipos de aplicación (subcategorías de servicios)
 */

require_once __DIR__ . '/config.php';
require_auth();

$pageTitle = 'Tipos de Aplicación';
include __DIR__ . '/includes/header.php';

$pdo = db();
$message = '';
$messageType = '';

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if (!csrf_verify($_POST['csrf_token'] ?? '')) {
        $message = 'Error de validación CSRF';
        $messageType = 'error';
    } else {
        switch ($action) {
            case 'create':
                $stmt = $pdo->prepare("INSERT INTO application_types (service_id, name, description, is_active) VALUES (?, ?, ?, ?)");
                $stmt->execute([$_POST['service_id'], $_POST['name'], $_POST['description'], $_POST['is_active'] ?? 1]);
                $message = 'Tipo de aplicación creado exitosamente';
                $messageType = 'success';
                break;

            case 'update':
                $id = $_POST['id'];
                $stmt = $pdo->prepare("UPDATE application_types SET service_id=?, name=?, description=?, is_active=? WHERE id=?");
                $stmt->execute([$_POST['service_id'], $_POST['name'], $_POST['description'], $_POST['is_active'] ?? 1, $id]);
                $message = 'Tipo de aplicación actualizado exitosamente';
                $messageType = 'success';
                break;

            case 'delete':
                $id = $_POST['id'];
                $stmt = $pdo->prepare("DELETE FROM application_types WHERE id=?");
                $stmt->execute([$id]);
                $message = 'Tipo de aplicación eliminado exitosamente';
                $messageType = 'success';
                break;
        }
    }
}

// Get filter parameters
$filterService = isset($_GET['service']) ? (int)$_GET['service'] : 0;
$filterStatus = isset($_GET['status']) ? $_GET['status'] : 'all';

// Build query
$where = [];
$params = [];

if ($filterService > 0) {
    $where[] = "at.service_id = ?";
    $params[] = $filterService;
}

if ($filterStatus !== 'all') {
    $where[] = "at.is_active = ?";
    $params[] = ($filterStatus === 'active') ? 1 : 0;
}

$whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

// Get all application types with service names
$query = "SELECT at.*, s.name as service_name 
          FROM application_types at 
          JOIN services s ON at.service_id = s.id 
          $whereClause
          ORDER BY s.name, at.name";

$stmt = $pdo->prepare($query);
$stmt->execute($params);
$appTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Get all services for filter and dropdown
$services = $pdo->query("SELECT id, name FROM services ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);
?>

<?php if ($message): ?>
<div class="alert alert-<?= $messageType ?>">
    <?= e($message) ?>
</div>
<?php endif; ?>

<div class="card">
    <div class="card-header">
        <h2>Tipos de Aplicación</h2>
        <div style="display: flex; gap: 10px;">
            <button type="button" class="btn btn-primary" onclick="openModal()">
                <i class="ti ti-plus"></i> Nuevo Tipo
            </button>
        </div>
    </div>

    <!-- Filters -->
    <div class="filters" style="margin-bottom: 1rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <form method="GET" style="display: flex; gap: 0.5rem; align-items: center;">
            <select name="service" class="form-control" onchange="this.form.submit()">
                <option value="0">Todos los servicios</option>
                <?php foreach ($services as $svc): ?>
                    <option value="<?= $svc['id'] ?>" <?= $filterService === $svc['id'] ? 'selected' : '' ?>>
                        <?= e($svc['name']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <select name="status" class="form-control" onchange="this.form.submit()">
                <option value="all" <?= $filterStatus === 'all' ? 'selected' : '' ?>>Todos los estados</option>
                <option value="active" <?= $filterStatus === 'active' ? 'selected' : '' ?>>Activos</option>
                <option value="inactive" <?= $filterStatus === 'inactive' ? 'selected' : '' ?>>Inactivos</option>
            </select>
            <a href="application_types.php" class="btn btn-sm btn-secondary">Limpiar</a>
        </form>
    </div>

    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Servicio</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($appTypes)): ?>
                <tr>
                    <td colspan="6" style="text-align: center; color: #64748b; padding: 2rem;">
                        No hay tipos de aplicación registrados
                    </td>
                </tr>
                <?php else: ?>
                    <?php foreach ($appTypes as $type): ?>
                    <tr>
                        <td><?= e($type['id']) ?></td>
                        <td><?= e($type['service_name']) ?></td>
                        <td><strong><?= e($type['name']) ?></strong></td>
                        <td><?= e(substr($type['description'] ?? '', 0, 60)) ?><?= strlen($type['description'] ?? '') > 60 ? '...' : '' ?></td>
                        <td>
                            <?php if ($type['is_active']): ?>
                                <span class="status status-active">Activo</span>
                            <?php else: ?>
                                <span class="status status-inactive">Inactivo</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-icon" onclick='editAppType(<?= json_encode($type) ?>)' title="Editar">
                                <i class="ti ti-edit"></i>
                            </button>
                            <form method="POST" style="display:inline;" onsubmit="return confirm('¿Eliminar este tipo de aplicación?')">
                                <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">
                                <input type="hidden" name="action" value="delete">
                                <input type="hidden" name="id" value="<?= $type['id'] ?>">
                                <button type="submit" class="btn btn-sm btn-icon btn-danger" title="Eliminar">
                                    <i class="ti ti-trash"></i>
                                </button>
                            </form>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <div style="margin-top: 1rem; color: #64748b; font-size: 0.875rem;">
        Total: <strong><?= count($appTypes) ?></strong> tipos de aplicación
    </div>
</div>

<!-- Modal for Create/Edit -->
<div id="appTypeModal" class="modal" style="display:none;">
    <div class="modal-content">
        <div class="modal-header">
            <h3 id="modalTitle">Nuevo Tipo de Aplicación</h3>
            <button type="button" class="close" onclick="closeModal()">&times;</button>
        </div>
        <form method="POST">
            <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">
            <input type="hidden" name="action" id="formAction" value="create">
            <input type="hidden" name="id" id="appTypeId">

            <div class="form-group">
                <label for="service_id">Servicio *</label>
                <select name="service_id" id="service_id" class="form-control" required>
                    <option value="">Seleccione un servicio</option>
                    <?php foreach ($services as $svc): ?>
                        <option value="<?= $svc['id'] ?>"><?= e($svc['name']) ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="form-group">
                <label for="name">Nombre *</label>
                <input type="text" name="name" id="name" class="form-control" required maxlength="160">
            </div>

            <div class="form-group">
                <label for="description">Descripción</label>
                <textarea name="description" id="description" class="form-control" rows="4" maxlength="500"></textarea>
            </div>

            <div class="form-group">
                <label for="is_active">Estado</label>
                <select name="is_active" id="is_active" class="form-control">
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    </div>
</div>

<script>
function openModal() {
    document.getElementById('modalTitle').textContent = 'Nuevo Tipo de Aplicación';
    document.getElementById('formAction').value = 'create';
    document.getElementById('appTypeId').value = '';
    document.getElementById('service_id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('is_active').value = '1';
    document.getElementById('appTypeModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('appTypeModal').style.display = 'none';
}

function editAppType(type) {
    document.getElementById('modalTitle').textContent = 'Editar Tipo de Aplicación';
    document.getElementById('formAction').value = 'update';
    document.getElementById('appTypeId').value = type.id;
    document.getElementById('service_id').value = type.service_id;
    document.getElementById('name').value = type.name;
    document.getElementById('description').value = type.description || '';
    document.getElementById('is_active').value = type.is_active;
    document.getElementById('appTypeModal').style.display = 'block';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('appTypeModal');
    if (event.target === modal) {
        closeModal();
    }
}
</script>

<style>
.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #1a1a1a;
}

.close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
}

.form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
}

.form-control:focus {
    outline: none;
    border-color: #3FC1FF;
    box-shadow: 0 0 0 3px rgba(63, 193, 255, 0.1);
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1.5rem;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.card-header h2 {
    margin: 0;
}

.status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
}

.status-active {
    background: #dcfce7;
    color: #16a34a;
}

.status-inactive {
    background: #fee2e2;
    color: #dc2626;
}

.alert {
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.alert-success {
    background: #dcfce7;
    color: #16a34a;
    border: 1px solid #86efac;
}

.alert-error {
    background: #fee2e2;
    color: #dc2626;
    border: 1px solid #fca5a5;
}

.btn-sm {
    padding: 4px 8px;
    font-size: 0.875rem;
}

.btn-icon {
    padding: 4px 8px;
}

.btn-danger {
    background: #dc2626;
    color: white;
}

.btn-danger:hover {
    background: #b91c1c;
}
</style>

<?php include __DIR__ . '/includes/footer.php'; ?>
