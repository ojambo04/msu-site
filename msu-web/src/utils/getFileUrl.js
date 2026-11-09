const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/ojambo04/msu-site/main';

/**
 * Returns the correct URL for a file stored in msu-content/files/.
 *
 * Supports:
 * - Full CMS paths: "/msu-content/files/doc.pdf"
 * - Legacy paths: "/files/doc.pdf", "/assets/files/doc.pdf"
 * - Bare filenames: "doc.pdf"
 * - External URLs: "https://..."
 *
 * - Development : Vite serves /msu-content/files/ from public/msu-content/files/
 * - Production  : prepends GitHub raw base URL
 *
 * @param {string} filePath  e.g. "/msu-content/files/constitution.pdf" or "constitution.pdf"
 * @returns {string}
 */
export const getFileUrl = (filePath) => {
  if (!filePath) return '';
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }
  const filename = filePath.split('/').pop();
  const normalized = `/msu-content/files/${filename}`;

  if (import.meta.env.PROD) {
    return `${GITHUB_RAW_BASE}${normalized}`;
  }
  return normalized;
};

/**
 * Returns the correct URL for an image stored in msu-content/images/.
 *
 * Supports:
 * - Full CMS paths: "/msu-content/images/banner_abstract.png"
 * - Legacy paths: "/assets/images/banner_abstract.png", "/images/..."
 * - Bare filenames: "banner_abstract.png"
 * - External URLs: "https://..."
 *
 * - Development : Vite serves /msu-content/images/ from public/msu-content/images/
 * - Production  : prepends GitHub raw base URL
 *
 * @param {string} imagePath  e.g. "/msu-content/images/logo.png" or "banner_abstract.png"
 * @returns {string}
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const filename = imagePath.split('/').pop();
  const normalized = `/msu-content/images/${filename}`;

  if (import.meta.env.PROD) {
    return `${GITHUB_RAW_BASE}${normalized}`;
  }
  return normalized;
};
