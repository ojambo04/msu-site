import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMarkdown } from '../hooks/useMarkdown';
import TabNavigation from '../components/TabNavigation';
import ExecutiveLeaders from '../components/ExecutiveLeaders';
import OfficeBearers from '../components/OfficeBearers';
import ConstituentUnits from '../components/ConstituentUnits';
import SubordinateBodies from '../components/SubordinateBodies';
import HeroBanner from '../components/HeroBanner';

const tabs = [
  { id: 'executive', label: 'Central Executive Leadership' },
  { id: 'units', label: '27 Constituent Units & Branches' },
  { id: 'bodies', label: '4 Subordinate Bodies & Cells' }
];

const Leadership = () => {
  const { attributes: execData, loading: lExec } = useMarkdown('leadership.md');
  const { attributes: unitsData, loading: lUnits } = useMarkdown('constituentUnits.md');
  const { attributes: bodiesData, loading: lBodies } = useMarkdown('subordinateBodies.md');
  const location = useLocation();

  const loading = lExec || lUnits || lBodies;

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

  const unitsList = unitsData?.units || [];
  const bodiesList = bodiesData?.bodies || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-[#20387b] dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const { header: execHeader, keyLeaders, officeBearers } = execData || {};
  const currentHeader = activeTab === 'units'
    ? unitsData?.header || { title: '27 Constituent Units & Branches', subtitle: 'Regional and institutional constituent units of Mao Students\' Union.' }
    : activeTab === 'bodies'
    ? bodiesData?.header || { title: '4 Subordinate Bodies & Cells', subtitle: 'Specialized constitutional commissions, boards, and councils under MSU.' }
    : execHeader || { title: 'Executive Council', subtitle: 'Central Executive Council leadership and office bearers.' };

  return (
    <div className="w-full flex flex-col items-center pb-20 bg-slate-50 dark:bg-zinc-950 min-h-screen fade-in">
      
      <HeroBanner 
        title={currentHeader.title || 'Executive Council'} 
        subtitle={currentHeader.subtitle} 
        bannerImage={currentHeader?.bannerImage || currentHeader?.image || execHeader?.bannerImage}
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
          <div className="fade-in">
            <ConstituentUnits units={unitsList} />
          </div>
        )}

        {activeTab === 'bodies' && (
          <div className="fade-in">
            <SubordinateBodies bodies={bodiesList} />
          </div>
        )}
      </div>

    </div>
  );
};

export default Leadership;
