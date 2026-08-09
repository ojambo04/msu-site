import React from 'react';

const TabNavigation = ({ tabs, activeTab, onTabChange, rightElement }) => {
  // Normalize tabs to always be objects with id and label
  const normalizedTabs = tabs.map(tab => 
    typeof tab === 'string' ? { id: tab, label: tab } : tab
  );

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-full shadow-lg p-2 mb-10 flex flex-col md:flex-row items-center gap-4 relative z-20 border border-slate-100 dark:border-zinc-800">
      
      {/* Scrollable container for mobile, flex for desktop */}
      <div className={`flex w-full md:w-auto overflow-x-auto no-scrollbar md:pl-2 flex-1 ${rightElement ? 'justify-start' : 'justify-center'}`}>
        <div className={`flex flex-nowrap gap-2 w-max ${rightElement ? 'md:justify-start' : 'md:justify-center'}`}>
          {normalizedTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-2.5 rounded-full text-sm md:text-[15px] font-bold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#20387b] text-white shadow-md'
                  : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {rightElement && (
        <div className="w-full md:w-auto md:ml-auto relative flex-shrink-0 pr-0 md:pr-2 pb-2 md:pb-0">
          {rightElement}
        </div>
      )}
    </div>
  );
};

export default TabNavigation;
