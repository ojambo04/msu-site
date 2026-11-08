import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Download, FileText, ArrowRight, AlertCircle, SearchX } from 'lucide-react';
import { getFileUrl } from '../utils/getFileUrl';
import { formatDate } from '../utils/formatDate';

const NoticeList = ({ notices, filter, searchQuery, onResetFilters }) => {
  const filteredNotices = useMemo(() => {
    if (!notices) return [];

    return notices.filter((notice) => {
      const matchesCategory = filter === 'All Notices' || notice.category === filter;
      const query = (searchQuery || '').toLowerCase().trim();
      const matchesSearch =
        !query ||
        (notice.ref || '').toLowerCase().includes(query) ||
        (notice.title || '').toLowerCase().includes(query) ||
        (notice.snippet || '').toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [notices, filter, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 slide-up" style={{ animationDelay: '150ms' }}>
      
      {/* Result Count Header */}
      <div className="flex items-center justify-between mb-5 px-1 text-sm text-slate-500 dark:text-zinc-400">
        <span>
          Showing <strong className="text-slate-800 dark:text-zinc-200">{filteredNotices.length}</strong>{' '}
          {filteredNotices.length === 1 ? 'notice' : 'notices'}
        </span>
      </div>

      {/* Notice Cards List */}
      <div className="space-y-4">
        {filteredNotices.map((notice, index) => {
          const attachedFile = notice.file || notice.pdf;
          const downloadUrl = attachedFile ? getFileUrl(attachedFile) : null;
          const isUrgent = Boolean(notice.urgent);

          return (
            <div
              key={notice.slug || index}
              className={`group bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-7 shadow-[0_2px_12px_rgb(0,0,0,0.03)] border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden ${
                isUrgent
                  ? 'border-l-4 border-l-amber-500 border-t-amber-100/60 border-r-amber-100/60 border-b-amber-100/60 dark:border-l-amber-500 dark:border-t-zinc-800 dark:border-r-zinc-800 dark:border-b-zinc-800 bg-gradient-to-r from-amber-50/20 via-white to-white dark:from-amber-950/10 dark:via-zinc-900 dark:to-zinc-900'
                  : 'border-slate-100 dark:border-zinc-800 hover:border-slate-200 dark:hover:border-zinc-700'
              }`}
            >
              {/* Left Notice Content */}
              <div className="flex-1 min-w-0 pr-0 md:pr-6">
                
                {/* Meta Badges Row */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                  {notice.ref && (
                    <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-700">
                      {notice.ref}
                    </span>
                  )}

                  {notice.category && (
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-blue-50 text-[#20387b] dark:bg-blue-950/60 dark:text-blue-300">
                      {notice.category}
                    </span>
                  )}

                  {isUrgent && (
                    <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                      <AlertCircle className="w-3 h-3" />
                      Urgent Alert
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-zinc-500 ml-auto md:ml-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(notice.date)}
                  </span>
                </div>

                {/* Notice Title */}
                {notice.hasBody ? (
                  <Link to={`/notices/${notice.slug || ''}`}>
                    <h3 className="text-lg md:text-xl font-bold font-serif text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-[#20387b] dark:group-hover:text-blue-400 transition-colors cursor-pointer">
                      {notice.title}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="text-lg md:text-xl font-bold font-serif text-slate-900 dark:text-white mb-2 leading-snug">
                    {notice.title}
                  </h3>
                )}

                {/* Notice Snippet */}
                {notice.snippet && (
                  <p className="text-sm md:text-[15px] text-slate-600 dark:text-zinc-400 font-normal leading-relaxed">
                    {notice.snippet}
                  </p>
                )}
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-row md:flex-col items-stretch md:items-end justify-center gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-zinc-800">
                {notice.hasBody && (
                  <Link
                    to={`/notices/${notice.slug || ''}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#20387b] hover:bg-[#152554] text-white text-xs md:text-sm font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex-1 md:flex-initial"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 dark:border-zinc-700 hover:border-amber-500/60 text-slate-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 text-xs md:text-sm font-semibold transition-all duration-200 flex-1 md:flex-initial"
                  >
                    <Download className="w-4 h-4 text-amber-500" />
                    <span>Download</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filteredNotices.length === 0 && (
          <div className="text-center py-20 px-6 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-800 dark:text-zinc-200 mb-2">
              No Notices Found
            </h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
              {searchQuery
                ? `No announcements match "${searchQuery}" in ${filter}.`
                : `There are currently no circulars published under "${filter}".`}
            </p>
            {onResetFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-2 bg-[#20387b] hover:bg-[#152554] text-white text-xs md:text-sm font-semibold py-2.5 px-6 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Clear Filters & Search
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default NoticeList;
