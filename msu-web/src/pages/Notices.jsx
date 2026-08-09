import React, { useState, useMemo } from 'react';
import { useMarkdown } from '../hooks/useMarkdown';
import NoticeList from '../components/NoticeList';
import TabNavigation from '../components/TabNavigation';
import HeroBanner from '../components/HeroBanner';

const Notices = () => {
  const { attributes, loading } = useMarkdown('notices.md');
  const [filter, setFilter] = useState('All Notices');
  const [searchQuery, setSearchQuery] = useState('');

  const { header, notices } = attributes || {};

  const categories = useMemo(() => {
    if (!notices) return ['All Notices'];
    const cats = new Set(notices.map(n => n.category));
    return ['All Notices', ...Array.from(cats)];
  }, [notices]);

  const tabs = useMemo(() => {
    return categories.map(c => ({ id: c, label: c }));
  }, [categories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-[#20387b] dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const searchInput = (
    <div className="relative w-full lg:w-[400px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search by ref no, title, or keyword..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-[#20387b] dark:focus:border-blue-500 text-sm focus:outline-none dark:text-white transition-all shadow-inner"
      />
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center bg-[#f8fafc] dark:bg-slate-900 min-h-screen fade-in">
      
      <HeroBanner 
        title={header?.title || 'Notice and Press Releases'} 
        subtitle={header?.subtitle} 
      />

      {/* Main Navigation - Floating Bar */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-[-40px] relative z-10">
        <TabNavigation tabs={tabs} activeTab={filter} onTabChange={setFilter} rightElement={searchInput} />
      </div>

      {/* Notices List Component */}
      <div className="w-full mt-4">
        <NoticeList notices={notices} filter={filter} searchQuery={searchQuery} />
      </div>

    </div>
  );
};

export default Notices;
