#!/usr/bin/env node
/**
 * build-index.js
 *
 * Scans msu-content/content/events/ and msu-content/content/notices/ for
 * individual .md files, extracts their frontmatter, and writes index.json
 * into each directory. Run this script whenever new entries are added.
 *
 * Usage:
 *   node scripts/build-index.js
 *
 * This script is also run automatically by GitHub Actions on every push
 * that touches msu-content/content/events/ or msu-content/content/notices/.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot   = join(__dirname, '..');
const contentRoot = join(repoRoot, 'msu-content', 'content');

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Read all .md files in a directory (non-recursive) and return parsed entries.
 * Files named "header.md" or starting with "_" are skipped.
 */
function readEntries(dir) {
  if (!existsSync(dir)) {
    console.warn(`[build-index] Directory not found, skipping: ${dir}`);
    return [];
  }

  return readdirSync(dir)
    .filter(f => f.endsWith('.md') && !f.startsWith('_') && f !== 'header.md')
    .map(filename => {
      const slug = basename(filename, '.md');
      const raw  = readFileSync(join(dir, filename), 'utf-8');
      const { data, content } = matter(raw);
      const hasBody = Boolean(content && content.trim().length > 0);
      return { slug, hasBody, ...data };
    })
    .sort((a, b) => {
      // Sort by date descending (ISO dates sort lexicographically).
      // Non-ISO dates (e.g. "Ongoing") go to the bottom.
      const da = a.date || '';
      const db = b.date || '';
      if (da > db) return -1;
      if (da < db) return  1;
      return 0;
    });
}

/**
 * Write a JSON index file and log the result.
 */
function writeIndex(filepath, data) {
  writeFileSync(filepath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`[build-index] ✓ Wrote ${filepath.replace(repoRoot, '').replace(/\\/g, '/')}`);
}

// ─── Events ─────────────────────────────────────────────────────────────────

const eventsDir = join(contentRoot, 'events');

// Read header metadata from an optional header.md, or use defaults.
let eventsHeader = {
  title: 'Events & Programs',
  subtitle: 'Join us in our upcoming activities, cultural programs, and academic meets. Explore our past events.',
};
const eventsHeaderPath = join(eventsDir, 'header.md');
if (existsSync(eventsHeaderPath)) {
  const { data } = matter(readFileSync(eventsHeaderPath, 'utf-8'));
  if (data.header) eventsHeader = data.header;
}

const allEvents = readEntries(eventsDir);

writeIndex(join(eventsDir, 'index.json'), {
  header: eventsHeader,
  events: allEvents,
});

// ─── Notices ─────────────────────────────────────────────────────────────────

const noticesDir = join(contentRoot, 'notices');

let noticesHeader = {
  tag: 'OFFICIAL PRESS & ANNOUNCEMENT HUB',
  title: 'Notice and Press Releases',
  subtitle:
    'Verify official circulars, download press kits, access event schedules, and stay informed on scholarship notifications.',
};
const noticesHeaderPath = join(noticesDir, 'header.md');
if (existsSync(noticesHeaderPath)) {
  const { data } = matter(readFileSync(noticesHeaderPath, 'utf-8'));
  if (data.header) noticesHeader = data.header;
}

const allNotices = readEntries(noticesDir);

writeIndex(join(noticesDir, 'index.json'), {
  header: noticesHeader,
  notices: allNotices,
});

console.log('[build-index] Done.');

