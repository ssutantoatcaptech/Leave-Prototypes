import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, '..', 'dist');
const base = process.env.VITE_BASE || '/';

// Create a 404.html that routes to the correct SPA based on path
const fallbackHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting…</title>
    <script>
      (function() {
        var base = '${base}';
        var path = window.location.pathname;
        // Strip the base prefix
        var relative = path.indexOf(base) === 0 ? path.slice(base.length) : path;

        if (relative.indexOf('manager-portal') === 0) {
          // Route to manager portal SPA
          window.location.replace(base + 'manager-portal/index.html?p=' + encodeURIComponent(relative.slice('manager-portal/'.length)) + window.location.hash);
        } else {
          // Route to main SPA
          window.location.replace(base + '?p=' + encodeURIComponent(relative) + window.location.hash);
        }
      })();
    </script>
  </head>
  <body></body>
</html>`;

writeFileSync(resolve(dist, '404.html'), fallbackHtml);

// Copy manager-portal/index.html as its own 404.html for direct sub-path serving
copyFileSync(
  resolve(dist, 'manager-portal', 'index.html'),
  resolve(dist, 'manager-portal', '404.html')
);

console.log('Post-build: Created 404.html and manager-portal/404.html');
