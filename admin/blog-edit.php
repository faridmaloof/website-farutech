<?php
/**
 * Admin Panel - Editor de Blog con Tiptap WYSIWYG
 * Creación y edición de posts del blog
 */

require_once __DIR__ . '/config.php';
require_auth();

$pdo = db();
$postId = isset($_GET['id']) ? (int)$_GET['id'] : null;
$isEdit = $postId !== null;
$message = '';
$messageType = '';

// Get current post data if editing
if ($isEdit) {
    $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
    $stmt->execute([$postId]);
    $post = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$post) {
        header('Location: /admin/blog.php?error=post_not_found');
        exit;
    }
} else {
    $post = [
        'title' => '',
        'slug' => '',
        'excerpt' => '',
        'content_html' => '',
        'meta_title' => '',
        'meta_description' => '',
        'meta_keywords' => '',
        'featured_image' => '',
        'category_id' => 0,
        'status' => 'draft'
    ];
}

// Get categories
$categories = $pdo->query("SELECT id, name FROM blog_categories ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify($_POST['csrf_token'] ?? '')) {
        $message = 'Error de validación CSRF';
        $messageType = 'error';
    } else {
        $title = trim($_POST['title'] ?? '');
        $slug = trim($_POST['slug'] ?? '') ?: slugify($title);
        $excerpt = trim($_POST['excerpt'] ?? '');
        $contentHtml = $_POST['content_html'] ?? ''; // HTML from Tiptap
        $metaTitle = trim($_POST['meta_title'] ?? '');
        $metaDescription = trim($_POST['meta_description'] ?? '');
        $metaKeywords = trim($_POST['meta_keywords'] ?? '');
        $featuredImage = trim($_POST['featured_image'] ?? '');
        $categoryId = (int)($_POST['category_id'] ?? 0);
        $status = $_POST['status'] ?? 'draft';
        
        // Validation
        if ($title === '') {
            $message = 'El título es obligatorio';
            $messageType = 'error';
        } elseif (strlen($title) > 255) {
            $message = 'El título no puede exceder 255 caracteres';
            $messageType = 'error';
        } else {
            // Generate published_at timestamp if publishing
            $publishedAt = null;
            if ($status === 'published' && (!$isEdit || $post['status'] === 'draft')) {
                $publishedAt = date('Y-m-d H:i:s');
            }
            
            if ($isEdit) {
                // Update existing post
                $stmt = $pdo->prepare("
                    UPDATE blog_posts SET 
                        title = ?, slug = ?, excerpt = ?, content_html = ?,
                        meta_title = ?, meta_description = ?, meta_keywords = ?,
                        featured_image = ?, category_id = ?, status = ?,
                        admin_user_id = ?, published_at = COALESCE(published_at, ?)
                    WHERE id = ?
                ");
                $stmt->execute([
                    $title, $slug, $excerpt, $contentHtml,
                    $metaTitle, $metaDescription, $metaKeywords,
                    $featuredImage, $categoryId, $status,
                    $_SESSION['admin_user_id'], $publishedAt,
                    $postId
                ]);
                $message = 'Post actualizado exitosamente';
                $messageType = 'success';
                
                // Refresh post data
                $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
                $stmt->execute([$postId]);
                $post = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                // Create new post
                $stmt = $pdo->prepare("
                    INSERT INTO blog_posts 
                    (title, slug, excerpt, content_html, meta_title, meta_description, meta_keywords,
                     featured_image, category_id, status, admin_user_id, published_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $title, $slug, $excerpt, $contentHtml,
                    $metaTitle, $metaDescription, $metaKeywords,
                    $featuredImage, $categoryId, $status,
                    $_SESSION['admin_user_id'], $publishedAt
                ]);
                $postId = $pdo->lastInsertId();
                $message = 'Post creado exitosamente';
                $messageType = 'success';
                
                // Redirect to edit page
                header('Location: /admin/blog-edit.php?id=' . $postId . '&created=1');
                exit;
            }
        }
    }
}
?>

<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title><?= e($isEdit ? 'Editar Post' : 'Nuevo Post') ?> · FaruTech Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/admin/assets/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.40.0/tabler-icons.min.js"></script>

<!-- Tiptap Editor -->
<script src="https://unpkg.com/@tiptap/core@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/starter-kit@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/extension-link@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/extension-image@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/extension-table@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/extension-table-row@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/extension-table-cell@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/extension-table-header@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/extension-underline@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/extension-text-align@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/extension-highlight@2.0.3/dist/index.umd.js"></script>
<script src="https://unpkg.com/@tiptap/extension-character-count@2.0.3/dist/index.umd.js"></script>

<style>
.editor-container {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

.editor-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 8px;
    background: #f8fafc;
    border-bottom: 1px solid #ddd;
}

.editor-toolbar button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid transparent;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    color: #475569;
    transition: all 0.2s;
}

.editor-toolbar button:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
}

.editor-toolbar button.is-active {
    background: #3FC1FF;
    color: white;
    border-color: #3FC1FF;
}

.editor-toolbar button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.editor-toolbar .divider {
    width: 1px;
    height: 24px;
    background: #e2e8f0;
    margin: 0 4px;
}

.editor-toolbar select {
    height: 32px;
    padding: 0 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    font-size: 0.875rem;
}

.editor-content {
    min-height: 400px;
    max-height: 600px;
    overflow-y: auto;
    padding: 1rem;
}

.editor-content .ProseMirror {
    outline: none;
    min-height: 300px;
}

.editor-content .ProseMirror p {
    margin-bottom: 1rem;
}

.editor-content .ProseMirror h1,
.editor-content .ProseMirror h2,
.editor-content .ProseMirror h3,
.editor-content .ProseMirror h4,
.editor-content .ProseMirror h5,
.editor-content .ProseMirror h6 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.editor-content .ProseMirror ul,
.editor-content .ProseMirror ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
}

.editor-content .ProseMirror table {
    border-collapse: collapse;
    margin: 1rem 0;
    width: 100%;
}

.editor-content .ProseMirror td,
.editor-content .ProseMirror th {
    border: 1px solid #ddd;
    padding: 8px 12px;
}

.editor-content .ProseMirror img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 1rem 0;
}

.editor-content .ProseMirror a {
    color: #3FC1FF;
    text-decoration: underline;
}

.char-count {
    text-align: right;
    padding: 8px 1rem;
    background: #f8fafc;
    border-top: 1px solid #ddd;
    font-size: 0.75rem;
    color: #64748b;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

@media (max-width: 767px) {
    .editor-toolbar {
        justify-content: center;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
}
</style>
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
      <h1><?= e($isEdit ? 'Editar Post' : 'Nuevo Post') ?></h1>
      <span class="user"><?= e($_SESSION['admin_name'] ?? 'Admin') ?></span>
    </header>
    <div class="page">

<?php if ($message): ?>
<div class="alert alert-<?= $messageType ?>">
    <?= e($message) ?>
</div>
<?php endif; ?>

<form method="POST" id="blogForm">
    <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">
    
    <div class="grid cols-3" style="gap: 1.5rem;">
        <!-- Main Content -->
        <div class="card" style="grid-column: span 2;">
            <div class="form-group">
                <label for="title">Título *</label>
                <input type="text" name="title" id="title" class="form-control" 
                       value="<?= e($post['title']) ?>" required maxlength="255" 
                       placeholder="Escribe el título del post">
            </div>
            
            <div class="form-group">
                <label for="slug">Slug (URL amigable)</label>
                <input type="text" name="slug" id="slug" class="form-control" 
                       value="<?= e($post['slug']) ?>" maxlength="255" 
                       placeholder="titulo-del-post">
                <small style="color: #64748b; font-size: 0.75rem;">Se genera automáticamente si se deja vacío</small>
            </div>
            
            <div class="form-group">
                <label for="excerpt">Extracto / Resumen</label>
                <textarea name="excerpt" id="excerpt" class="form-control" rows="3" 
                          maxlength="500" placeholder="Breve descripción del post (para SEO y vistas previas)"><?= e($post['excerpt']) ?></textarea>
                <small style="color: #64748b; font-size: 0.75rem;">Máximo 500 caracteres</small>
            </div>
            
            <div class="form-group">
                <label>Contenido</label>
                <div class="editor-container">
                    <div class="editor-toolbar" id="toolbar">
                        <select id="headingSelect">
                            <option value="paragraph">Párrafo</option>
                            <option value="h1">Encabezado 1</option>
                            <option value="h2">Encabezado 2</option>
                            <option value="h3">Encabezado 3</option>
                            <option value="h4">Encabezado 4</option>
                        </select>
                        
                        <div class="divider"></div>
                        
                        <button type="button" data-action="bold" title="Negrita"><i class="ti ti-bold"></i></button>
                        <button type="button" data-action="italic" title="Cursiva"><i class="ti ti-italic"></i></button>
                        <button type="button" data-action="underline" title="Subrayado"><i class="ti ti-underline"></i></button>
                        <button type="button" data-action="strike" title="Tachado"><i class="ti ti-strikethrough"></i></button>
                        <button type="button" data-action="highlight" title="Resaltado"><i class="ti ti-highlighter"></i></button>
                        
                        <div class="divider"></div>
                        
                        <button type="button" data-action="unorderedList" title="Lista"><i class="ti ti-list"></i></button>
                        <button type="button" data-action="orderedList" title="Lista numerada"><i class="ti ti-list-numbers"></i></button>
                        
                        <div class="divider"></div>
                        
                        <button type="button" data-action="alignLeft" title="Alinear izquierda"><i class="ti ti-align-left"></i></button>
                        <button type="button" data-action="alignCenter" title="Centrar"><i class="ti ti-align-center"></i></button>
                        <button type="button" data-action="alignRight" title="Alinear derecha"><i class="ti ti-align-right"></i></button>
                        
                        <div class="divider"></div>
                        
                        <button type="button" data-action="link" title="Enlace"><i class="ti ti-link"></i></button>
                        <button type="button" data-action="image" title="Imagen"><i class="ti ti-photo"></i></button>
                        
                        <div class="divider"></div>
                        
                        <button type="button" data-action="insertTable" title="Tabla"><i class="ti ti-table"></i></button>
                        <button type="button" data-action="deleteTable" title="Eliminar tabla"><i class="ti ti-table-off"></i></button>
                        
                        <div class="divider"></div>
                        
                        <button type="button" data-action="undo" title="Deshacer"><i class="ti ti-undo"></i></button>
                        <button type="button" data-action="redo" title="Rehacer"><i class="ti ti-redo"></i></button>
                    </div>
                    
                    <div class="editor-content">
                        <div id="editor" class="ProseMirror"><?= $post['content_html'] ?></div>
                    </div>
                    
                    <div class="char-count">
                        <span id="charCount">0</span> caracteres
                    </div>
                </div>
                <input type="hidden" name="content_html" id="contentHtml" value="<?= e($post['content_html']) ?>">
            </div>
        </div>
        
        <!-- Sidebar -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="card">
                <h3 style="margin-bottom: 1rem; font-size: 1rem;">Publicación</h3>
                
                <div class="form-group">
                    <label for="status">Estado</label>
                    <select name="status" id="status" class="form-control">
                        <option value="draft" <?= $post['status'] === 'draft' ? 'selected' : '' ?>>Borrador</option>
                        <option value="published" <?= $post['status'] === 'published' ? 'selected' : '' ?>>Publicado</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="category_id">Categoría</label>
                    <select name="category_id" id="category_id" class="form-control">
                        <option value="0">Sin categoría</option>
                        <?php foreach ($categories as $cat): ?>
                            <option value="<?= $cat['id'] ?>" <?= $post['category_id'] == $cat['id'] ? 'selected' : '' ?>>
                                <?= e($cat['name']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                
                <div class="form-actions" style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
                    <button type="submit" class="btn btn-primary block">
                        <i class="ti ti-check"></i> <?= $isEdit ? 'Actualizar' : 'Crear' ?> Post
                    </button>
                    <a href="/admin/blog.php" class="btn btn-secondary block">
                        <i class="ti ti-arrow-left"></i> Volver al Listado
                    </a>
                </div>
            </div>
            
            <div class="card">
                <h3 style="margin-bottom: 1rem; font-size: 1rem;">SEO</h3>
                
                <div class="form-group">
                    <label for="meta_title">Meta Título</label>
                    <input type="text" name="meta_title" id="meta_title" class="form-control" 
                           value="<?= e($post['meta_title']) ?>" maxlength="255" 
                           placeholder="Título para motores de búsqueda">
                    <small style="color: #64748b; font-size: 0.75rem;">Recomendado: 50-60 caracteres</small>
                </div>
                
                <div class="form-group">
                    <label for="meta_description">Meta Descripción</label>
                    <textarea name="meta_description" id="meta_description" class="form-control" rows="3" 
                              maxlength="500" placeholder="Descripción para resultados de búsqueda"><?= e($post['meta_description']) ?></textarea>
                    <small style="color: #64748b; font-size: 0.75rem;">Recomendado: 150-160 caracteres</small>
                </div>
                
                <div class="form-group">
                    <label for="meta_keywords">Meta Keywords</label>
                    <input type="text" name="meta_keywords" id="meta_keywords" class="form-control" 
                           value="<?= e($post['meta_keywords']) ?>" maxlength="500" 
                           placeholder="palabra1, palabra2, palabra3">
                    <small style="color: #64748b; font-size: 0.75rem;">Separadas por comas</small>
                </div>
            </div>
            
            <div class="card">
                <h3 style="margin-bottom: 1rem; font-size: 1rem;">Imagen Destacada</h3>
                
                <div class="form-group">
                    <label for="featured_image">URL de la imagen</label>
                    <input type="url" name="featured_image" id="featured_image" class="form-control" 
                           value="<?= e($post['featured_image']) ?>" 
                           placeholder="https://ejemplo.com/imagen.jpg">
                </div>
                
                <?php if ($post['featured_image']): ?>
                <div style="margin-top: 1rem;">
                    <img src="<?= e($post['featured_image']) ?>" alt="Vista previa" 
                         style="width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;">
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</form>

</div>
</main>
</div>

<script>
// Initialize Tiptap editor
let editor;

document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('editor').innerHTML;
    
    editor = new Tiptap.Editor({
        element: document.querySelector('#editor'),
        extensions: [
            TiptapStarterKit.StarterKit.configure({
                heading: { levels: [1, 2, 3, 4] },
                table: false,
            }),
            TiptapExtensionLink.Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank'
                }
            }),
            TiptapExtensionImage.Image.configure({
                HTMLAttributes: {
                    class: 'rounded'
                }
            }),
            TiptapExtensionTable.Table.configure({
                resizable: true
            }),
            TiptapExtensionTableRow.TableRow,
            TiptapExtensionTableCell.TableCell,
            TiptapExtensionTableHeader.TableHeader,
            TiptapExtensionUnderline.Underline,
            TiptapExtensionTextAlign.TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TiptapExtensionHighlight.Highlight,
            TiptapExtensionCharacterCount.CharacterCount
        ],
        content: content,
        onUpdate: function() {
            const html = editor.getHTML();
            document.getElementById('contentHtml').value = html;
            
            const charCount = editor.storage.characterCount.characters();
            document.getElementById('charCount').textContent = charCount;
        }
    });
    
    // Toolbar buttons
    document.querySelectorAll('.editor-toolbar button[data-action]').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            
            switch(action) {
                case 'bold':
                    editor.chain().focus().toggleBold().run();
                    break;
                case 'italic':
                    editor.chain().focus().toggleItalic().run();
                    break;
                case 'underline':
                    editor.chain().focus().toggleUnderline().run();
                    break;
                case 'strike':
                    editor.chain().focus().toggleStrike().run();
                    break;
                case 'highlight':
                    editor.chain().focus().toggleHighlight().run();
                    break;
                case 'unorderedList':
                    editor.chain().focus().toggleBulletList().run();
                    break;
                case 'orderedList':
                    editor.chain().focus().toggleOrderedList().run();
                    break;
                case 'alignLeft':
                    editor.chain().focus().setTextAlign('left').run();
                    break;
                case 'alignCenter':
                    editor.chain().focus().setTextAlign('center').run();
                    break;
                case 'alignRight':
                    editor.chain().focus().setTextAlign('right').run();
                    break;
                case 'link':
                    const url = prompt('Ingrese la URL del enlace:');
                    if (url) {
                        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                    }
                    break;
                case 'image':
                    const imageUrl = prompt('Ingrese la URL de la imagen:');
                    if (imageUrl) {
                        editor.chain().focus().setImage({ src: imageUrl }).run();
                    }
                    break;
                case 'insertTable':
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
                    break;
                case 'deleteTable':
                    editor.chain().focus().deleteTable().run();
                    break;
                case 'undo':
                    editor.chain().focus().undo().run();
                    break;
                case 'redo':
                    editor.chain().focus().redo().run();
                    break;
            }
        });
    });
    
    // Heading selector
    document.getElementById('headingSelect').addEventListener('change', function() {
        const value = this.value;
        if (value === 'paragraph') {
            editor.chain().focus().setParagraph().run();
        } else {
            editor.chain().focus().toggleHeading({ level: parseInt(value.replace('h', '')) }).run();
        }
    });
    
    // Update toolbar state on selection change
    editor.on('selectionUpdate', function() {
        document.querySelectorAll('.editor-toolbar button[data-action]').forEach(button => {
            const action = button.dataset.action;
            let isActive = false;
            
            switch(action) {
                case 'bold':
                    isActive = editor.isActive('bold');
                    break;
                case 'italic':
                    isActive = editor.isActive('italic');
                    break;
                case 'underline':
                    isActive = editor.isActive('underline');
                    break;
                case 'strike':
                    isActive = editor.isActive('strike');
                    break;
                case 'highlight':
                    isActive = editor.isActive('highlight');
                    break;
                case 'unorderedList':
                    isActive = editor.isActive('bulletList');
                    break;
                case 'orderedList':
                    isActive = editor.isActive('orderedList');
                    break;
            }
            
            if (isActive) {
                button.classList.add('is-active');
            } else {
                button.classList.remove('is-active');
            }
        });
        
        // Update heading selector
        const headingSelect = document.getElementById('headingSelect');
        if (editor.isActive('heading', { level: 1 })) {
            headingSelect.value = 'h1';
        } else if (editor.isActive('heading', { level: 2 })) {
            headingSelect.value = 'h2';
        } else if (editor.isActive('heading', { level: 3 })) {
            headingSelect.value = 'h3';
        } else if (editor.isActive('heading', { level: 4 })) {
            headingSelect.value = 'h4';
        } else {
            headingSelect.value = 'paragraph';
        }
    });
    
    // Auto-generate slug from title
    document.getElementById('title').addEventListener('input', function() {
        const slugInput = document.getElementById('slug');
        if (!slugInput.value || slugInput.value === slugify(document.getElementById('title').dataset.previous)) {
            slugInput.value = slugify(this.value);
        }
        this.dataset.previous = this.value;
    });
    
    // Store initial title for slug generation
    document.getElementById('title').dataset.previous = document.getElementById('title').value;
});

// Slugify function
function slugify(text) {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

// Menu toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('open');
});
</script>

<style>
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

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
}

.btn-primary {
    background: #3FC1FF;
    color: white;
}

.btn-primary:hover {
    background: #2ab0f0;
}

.btn-secondary {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
    background: #e2e8f0;
}

.block {
    width: 100%;
}

.form-actions {
    display: flex;
    gap: 0.5rem;
}

.card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
}

.grid {
    display: grid;
}

.cols-3 {
    grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 1024px) {
    .cols-3 {
        grid-template-columns: 1fr;
    }
    
    .card[style*="grid-column: span 2"] {
        grid-column: auto !important;
    }
}
</style>

<script>
// Mobile menu toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('open');
});
</script>

</body>
</html>
