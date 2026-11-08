import React, { useState, useMemo } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { useContentIndex } from '../hooks/useContentIndex';
import NoticeList from '../components/NoticeList';
import HeroBanner from '../components/HeroBanner';

const Notices = () => {
  const { data, loading } = useContentIndex('notices');
  const [filter, setFilter] = useState('All Notices');
  const [searchQuery, setSearchQuery] = useState('');

  const { header, notices = [] } = data || {};

  // Compute unique categories and counts
  const { categories, categoryCounts } = useMemo(() => {
    if (!notices || notices.length === 0) {
      return { categories: ['All Notices'], categoryCounts: { 'All Notices': 0 } };
    }

    const counts = { 'All Notices': notices.length };
    const cats = new Set();

    notices.forEach((n) => {
      if (n.category) {
        cats.add(n.category);
        counts[n.category] = (counts[n.category] || 0) + 1;
      }
    });

    return {
      categories: ['All Notices', ...Array.from(cats)],
      categoryCounts: counts,
    };
  }, [notices]);

  const resetFilters = () => {
    setFilter('All Notices');
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-[#20387b] dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const isFiltered = filter !== 'All Notices' || searchQuery.trim().length > 0;

  return (
    <div className="w-full flex flex-col items-center bg-[#f8fafc] dark:bg-zinc-950 min-h-screen fade-in">
      
      <HeroBanner 
        title={header?.title || 'Notice and Press Releases'} 
        subtitle={header?.subtitle} 
      />

      {/* Floating Toolbar: Search & Category Navigation */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-[-45px] relative z-10 mb-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl shadow-[0_12px_36px_rgb(0,0,0,0.06)] border border-slate-100 dark:border-zinc-800 p-4 md:p-6 transition-all">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Chips Container */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 flex-wrap">
              {categories.map((category) => {
                const isActive = filter === category;
                const count = categoryCounts[category];

                return (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 select-none ${
                      isActive
                        ? 'bg-[#20387b] text-white shadow-md shadow-[#20387b]/25 ring-2 ring-[#20387b]/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700/80'
                    }`}
                  >
                    <span>{category}</span>
                    {count !== undefined && (
                      <span
                        className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-white dark:bg-zinc-900 text-slate-500 dark:text-zinc-400'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full lg:w-80 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search by ref no, title, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 focus:border-[#20387b] dark:focus:border-blue-500 focus:ring-2 focus:ring-[#20387b]/15 text-sm focus:outline-none dark:text-white transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Active Filter Status Bar */}
          {isFiltered && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-zinc-400">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 font-medium">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  Active filters:
                </span>
                {filter !== 'All Notices' && (
                  <span className="inline-flex items-center gap-1 font-semibold text-[#20387b] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-md border border-blue-100 dark:border-blue-900/50">
                    Category: {filter}
                    <button
                      onClick={() => setFilter('All Notices')}
                      className="hover:text-red-500 ml-0.5 cursor-pointer"
                      title="Clear category filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1 font-semibold text-[#20387b] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-md border border-blue-100 dark:border-blue-900/50">
                    Search: &ldquo;{searchQuery}&rdquo;
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-red-500 ml-0.5 cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="text-[#20387b] dark:text-blue-400 font-bold hover:underline cursor-pointer ml-auto"
              >
                Reset all
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Notices Cards List */}
      <div className="w-full">
        <NoticeList
          notices={notices}
          filter={filter}
          searchQuery={searchQuery}
          onResetFilters={resetFilters}
        />
      </div>

    </div>
  );
};

export default Notices;
