import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMarkdown } from '../hooks/useMarkdown';
import { getImageUrl } from '../utils/getFileUrl';

const PageRenderer = ({ filename, hideBanner = false }) => {
  const { content, loading } = useMarkdown(filename);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-primary dark:border-t-primary-light rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center pb-20 fade-in">
      {!hideBanner && (
        <div className="w-full h-64 md:h-80 relative mb-[-100px] md:mb-[-150px] z-0">
          <img src={getImageUrl('banner_abstract.png')} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-zinc-950 to-transparent"></div>
        </div>
      )}
      <div className={`relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 ${!hideBanner ? 'mt-0' : 'my-8 md:my-12'}`}>
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-2xl transition-all duration-300 p-8 md:p-14 border border-slate-100 dark:border-zinc-800">
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt, ...props }) => <img src={getImageUrl(src)} alt={alt} {...props} />
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageRenderer;
