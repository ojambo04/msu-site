import { useState, useEffect } from 'react';
import { fetchContentIndex } from '../utils/fetchContentIndex';

/**
 * Fetches and returns the pre-built index.json for a content section.
 *
 * @param {"events"|"notices"} section
 * @returns {{ data: object, loading: boolean, error: Error|null }}
 */
export const useContentIndex = (section) => {
  const [data, setData]       = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchContentIndex(section)
      .then((json) => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [section]);

  return { data, loading, error };
};

