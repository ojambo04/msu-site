import frontMatter from 'front-matter';

// This utility fetches markdown from a given URL or local public folder
export const fetchMarkdown = async (filename) => {
  try {
    // For local development, we fetch from the public folder.
    // In production, this can be changed to point to the raw GitHub URL.
    const url = `/content/${filename}?t=${new Date().getTime()}`;
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
