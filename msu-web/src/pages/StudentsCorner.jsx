import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMarkdown } from '../hooks/useMarkdown';
import ResourceList from '../components/ResourceList';
import TabNavigation from '../components/TabNavigation';
import HeroBanner from '../components/HeroBanner';

const tabs = [
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'jobs', label: 'Job Vacancies' },
  { id: 'exams', label: 'Competitive Exams' },
];

const StudentsCorner = () => {
  const { attributes, loading } = useMarkdown('students.md');
  const location = useLocation();

  const getInitialTab = () => {
    const hash = location.hash?.replace('#', '');
    if (hash && tabs.some(t => t.id === hash)) return hash;
    const queryTab = new URLSearchParams(location.search).get('tab');
    if (queryTab && tabs.some(t => t.id === queryTab)) return queryTab;
    if (location.state?.tab && tabs.some(t => t.id === location.state.tab)) return location.state.tab;
    return 'scholarships';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    const tabFromUrl = getInitialTab();
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-[#20387b] dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const { header } = attributes;

  return (
    <div className="w-full flex flex-col items-center bg-[#f8fafc] dark:bg-zinc-950 min-h-screen fade-in">
      
      <HeroBanner 
        title={header?.title || "Students' Corner"} 
        subtitle={header?.subtitle} 
      />

      {/* Destination Anchors for smooth footer / deep-link scrolling */}
      <div id="scholarships" className="scroll-mt-28"></div>
      <div id="jobs" className="scroll-mt-28"></div>
      <div id="exams" className="scroll-mt-28"></div>

      {/* Main Navigation - Floating Bar */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-[-40px] relative z-10">
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="w-full mt-4">
        <ResourceList data={attributes} activeTab={activeTab} />
      </div>

    </div>
  );
};

export default StudentsCorner;
