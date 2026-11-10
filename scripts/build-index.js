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
 * This script is also run automatically by GitHub Actions on every push to main
 * that touches msu-content/content/events/, msu-content/content/notices/,
 * msu-web/, scripts/, or the deploy workflow itself.
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

// Read header metadata from events.md, or an optional header.md, or use defaults.
let eventsHeader = {
  title: 'Events & Programs',
  subtitle: 'Join us in our upcoming activities, cultural programs, and academic meets. Explore our past events.',
};
const eventsHeaderPaths = [
  join(contentRoot, 'events.md'),
  join(eventsDir, 'header.md'),
];
for (const p of eventsHeaderPaths) {
  if (existsSync(p)) {
    const { data } = matter(readFileSync(p, 'utf-8'));
    if (data.header) {
      eventsHeader = data.header;
      break;
    }
  }
}

const allEvents = readEntries(eventsDir);

// Automatically compute event status (upcoming, ongoing, past) based on fromDate & toDate
const todayStr = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
allEvents.forEach(event => {
  const rawFrom = event.fromDate || event.date;
  const rawTo = event.toDate || rawFrom;

  // Sync date property for backwards compatibility
  if (!event.date && event.fromDate) {
    event.date = event.fromDate;
  }
  if (!event.fromDate && event.date) {
    event.fromDate = event.date;
  }

  const fromStr = String(rawFrom || '').trim();
  const toStr = String(rawTo || '').trim();

  if (/ongoing/i.test(fromStr) || /ongoing/i.test(toStr) || /academic year/i.test(fromStr)) {
    event.status = 'ongoing';
  } else if (/^\d{4}-\d{2}-\d{2}/.test(fromStr) || /^\d{4}-\d{2}-\d{2}/.test(toStr)) {
    const fromIso = fromStr.slice(0, 10);
    const toIso = toStr ? toStr.slice(0, 10) : fromIso;

    if (toIso < todayStr) {
      event.status = 'past';
    } else if (fromIso > todayStr) {
      event.status = 'upcoming';
    } else {
      event.status = 'ongoing';
    }
  }
});

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
const noticesHeaderPaths = [
  join(contentRoot, 'notices.md'),
  join(noticesDir, 'header.md'),
];
for (const p of noticesHeaderPaths) {
  if (existsSync(p)) {
    const { data } = matter(readFileSync(p, 'utf-8'));
    if (data.header) {
      noticesHeader = data.header;
      break;
    }
  }
}

const allNotices = readEntries(noticesDir);

writeIndex(join(noticesDir, 'index.json'), {
  header: noticesHeader,
  notices: allNotices,
});

console.log('[build-index] Done.');

