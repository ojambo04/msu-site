import React, { useState, useEffect } from 'react';

const HallOfFame = ({ data }) => {
  if (!data || (!data.presidents && !data.secretaries)) return null;

  const [activeTab, setActiveTab] = useState('presidents');
  const [key, setKey] = useState(0); // Used to re-trigger animations on tab switch
  
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [activeTab]);

  const activeData = activeTab === 'presidents' ? data.presidents : data.secretaries;

  if (!activeData || activeData.length === 0) return null;

  return (
    <div className="w-full py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
        <div>
          <h4 className="text-xs font-bold text-accent tracking-widest uppercase mb-1">Legendary Leadership</h4>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-serif">Hall of Fame</h2>
        </div>
        
        {/* Compact Tabs */}
        <div className="flex bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl border border-slate-200 dark:border-zinc-800 w-full sm:w-auto">
          <button 
            onClick={() => setActiveTab('presidents')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'presidents' ? 'bg-[#1e3a8a] text-white shadow-sm' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Presidents
          </button>
          <button 
            onClick={() => setActiveTab('secretaries')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'secretaries' ? 'bg-[#1e3a8a] text-white shadow-sm' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Secretaries
          </button>
        </div>
      </div>

      {/* Grid */}
      <div key={key} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeData.map((person, index) => (
          <div key={`${activeTab}-${index}`} className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-zinc-800 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 slide-up" style={{ animationDelay: `${index * 50}ms` }}>
            
            {/* Header: Image + Basic Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full p-0.5 border-2 border-[#1e3a8a] shrink-0 overflow-hidden">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif leading-tight">{person.name}</h3>
                <div className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 tracking-wider uppercase mt-1">
                  Tenure: {person.tenure}
                </div>
              </div>
            </div>

            {/* Quote Box */}
            <div className="bg-slate-50 dark:bg-zinc-950 p-3 rounded-xl border border-slate-100 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-400 italic flex-1 flex items-center">
              "{person.description.replace(/^"|"$/g, '')}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallOfFame;
