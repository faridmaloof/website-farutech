<?php
/**
 * Admin Panel - Gestión de Información de Contacto
 * Formulario único para editar los datos de contacto de FaruTech
 */

require_once __DIR__ . '/config.php';
require_auth();

$pageTitle = 'Información de Contacto';
include __DIR__ . '/includes/header.php';

$pdo = db();
$message = '';
$messageType = '';

// Get current contact info (single row)
$stmt = $pdo->query("SELECT * FROM contact_info LIMIT 1");
$contact = $stmt->fetch(PDO::FETCH_ASSOC);

// If no record exists, create one
if (!$contact) {
    $pdo->exec("INSERT INTO contact_info (phone, email, address, social_links) VALUES ('', '', '', '{}')");
    $stmt = $pdo->query("SELECT * FROM contact_info LIMIT 1");
    $contact = $stmt->fetch(PDO::FETCH_ASSOC);
}

// Decode social links JSON
$socialLinks = json_decode($contact['social_links'] ?? '{}', true) ?? [];

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify($_POST['csrf_token'] ?? '')) {
        $message = 'Error de validación CSRF';
        $messageType = 'error';
    } else {
        $phone = trim($_POST['phone'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $address = trim($_POST['address'] ?? '');
        
        // Build social links array
        $socialLinks = [
            'linkedin' => trim($_POST['social_linkedin'] ?? ''),
            'github' => trim($_POST['social_github'] ?? ''),
            'twitter' => trim($_POST['social_twitter'] ?? ''),
            'facebook' => trim($_POST['social_facebook'] ?? ''),
            'instagram' => trim($_POST['social_instagram'] ?? ''),
            'youtube' => trim($_POST['social_youtube'] ?? '')
        ];
        
        // Remove empty values
        $socialLinks = array_filter($socialLinks, function($v) { return $v !== ''; });
        
        $socialJson = json_encode($socialLinks, JSON_UNESCAPED_SLASHES);
        
        // Validate email format
        if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $message = 'El formato del email no es válido';
            $messageType = 'error';
        } else {
            // Update the single contact record
            $stmt = $pdo->prepare("UPDATE contact_info SET phone=?, email=?, address=?, social_links=? WHERE id=?");
            $stmt->execute([$phone, $email, $address, $socialJson, $contact['id']]);
            
            $message = 'Información de contacto actualizada exitosamente';
            $messageType = 'success';
            
            // Refresh contact data
            $stmt = $pdo->query("SELECT * FROM contact_info LIMIT 1");
            $contact = $stmt->fetch(PDO::FETCH_ASSOC);
            $socialLinks = json_decode($contact['social_links'] ?? '{}', true) ?? [];
        }
    }
}
?>

<?php if ($message): ?>
<div class="alert alert-<?= $messageType ?>">
    <?= e($message) ?>
</div>
<?php endif; ?>

<div class="grid cols-2">
    <div class="card">
        <h2>Datos de Contacto</h2>
        <p class="sub">Información que se mostrará en el sitio web.</p>
        
        <form method="POST">
            <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">
            
            <div class="form-group">
                <label for="phone">Teléfono</label>
                <input type="tel" name="phone" id="phone" class="form-control" 
                       value="<?= e($contact['phone'] ?? '') ?>" 
                       placeholder="+57 (1) 000 0000">
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" 
                       value="<?= e($contact['email'] ?? '') ?>" 
                       placeholder="contacto@farutech.com">
            </div>
            
            <div class="form-group">
                <label for="address">Dirección / Ubicación</label>
                <input type="text" name="address" id="address" class="form-control" 
                       value="<?= e($contact['address'] ?? '') ?>" 
                       placeholder="Bogotá · Cali · Remoto">
            </div>
            
            <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid var(--border);">
            
            <h3 style="font-size: 1rem; margin-bottom: 1rem;">Redes Sociales</h3>
            
            <div class="form-group">
                <label for="social_linkedin">LinkedIn</label>
                <input type="url" name="social_linkedin" id="social_linkedin" class="form-control" 
                       value="<?= e($socialLinks['linkedin'] ?? '') ?>" 
                       placeholder="https://linkedin.com/company/farutech">
            </div>
            
            <div class="form-group">
                <label for="social_github">GitHub</label>
                <input type="url" name="social_github" id="social_github" class="form-control" 
                       value="<?= e($socialLinks['github'] ?? '') ?>" 
                       placeholder="https://github.com/farutech">
            </div>
            
            <div class="form-group">
                <label for="social_twitter">Twitter / X</label>
                <input type="url" name="social_twitter" id="social_twitter" class="form-control" 
                       value="<?= e($socialLinks['twitter'] ?? '') ?>" 
                       placeholder="https://twitter.com/farutech">
            </div>
            
            <div class="form-group">
                <label for="social_facebook">Facebook</label>
                <input type="url" name="social_facebook" id="social_facebook" class="form-control" 
                       value="<?= e($socialLinks['facebook'] ?? '') ?>" 
                       placeholder="https://facebook.com/farutech">
            </div>
            
            <div class="form-group">
                <label for="social_instagram">Instagram</label>
                <input type="url" name="social_instagram" id="social_instagram" class="form-control" 
                       value="<?= e($socialLinks['instagram'] ?? '') ?>" 
                       placeholder="https://instagram.com/farutech">
            </div>
            
            <div class="form-group">
                <label for="social_youtube">YouTube</label>
                <input type="url" name="social_youtube" id="social_youtube" class="form-control" 
                       value="<?= e($socialLinks['youtube'] ?? '') ?>" 
                       placeholder="https://youtube.com/@farutech">
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <i class="ti ti-check"></i> Guardar Cambios
                </button>
            </div>
        </form>
    </div>
    
    <div class="card">
        <h2>Vista Previa</h2>
        <p class="sub">Cómo se verá la información en el frontend.</p>
        
        <div class="preview-box">
            <div class="preview-item">
                <i class="ti ti-phone"></i>
                <span><?= $contact['phone'] ? e($contact['phone']) : '<em style="color: #94a3b8">No especificado</em>' ?></span>
            </div>
            
            <div class="preview-item">
                <i class="ti ti-mail"></i>
                <span><?= $contact['email'] ? e($contact['email']) : '<em style="color: #94a3b8">No especificado</em>' ?></span>
            </div>
            
            <div class="preview-item">
                <i class="ti ti-map-pin"></i>
                <span><?= $contact['address'] ? e($contact['address']) : '<em style="color: #94a3b8">No especificado</em>' ?></span>
            </div>
            
            <?php if (!empty($socialLinks)): ?>
            <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--border);">
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <?php if (!empty($socialLinks['linkedin'])): ?>
                <a href="<?= e($socialLinks['linkedin']) ?>" target="_blank" class="social-preview">
                    <i class="ti ti-brand-linkedin"></i> LinkedIn
                </a>
                <?php endif; ?>
                
                <?php if (!empty($socialLinks['github'])): ?>
                <a href="<?= e($socialLinks['github']) ?>" target="_blank" class="social-preview">
                    <i class="ti ti-brand-github"></i> GitHub
                </a>
                <?php endif; ?>
                
                <?php if (!empty($socialLinks['twitter'])): ?>
                <a href="<?= e($socialLinks['twitter']) ?>" target="_blank" class="social-preview">
                    <i class="ti ti-brand-twitter"></i> Twitter
                </a>
                <?php endif; ?>
                
                <?php if (!empty($socialLinks['facebook'])): ?>
                <a href="<?= e($socialLinks['facebook']) ?>" target="_blank" class="social-preview">
                    <i class="ti ti-brand-facebook"></i> Facebook
                </a>
                <?php endif; ?>
                
                <?php if (!empty($socialLinks['instagram'])): ?>
                <a href="<?= e($socialLinks['instagram']) ?>" target="_blank" class="social-preview">
                    <i class="ti ti-brand-instagram"></i> Instagram
                </a>
                <?php endif; ?>
                
                <?php if (!empty($socialLinks['youtube'])): ?>
                <a href="<?= e($socialLinks['youtube']) ?>" target="_blank" class="social-preview">
                    <i class="ti ti-brand-youtube"></i> YouTube
                </a>
                <?php endif; ?>
            </div>
            <?php endif; ?>
        </div>
        
        <div class="info-box" style="margin-top: 1.5rem; padding: 1rem; background: #f1f5f9; border-radius: 8px; font-size: 0.875rem; color: #475569;">
            <i class="ti ti-info-circle"></i>
            <strong>Nota:</strong> Esta información es utilizada por la API REST para alimentar el frontend de React. Los cambios se reflejarán inmediatamente después de guardar.
        </div>
    </div>
</div>

<style>
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

.form-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
}

.preview-box {
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px dashed #cbd5e1;
}

.preview-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    font-size: 1rem;
}

.preview-item i {
    color: #3FC1FF;
    font-size: 1.25rem;
}

.social-preview {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    color: #475569;
    font-size: 0.875rem;
    text-decoration: none;
    transition: all 0.2s;
}

.social-preview:hover {
    background: #f1f5f9;
    border-color: #3FC1FF;
    color: #3FC1FF;
}

.social-preview i {
    font-size: 1.125rem;
}

.info-box {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
}

.info-box i {
    color: #3FC1FF;
    font-size: 1.25rem;
    flex-shrink: 0;
}

hr {
    border: none;
    border-top: 1px solid var(--border);
}

h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 1rem 0;
}

@media (max-width: 767px) {
    .grid.cols-2 {
        grid-template-columns: 1fr;
    }
}
</style>

<?php include __DIR__ . '/includes/footer.php'; ?>
