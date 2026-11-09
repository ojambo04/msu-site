import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { cpSync, mkdirSync, watch, existsSync, rmSync } from 'fs'
import { exec } from 'child_process'

const msuRoot = resolve(import.meta.dirname, '../msu-content')
const contentSrc = resolve(import.meta.dirname, '../msu-content/content')
const contentDest = resolve(import.meta.dirname, 'public/msu-content/content')
const filesSrc = resolve(import.meta.dirname, '../msu-content/files')
const filesDest = resolve(import.meta.dirname, 'public/msu-content/files')
const imagesSrc = resolve(import.meta.dirname, '../msu-content/images')
const imagesDest = resolve(import.meta.dirname, 'public/msu-content/images')
const buildIndexScript = resolve(import.meta.dirname, '../scripts/build-index.js')

function rebuildIndex(callback) {
  if (!existsSync(buildIndexScript)) return callback?.()
  exec(`node "${buildIndexScript}"`, (err) => {
    if (err) console.error('[build-index] Error rebuilding index:', err)
    callback?.()
  })
}

/**
 * Syncs msu-content/ into msu-web/public/
 * - Rebuilds events and notices index.json
 * - Copies content/ (*.md, *.json) into public/content/
 * - Copies files/ into public/msu-content/files/
 * - Copies images/ into public/msu-content/images/
 * The dest paths mirror the repo structure so dev URLs match the paths stored
 * in markdown frontmatter (/msu-content/images/foo.jpg → served as-is by Vite).
 * Runs ONLY during `vite` (dev server). Disabled during `vite build`.
 */
function contentSyncPlugin() {
  let watcher = null
  let debounceTimer = null

  function sync(label) {
    try {
      if (!existsSync(msuRoot)) return

      rebuildIndex(() => {
        // 1. Copy markdown content & index.json from msu-content/content to public/msu-content/content
        if (existsSync(contentSrc)) {
          mkdirSync(contentDest, { recursive: true })
          cpSync(contentSrc, contentDest, { recursive: true, force: true })
        }

        // 2. Copy files (PDFs, docs) from msu-content/files to public/msu-content/files
        if (existsSync(filesSrc)) {
          mkdirSync(filesDest, { recursive: true })
          cpSync(filesSrc, filesDest, { recursive: true, force: true })
        }

        // 3. Copy images from msu-content/images to public/msu-content/images
        if (existsSync(imagesSrc)) {
          mkdirSync(imagesDest, { recursive: true })
          cpSync(imagesSrc, imagesDest, { recursive: true, force: true })
        }

        console.log(`\x1b[36m[content]\x1b[0m Synced msu-content (content, files, images)${label ? ` (${label})` : ''}`)
      })
    } catch (err) {
      console.error('[content] Sync error:', err)
    }
  }

  return {
    name: 'content-sync-plugin',
    apply: 'serve', // Only run during development server
    buildStart() {
      sync()
    },
    configureServer(server) {
      // Watch msu-content for changes in content, files, or images
      watcher = watch(msuRoot, { recursive: true }, (_, filename) => {
        if (!filename) return
        // Ignore auto-generated index.json — writing it would re-trigger this
        // watcher and cause an EBUSY lock conflict on Windows.
        if (filename.endsWith('index.json')) return
        // Debounce: rapid saves (e.g. editor auto-save) are collapsed into one sync.
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
          sync(filename)
          server.hot.send({ type: 'full-reload' })
        }, 200)
      })
    },
    buildEnd() {
      clearTimeout(debounceTimer)
      watcher?.close()
    },
  }
}

/**
 * Ensures msu-content files (content, files, images) are not included in dist/ at build time.
 */
function excludeContentFromDistPlugin() {
  return {
    name: 'exclude-content-from-dist-plugin',
    apply: 'build',
    closeBundle() {
      const dist = resolve(import.meta.dirname, 'dist')
      const foldersToRemove = ['msu-content']
      for (const folder of foldersToRemove) {
        const target = resolve(dist, folder)
        if (existsSync(target)) {
          rmSync(target, { recursive: true, force: true })
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Set VITE_BASE_URL=/repo-name/ in GitHub Actions for project pages (no custom domain).
  // Leave unset (defaults to /) when using a custom domain or Netlify.
  base: process.env.VITE_BASE_URL || '/',
  plugins: [contentSyncPlugin(), excludeContentFromDistPlugin(), react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})
