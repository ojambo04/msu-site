import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Automatically scrolls window to top or to the destined anchor element
 * whenever navigating or clicking links.
 */
const ScrollToTop = () => {
  const location = useLocation();
  const { pathname, hash, search, key } = location;

  useEffect(() => {
    // If a hash anchor is provided (e.g. #hall-of-fame or #scholarships)
    if (hash) {
      const targetId = hash.replace('#', '');
      let attempts = 0;
      const maxAttempts = 10; // Poll for up to 1 second for async loaded markdown

      const checkAndScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        attempts += 1;
        if (attempts < maxAttempts) {
          timer = setTimeout(checkAndScroll, 100);
        } else {
          // Fallback to top if anchor element is not found
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      };

      let timer = setTimeout(checkAndScroll, 50);
      return () => clearTimeout(timer);
    }

    // Default: Immediately scroll window to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, hash, search, key]);

  return null;
};

export default ScrollToTop;
