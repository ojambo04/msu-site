import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

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
      <div key={key} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {activeData.map((person, index) => (
          <div key={`${activeTab}-${index}`} className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-2xl border border-slate-100 dark:border-zinc-800 transition-all duration-500 hover:-translate-y-2 overflow-hidden slide-up flex flex-col h-full" style={{ animationDelay: `${index * 50}ms` }}>
            
            {/* Subtle Gradient Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-150"></div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Header: Image + Basic Info */}
              <div className="flex items-center gap-5 mb-6">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative w-20 h-20 rounded-full p-[3px] bg-gradient-to-br from-[#1e3a8a] to-amber-500 shadow-md">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-zinc-900 border-2 border-white dark:border-zinc-900">
                      <img src={person.image} alt={person.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif leading-tight group-hover:text-[#1e3a8a] dark:group-hover:text-amber-400 transition-colors duration-300">{person.name}</h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 dark:bg-zinc-800/80 text-[10px] font-bold text-slate-500 dark:text-zinc-400 tracking-widest uppercase mt-2 border border-slate-200/60 dark:border-zinc-700/60 shadow-sm">
                    {person.tenure}
                  </div>
                </div>
              </div>

              {/* Quote Area */}
              <div className="relative flex-1 flex mt-2">
                <div className="flex flex-col items-center mr-4 shrink-0 mt-1">
                  <Quote className="w-5 h-5 text-slate-300 dark:text-zinc-600 transform rotate-180 group-hover:text-[#1e3a8a] dark:group-hover:text-amber-500 transition-colors duration-500 fill-current" />
                  <div className="w-[2px] flex-1 bg-slate-200 dark:bg-zinc-800 mt-2 rounded-full group-hover:bg-[#1e3a8a]/40 dark:group-hover:bg-amber-500/40 transition-colors duration-500"></div>
                </div>
                <p className="text-sm md:text-base text-slate-600 dark:text-zinc-400 italic leading-relaxed">
                  {person.description.replace(/^"|"$/g, '')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallOfFame;
