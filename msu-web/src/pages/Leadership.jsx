import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMarkdown } from '../hooks/useMarkdown';
import TabNavigation from '../components/TabNavigation';
import ExecutiveLeaders from '../components/ExecutiveLeaders';
import OfficeBearers from '../components/OfficeBearers';
import HeroBanner from '../components/HeroBanner';

const tabs = [
  { id: 'executive', label: 'Central Executive Leadership' },
  { id: 'units', label: '27 Constituent Units & Branches' },
  { id: 'bodies', label: '4 Subordinate Bodies & Cells' }
];

const Leadership = () => {
  const { attributes, loading } = useMarkdown('leadership.md');
  const location = useLocation();

  const getInitialTab = () => {
    const hash = location.hash?.replace('#', '');
    if (hash && tabs.some(t => t.id === hash)) return hash;
    const queryTab = new URLSearchParams(location.search).get('tab');
    if (queryTab && tabs.some(t => t.id === queryTab)) return queryTab;
    if (location.state?.tab && tabs.some(t => t.id === location.state.tab)) return location.state.tab;
    return 'executive';
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
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-primary dark:border-t-primary-light rounded-full animate-spin"></div>
      </div>
    );
  }

  const { header, keyLeaders, officeBearers } = attributes;

  return (
    <div className="w-full flex flex-col items-center pb-20 bg-slate-50 dark:bg-zinc-950 min-h-screen fade-in">
      
      <HeroBanner 
        title={header?.title || 'Executive Council'} 
        subtitle={header?.subtitle} 
      />

      {/* Destination Anchors for smooth footer / deep-link scrolling */}
      <div id="executive" className="scroll-mt-28"></div>
      <div id="units" className="scroll-mt-28"></div>
      <div id="bodies" className="scroll-mt-28"></div>

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
