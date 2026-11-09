const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/ojambo04/msu-site/main';

/**
 * Returns the URL for a content index file or an individual entry MD file.
 *
 * The path matches the repo structure (msu-content/content/...) so:
 * - Development : Vite serves /msu-content/content/ from public/msu-content/content/
 * - Production  : prepend GitHub raw base to get the full raw URL
 *
 * @param {string} path  e.g. "events/index.json" or "events/2026-08-14-literary-meet.md"
 */
const getContentUrl = (path) => {
  if (import.meta.env.PROD) {
    return `${GITHUB_RAW_BASE}/msu-content/content/${path}`;
  }
  return `/msu-content/content/${path}`;
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
