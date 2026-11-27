/**
 * Extracts a YouTube video or playlist ID from a raw ID or full YouTube URL
 * and returns a valid YouTube embed URL, or null if invalid/empty.
 *
 * Supported inputs:
 * - Plain video ID: "Q-qFYqqjF3s"
 * - Watch URL: "https://www.youtube.com/watch?v=Q-qFYqqjF3s"
 * - Short URL: "https://youtu.be/Q-qFYqqjF3s?si=..."
 * - Live URL: "https://www.youtube.com/live/Q-qFYqqjF3s?si=..."
 * - Shorts URL: "https://www.youtube.com/shorts/Q-qFYqqjF3s"
 * - Embed URL: "https://www.youtube.com/embed/Q-qFYqqjF3s"
 * - Playlist URL: "https://www.youtube.com/playlist?list=PL..."
 */
export function getYoutubeEmbedUrl(input) {
  if (!input || typeof input !== 'string') return null;

  const trimmed = input.trim();
  if (!trimmed) return null;

  // Plain video ID (typically 11 chars of [A-Za-z0-9_-])
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}`;
  }

  let parsed;
  try {
    parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
  const isYoutubeHost =
    host === 'youtu.be' ||
    host === 'youtube.com' ||
    host === 'm.youtube.com' ||
    host === 'youtube-nocookie.com';

  if (!isYoutubeHost) return null;

  const pathParts = parsed.pathname.split('/').filter(Boolean);
  let videoId = null;

  if (host === 'youtu.be') {
    videoId = pathParts[0] || null;
  } else if (pathParts[0] === 'watch') {
    videoId = parsed.searchParams.get('v');
  } else if (['embed', 'live', 'shorts', 'v'].includes(pathParts[0])) {
    videoId = pathParts[1] || null;
  }

  if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    const startParam = parseStartTime(parsed.searchParams.get('t') || parsed.searchParams.get('start'));
    return startParam
      ? `https://www.youtube.com/embed/${videoId}?start=${startParam}`
      : `https://www.youtube.com/embed/${videoId}`;
  }

  const listId = parsed.searchParams.get('list');
  if (listId && /^[a-zA-Z0-9_-]+$/.test(listId)) {
    return `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }

  return null;
}

function parseStartTime(raw) {
  if (!raw) return null;
  if (/^\d+$/.test(raw)) return raw;
  const match = raw.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match || (!match[1] && !match[2] && !match[3])) return null;
  const seconds =
    (Number(match[1] || 0) * 3600) +
    (Number(match[2] || 0) * 60) +
    Number(match[3] || 0);
  return seconds > 0 ? String(seconds) : null;
}
