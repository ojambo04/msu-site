import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarkdown } from '../hooks/useMarkdown';
import { getFileUrl, getImageUrl } from '../utils/getFileUrl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const NoticeDetails = () => {
  const { slug } = useParams();
  const { attributes, content, loading } = useMarkdown(`notices/${slug}.md`);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-[#20387b] dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const hasBody = content && content.trim().length > 0;

  // Only notices with a markdown body have a detail page
  if (!attributes?.title || !hasBody) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-3xl font-bold font-serif text-slate-800 dark:text-zinc-200 mb-4">Notice Not Found</h2>
        <p className="text-slate-500 dark:text-zinc-400 mb-6 max-w-md">This circular does not have an extended detail page.</p>
        <Link to="/notices" className="text-[#20387b] dark:text-blue-400 hover:underline font-bold">Return to Notices</Link>
      </div>
    );
  }

  const notice = attributes;
  const pdfDownloadUrl = notice.pdf ? getFileUrl(notice.pdf) : null;

  return (
    <div className="w-full flex flex-col items-center bg-[#f8fafc] dark:bg-zinc-950 min-h-screen pb-20 fade-in">
      
      {/* Hero Header */}
      <div className="w-full bg-[#20387b] pt-16 pb-24 px-4 md:px-8 overflow-hidden z-0 shadow-inner relative">
        <div className="absolute inset-0 z-[-1] opacity-20 mix-blend-overlay">
           <img src={getImageUrl('banner_abstract.png')} alt="Texture" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Link to="/notices" className="inline-flex items-center text-blue-200 hover:text-white transition-colors text-sm font-bold mb-8 group">
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Notices & Press
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-5">
            {notice.ref && (
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                {notice.ref}
              </span>
            )}
            {notice.category && (
              <span className="bg-white/10 border border-white/20 text-blue-100 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                {notice.category}
              </span>
            )}
            {notice.urgent && (
              <span className="bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm flex items-center">
                <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                URGENT ALERT
              </span>
            )}
            <span className="text-xs font-medium text-blue-200 flex items-center ml-1">
              <svg className="w-4 h-4 mr-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {notice.displayDate || notice.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white font-serif mb-4 tracking-tight leading-tight drop-shadow-sm">
            {notice.title}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8 mt-[-50px] relative z-10 slide-up" style={{ animationDelay: '150ms' }}>
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-slate-100 dark:border-zinc-800 p-8 md:p-14 mb-8">
          
          {/* Action Row for PDF if present */}
          {notice.pdf && (
            <div className="mb-8 p-5 bg-blue-50/50 dark:bg-zinc-800/50 border border-blue-100 dark:border-zinc-700/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm shrink-0">
                  PDF
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">Official Attached Document</h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Download the full circular or press release</p>
                </div>
              </div>

              <a
                href={pdfDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#20387b] hover:bg-[#152554] text-white text-xs font-bold py-2.5 px-5 rounded-full transition-all duration-300 flex items-center shadow hover:shadow-md shrink-0"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF Document
              </a>
            </div>
          )}

          {/* Snippet Lead paragraph */}
          {notice.snippet && (
            <div className="text-lg text-slate-600 dark:text-zinc-300 font-medium leading-relaxed italic border-l-4 border-[#20387b] pl-4 py-1 mb-8">
              {notice.snippet}
            </div>
          )}

          {/* Full Markdown Notice Body */}
          {hasBody ? (
            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-slate-500 dark:text-zinc-400">No additional details have been provided for this circular.</p>
          )}

        </div>
      </div>

    </div>
  );
};

export default NoticeDetails;

