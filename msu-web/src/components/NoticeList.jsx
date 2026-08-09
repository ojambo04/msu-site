import React, { useMemo } from 'react';

const NoticeList = ({ notices, filter, searchQuery }) => {

  const filteredNotices = useMemo(() => {
    if (!notices) return [];
    
    return notices.filter(notice => {
      const matchesCategory = filter === 'All Notices' || notice.category === filter;
      const query = (searchQuery || '').toLowerCase();
      const matchesSearch = 
        (notice.ref || '').toLowerCase().includes(query) ||
        (notice.title || '').toLowerCase().includes(query) ||
        (notice.snippet || '').toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [notices, filter, searchQuery]);


  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 slide-up" style={{ animationDelay: '150ms' }}>

      {/* Notice Cards List */}
      <div className="space-y-4">
        {filteredNotices.map((notice, index) => (
          <div key={index} className="bg-white dark:bg-zinc-900 rounded-[20px] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 fade-in flex flex-col md:flex-row justify-between gap-6" style={{ animationDelay: `${index * 50}ms` }}>
            
            {/* Left Content */}
            <div className="flex-1 pr-0 md:pr-8">
              {/* Tags Row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-[#20387b] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  {notice.ref}
                </span>
                <span className="bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {notice.category}
                </span>
                {notice.urgent && (
                  <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    URGENT ALERT
                  </span>
                )}
                <span className="text-xs font-medium text-slate-400 flex items-center ml-2">
                  <svg className="w-4 h-4 mr-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {notice.date}
                </span>
              </div>

              {/* Title & Snippet */}
              <h3 className="text-xl md:text-[22px] font-bold font-serif text-[#0f172a] dark:text-white mb-2.5 leading-snug hover:text-[#20387b] dark:hover:text-blue-400 transition-colors cursor-pointer">
                {notice.title}
              </h3>
              <p className="text-[15px] text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                {notice.snippet}
              </p>
            </div>

            {/* Right Actions */}
            <div className="flex flex-col items-start md:items-end justify-center gap-3 shrink-0 mt-2 md:mt-0">
              <button className="bg-[#20387b] hover:bg-[#152554] text-white text-sm font-bold py-2.5 px-6 rounded-full transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg w-full md:w-auto hover:-translate-y-0.5">
                Read Full Notice
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H16M16 6V12M16 6L8 14" />
                </svg>
              </button>
              
              {notice.pdf && (
                <button className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 text-sm font-bold flex items-center transition-colors w-full md:w-auto justify-center md:justify-end pr-2">
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              )}
            </div>

          </div>
        ))}

        {filteredNotices.length === 0 && (
          <div className="text-center py-20 text-slate-500 bg-white dark:bg-zinc-900 rounded-[20px] border border-slate-200 dark:border-zinc-800 shadow-sm">
            <svg className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">No notices found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
