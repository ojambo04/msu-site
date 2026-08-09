import React, { useState, useMemo } from 'react';

const OfficeBearers = ({ bearers }) => {
  const [filter, setFilter] = useState('All');

  const categories = useMemo(() => {
    if (!bearers) return ['All'];
    const cats = new Set(bearers.map(b => b.category));
    return ['All', ...Array.from(cats)];
  }, [bearers]);

  const filteredBearers = useMemo(() => {
    if (!bearers) return [];
    if (filter === 'All') return bearers;
    return bearers.filter(b => b.category === filter);
  }, [bearers, filter]);

  if (!bearers || bearers.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 slide-up" style={{ animationDelay: '150ms' }}>
      
      {/* Header and Filter */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-10 gap-6">
        <div>
          <h4 className="text-sm font-bold text-accent tracking-widest uppercase mb-2">Central Secretariat & Portfolios</h4>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-serif">Office Bearers Directory</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${filter === cat ? 'bg-[#20387b] text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBearers.map((person, index) => (
          <div key={`${filter}-${index}`} className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            
            {/* Top info */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#20387b] dark:text-blue-300 tracking-wider uppercase mb-1">
                  {person.category}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif leading-tight">{person.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{person.role}</p>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-700 mb-5" />

            {/* Contact Info */}
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {person.email}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {person.phone}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {person.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeBearers;
