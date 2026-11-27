import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, ChevronDown } from 'lucide-react';
import { useMarkdown } from '../hooks/useMarkdown';
import { useContentIndex } from '../hooks/useContentIndex';
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
  const { data: execData, loading: lExec } = useContentIndex('leadership');
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

  // Normalize tenures list (supports both new `tenures` array and legacy flat structure)
  const tenuresList = useMemo(() => {
    if (Array.isArray(execData?.tenures) && execData.tenures.length > 0) {
      return execData.tenures;
    }
    if (execData?.keyLeaders || execData?.officeBearers) {
      return [
        {
          tenure: 'Current Tenure',
          isActive: true,
          keyLeaders: execData.keyLeaders || [],
          officeBearers: execData.officeBearers || []
        }
      ];
    }
    return [];
  }, [execData]);

  // Active council is the one marked `isActive`, falling back to the first entry
  const activeTenureObj = useMemo(() => {
    return tenuresList.find((t) => t.isActive) || tenuresList[0] || null;
  }, [tenuresList]);

  const [selectedTenure, setSelectedTenure] = useState('');

  // Reset to the active tenure whenever leadership data loads
  useEffect(() => {
    if (activeTenureObj?.tenure) {
      setSelectedTenure(activeTenureObj.tenure);
    }
  }, [activeTenureObj]);

  const displayedCouncil = useMemo(() => {
    return tenuresList.find((t) => t.tenure === selectedTenure) || activeTenureObj;
  }, [tenuresList, selectedTenure, activeTenureObj]);

  const unitsList = unitsData?.units || [];
  const bodiesList = bodiesData?.bodies || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-[#20387b] dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const execHeader = execData?.header;
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
        {activeTab === 'executive' && displayedCouncil && (
          <div className="fade-in">
            {/* Tenure Selector Bar */}
            <div className="w-full max-w-6xl mx-auto px-4 pt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:px-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center text-[#20387b] dark:text-blue-300 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                        {displayedCouncil.tenure} Tenure
                      </span>
                      {displayedCouncil.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60">
                          Active Council
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60">
                          Past Council
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                      Executive Council serves a 2-year term. {tenuresList.length > 1 ? 'Switch tenures to view past councils.' : 'Past councils will appear in the dropdown once added.'}
                    </p>
                  </div>
                </div>

                {/* Tenure Dropdown */}
                <div className="relative shrink-0">
                  <label htmlFor="tenure-select" className="sr-only">
                    Select Executive Council Tenure
                  </label>
                  <select
                    id="tenure-select"
                    value={displayedCouncil.tenure}
                    onChange={(e) => setSelectedTenure(e.target.value)}
                    className="appearance-none w-full sm:w-56 pl-4 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs md:text-sm font-semibold text-slate-800 dark:text-zinc-100 focus:outline-none focus:border-[#20387b] dark:focus:border-blue-500 focus:ring-2 focus:ring-[#20387b]/10 cursor-pointer transition-all"
                  >
                    {tenuresList.map((item) => (
                      <option key={item.tenure} value={item.tenure}>
                        {item.tenure} {item.isActive ? '(Active)' : '(Past)'}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <ExecutiveLeaders key={`leaders-${displayedCouncil.tenure}`} leaders={displayedCouncil.keyLeaders} />
            <OfficeBearers key={`bearers-${displayedCouncil.tenure}`} bearers={displayedCouncil.officeBearers} />
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
