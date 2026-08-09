import React, { useState } from 'react';
import { useMarkdown } from '../hooks/useMarkdown';
import ResourceList from '../components/ResourceList';
import TabNavigation from '../components/TabNavigation';
import HeroBanner from '../components/HeroBanner';

const StudentsCorner = () => {
  const { attributes, loading } = useMarkdown('students.md');
  const [activeTab, setActiveTab] = useState('scholarships');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-[#20387b] dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const { header } = attributes;
  const tabs = [
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'jobs', label: 'Job Vacancies' },
    { id: 'exams', label: 'Competitive Exams' },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#f8fafc] dark:bg-slate-900 min-h-screen fade-in">
      
      <HeroBanner 
        title={header?.title || "Students' Corner"} 
        subtitle={header?.subtitle} 
      />

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
