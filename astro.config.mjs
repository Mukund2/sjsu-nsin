// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * Astro's built-in CSP hashes the inline `astro-island{display:contents}` <style>
 * block, which adds a sha256 source to `style-src`. Per the CSP spec, once a hash
 * is present, `'unsafe-inline'` is ignored — which silently blocks every runtime
 * React `style="..."` attribute (card heights, FadeIn opacity, etc.), collapsing
 * the layout. This integration strips the hashes from `style-src` only (leaving
 * `'unsafe-inline'` effective for the single harmless inline rule and all React
 * inline styles) while keeping `script-src` fully hashed and strict.
 */
function relaxStyleSrcCsp() {
  return {
    name: 'relax-style-src-csp',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const root = fileURLToPath(dir);
        const htmlFiles = (await readdir(root, { recursive: true })).filter((f) =>
          f.endsWith('.html'),
        );
        for (const rel of htmlFiles) {
          const path = `${root}/${rel}`;
          const html = await readFile(path, 'utf8');
          const fixed = html.replace(
            /style-src ([^;"]*)/g,
            (_match, sources) =>
              'style-src ' + sources.replace(/\s*'sha256-[^']*'/g, '').trim(),
          );
          if (fixed !== html) await writeFile(path, fixed);
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://sjsunsin.org',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [react(), relaxStyleSrcCsp()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
  },
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "form-action 'self' https://forms.gle https://docs.google.com",
        "img-src 'self' data: https:",
        "media-src 'self'",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self'",
        "frame-src 'none'",
        "worker-src 'self'",
        "manifest-src 'self'",
        "upgrade-insecure-requests",
      ],
      styleDirective: {
        resources: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      },
    },
  },
});
