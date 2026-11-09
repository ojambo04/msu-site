import frontMatter from 'front-matter';

// In production, content is fetched directly from GitHub (single source of truth).
// In development, Vite serves /msu-content/content/ from public/msu-content/content/.
const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/ojambo04/msu-site/main';

const getContentUrl = (filename) => {
  if (import.meta.env.PROD) {
    // Production: read from GitHub raw — no deploy step needed for content updates
    return `${GITHUB_RAW_BASE}/msu-content/content/${filename}`;
  }
  // Development: served from public/msu-content/content/ (auto-copied by Vite dev plugin)
  return `/msu-content/content/${filename}`;
};

export const fetchMarkdown = async (filename) => {
  try {
    const url = getContentUrl(filename);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
    }
    const text = await response.text();
    const { attributes, body } = frontMatter(text);
    return { attributes, body };
  } catch (error) {
    console.error("Error fetching markdown:", error);
    return { attributes: {}, body: `# Error\n\nCould not load content for ${filename}.` };
  }
};
