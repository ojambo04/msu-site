import React, { useState } from 'react';
import { useMarkdown } from '../hooks/useMarkdown';
import TabNavigation from '../components/TabNavigation';
import ExecutiveLeaders from '../components/ExecutiveLeaders';
import OfficeBearers from '../components/OfficeBearers';
import HeroBanner from '../components/HeroBanner';

const Leadership = () => {
  const { attributes, loading } = useMarkdown('leadership.md');
  const [activeTab, setActiveTab] = useState('executive');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-primary dark:border-t-primary-light rounded-full animate-spin"></div>
      </div>
    );
  }

  const { header, keyLeaders, officeBearers } = attributes;

  const tabs = [
    { id: 'executive', label: 'Central Executive Leadership' },
    { id: 'units', label: '27 Constituent Units & Branches' },
    { id: 'bodies', label: '4 Subordinate Bodies & Cells' }
  ];

  return (
    <div className="w-full flex flex-col items-center pb-20 bg-slate-50 dark:bg-slate-900 min-h-screen fade-in">
      
      <HeroBanner 
        title={header?.title || 'Executive Council'} 
        subtitle={header?.subtitle} 
      />

      {/* Main Navigation - Floating Bar */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-[-40px] relative z-10">
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Content Rendering based on Active Tab */}
      <div className="w-full">
        {activeTab === 'executive' && (
          <div className="fade-in">
            <ExecutiveLeaders leaders={keyLeaders} />
            <OfficeBearers bearers={officeBearers} />
          </div>
        )}
        
        {activeTab === 'units' && (
          <div className="w-full max-w-6xl mx-auto py-20 px-4 text-center text-slate-500 fade-in">
            <h3 className="text-2xl font-bold mb-2">Constituent Units Directory</h3>
            <p>Content for 27 Constituent Units will be updated here.</p>
          </div>
        )}

        {activeTab === 'bodies' && (
          <div className="w-full max-w-6xl mx-auto py-20 px-4 text-center text-slate-500 fade-in">
            <h3 className="text-2xl font-bold mb-2">Subordinate Bodies</h3>
            <p>Content for 4 Subordinate Bodies will be updated here.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Leadership;
