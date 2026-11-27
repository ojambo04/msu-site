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
 * Opens a PDF in a new browser tab for inline reading instead of forcing download.
 * In production, GitHub Raw serves PDFs with headers that trigger downloads, so we
 * fetch the file as an application/pdf Blob and load it into the new tab.
 */
export const openPdfInNewTab = async (e, filePath) => {
  const url = getFileUrl(filePath);
  if (!url || url === '#') return;

  if (!import.meta.env.PROD && url.startsWith('/')) {
    return;
  }

  e?.preventDefault?.();
  const newTab = window.open('', '_blank');
  if (newTab) {
    newTab.document.title = 'Loading PDF...';
    newTab.document.body.innerHTML =
      '<p style="font-family:sans-serif;padding:24px;color:#334155;">Loading PDF...</p>';
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    const blobUrl = URL.createObjectURL(new Blob([buffer], { type: 'application/pdf' }));
    if (newTab) {
      newTab.location.replace(blobUrl);
    } else {
      window.open(blobUrl, '_blank', 'noopener,noreferrer');
    }
  } catch {
    if (newTab) {
      newTab.location.replace(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
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
