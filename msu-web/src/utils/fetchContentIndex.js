const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/ojambo04/msu-site/main/msu-content/content';

/**
 * Returns the URL for a content index file or an individual entry MD file.
 *
 * - Development : served from public/content/ (auto-copied by Vite plugin)
 * - Production  : fetched from GitHub raw (no rebuild needed for content updates)
 *
 * @param {string} path  e.g. "events/index.json" or "events/2026-08-14-literary-meet.md"
 */
const getContentUrl = (path) => {
  if (import.meta.env.PROD) {
    return `${GITHUB_RAW_BASE}/${path}`;
  }
  return `/content/${path}`;
};

/**
 * Fetches a pre-built index.json for a content section.
 * Returns the parsed JSON object, or an empty object on error.
 *
 * @param {string} section  "events" | "notices"
 */
export const fetchContentIndex = async (section) => {
  try {
    const url = getContentUrl(`${section}/index.json`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${section}/index.json: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error('[fetchContentIndex]', err);
    return {};
  }
};

