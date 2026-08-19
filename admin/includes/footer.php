<?php
/** Admin Footer — cierra la estructura y añade el script del menú móvil. */
?>
    </div><!-- /.page -->
  </main>
</div><!-- /.admin-shell -->
<script>
  const toggle = document.getElementById('menuToggle');
  const shell = document.querySelector('.admin-shell');
  if (toggle) toggle.addEventListener('click', () => shell.classList.toggle('nav-open'));
</script>
</body>
</html>
