/**
 * Extracts 1-2 letter initials from a person's name.
 * Automatically ignores common honorifics/titles (Mr., Ms., Mrs., Dr., Shri, etc.)
 *
 * Examples:
 * - "Mr. P. Daili"       -> "PD"
 * - "Mr. A. Lokho"       -> "AL"
 * - "Mr. Shuli Chakre"   -> "SC"
 * - "Ms. Ashihrii Athine"-> "AA"
 * - "Alexander"          -> "AL"
 *
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '?';

  const titles = new Set(['mr', 'mrs', 'ms', 'dr', 'prof', 'shri', 'smt', 'rev']);

  const words = name
    .trim()
    .split(/\s+/)
    .map(w => w.replace(/[^a-zA-Z]/g, ''))
    .filter(Boolean);

  const filtered = words.filter((w, idx) => {
    if (idx === 0 && titles.has(w.toLowerCase())) return false;
    return true;
  });

  const targets = filtered.length > 0 ? filtered : words;

  if (targets.length === 0) return '?';
  if (targets.length === 1) {
    return targets[0].slice(0, 2).toUpperCase();
  }

  return (targets[0][0] + targets[targets.length - 1][0]).toUpperCase();
};

