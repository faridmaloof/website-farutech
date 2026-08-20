<?php
/**
 * Admin Panel - Gestión de Servicios
 * CRUD completo para servicios (categorías principales)
 */

require_once __DIR__ . '/config.php';
require_auth();

$pageTitle = 'Servicios';
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
                $slug = slugify($_POST['name']);
                $stmt = $pdo->prepare("INSERT INTO services (slug, name, description, is_active) VALUES (?, ?, ?, ?)");
                $stmt->execute([$slug, $_POST['name'], $_POST['description'], $_POST['is_active'] ?? 1]);
                $message = 'Servicio creado exitosamente';
                $messageType = 'success';
                break;
                
            case 'update':
                $id = $_POST['id'];
                $slug = slugify($_POST['name']);
                $stmt = $pdo->prepare("UPDATE services SET slug=?, name=?, description=?, is_active=? WHERE id=?");
                $stmt->execute([$slug, $_POST['name'], $_POST['description'], $_POST['is_active'] ?? 1, $id]);
                $message = 'Servicio actualizado exitosamente';
                $messageType = 'success';
                break;
                
            case 'delete':
                $id = $_POST['id'];
                $stmt = $pdo->prepare("DELETE FROM services WHERE id=?");
                $stmt->execute([$id]);
                $message = 'Servicio eliminado exitosamente';
                $messageType = 'success';
                break;
        }
    }
}

// Get all services
$services = $pdo->query("SELECT * FROM services ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);

// Get application types count per service
$appTypesCount = $pdo->query("
    SELECT service_id, COUNT(*) as count 
    FROM application_types 
    GROUP BY service_id
")->fetchAll(PDO::FETCH_KEY_PAIR);
?>

<?php if ($message): ?>
<div class="alert alert-<?= $messageType ?>">
    <?= e($message) ?>
</div>
<?php endif; ?>

<div class="card">
    <div class="card-header">
        <h2>Servicios Principales</h2>
        <button type="button" class="btn btn-primary" onclick="openModal()">
            <i class="ti ti-plus"></i> Nuevo Servicio
        </button>
    </div>
    
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Slug</th>
                    <th>Descripción</th>
                    <th>Tipos de Aplicación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($services as $service): ?>
                <tr>
                    <td><?= e($service['id']) ?></td>
                    <td><?= e($service['name']) ?></td>
                    <td><code><?= e($service['slug']) ?></code></td>
                    <td><?= e(substr($service['description'], 0, 60)) ?><?= strlen($service['description']) > 60 ? '...' : '' ?></td>
                    <td>
                        <span class="badge"><?= $appTypesCount[$service['id']] ?? 0 ?> tipos</span>
                    </td>
                    <td>
                        <?php if ($service['is_active']): ?>
                            <span class="status status-active">Activo</span>
                        <?php else: ?>
                            <span class="status status-inactive">Inactivo</span>
                        <?php endif; ?>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-icon" onclick='editService(<?= json_encode($service) ?>)' title="Editar">
                            <i class="ti ti-edit"></i>
                        </button>
                        <form method="POST" style="display:inline;" onsubmit="return confirm('¿Eliminar este servicio?')">
                            <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $service['id'] ?>">
                            <button type="submit" class="btn btn-sm btn-icon btn-danger" title="Eliminar">
                                <i class="ti ti-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- Modal for Create/Edit -->
<div id="serviceModal" class="modal" style="display:none;">
    <div class="modal-content">
        <div class="modal-header">
            <h3 id="modalTitle">Nuevo Servicio</h3>
            <button type="button" class="close" onclick="closeModal()">&times;</button>
        </div>
        <form method="POST">
            <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">
            <input type="hidden" name="action" id="formAction" value="create">
            <input type="hidden" name="id" id="serviceId">
            
            <div class="form-group">
                <label for="name">Nombre *</label>
                <input type="text" name="name" id="name" class="form-control" required maxlength="150">
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
    document.getElementById('modalTitle').textContent = 'Nuevo Servicio';
    document.getElementById('formAction').value = 'create';
    document.getElementById('serviceId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('is_active').value = '1';
    document.getElementById('serviceModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('serviceModal').style.display = 'none';
}

function editService(service) {
    document.getElementById('modalTitle').textContent = 'Editar Servicio';
    document.getElementById('formAction').value = 'update';
    document.getElementById('serviceId').value = service.id;
    document.getElementById('name').value = service.name;
    document.getElementById('description').value = service.description;
    document.getElementById('is_active').value = service.is_active;
    document.getElementById('serviceModal').style.display = 'block';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('serviceModal');
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

.badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: #e0e7ff;
    color: #4f46e5;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
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
</style>

<?php include __DIR__ . '/includes/footer.php'; ?>
