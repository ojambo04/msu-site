const GITHUB_FILES_BASE =
  'https://raw.githubusercontent.com/ojambo04/msu-site/main/msu-content/files';
const GITHUB_IMAGES_BASE =
  'https://raw.githubusercontent.com/ojambo04/msu-site/main/msu-content/images';

/**
 * Returns the correct URL for a file stored in msu-content/files/.
 *
 * - Development : /files/<filename>  (served locally via Vite dev plugin)
 * - Production  : raw.githubusercontent.com URL (no rebuild needed for file updates)
 *
 * @param {string} filename  e.g. "constitution.pdf"
 * @returns {string}
 */
export const getFileUrl = (filename) => {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  const cleanName = filename.replace(/^(\/files\/|\/)/, '');
  if (import.meta.env.PROD) {
    return `${GITHUB_FILES_BASE}/${cleanName}`;
  }
  return `/files/${cleanName}`;
};

/**
 * Returns the correct URL for an image stored in msu-content/images/.
 *
 * @param {string} imagePath  e.g. "logo.png" or "/assets/images/logo.png"
 * @returns {string}
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const cleanName = imagePath.replace(/^(\/?assets)?\/images\//, '').replace(/^\//, '');
  if (import.meta.env.PROD) {
    return `${GITHUB_IMAGES_BASE}/${cleanName}`;
  }
  return `/images/${cleanName}`;
};
