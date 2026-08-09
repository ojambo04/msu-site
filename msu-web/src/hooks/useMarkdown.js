import { useState, useEffect } from 'react';
import { fetchMarkdown } from '../utils/fetchMarkdown';

export const useMarkdown = (filename) => {
  const [content, setContent] = useState('');
  const [attributes, setAttributes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchMarkdown(filename)
      .then((data) => {
        if (isMounted) {
          setContent(data.body);
          setAttributes(data.attributes || {});
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error in useMarkdown:", err);
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [filename]);

  return { content, attributes, loading, error };
};
