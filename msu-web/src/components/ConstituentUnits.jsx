import React, { useState, useMemo } from 'react';
import { Search, X, Phone, Mail, MapPin, User, Building2 } from 'lucide-react';

const ConstituentUnits = ({ units = [] }) => {
  const [selectedZone, setSelectedZone] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate unique zones and counts
  const { zones, zoneCounts } = useMemo(() => {
    if (!units || units.length === 0) {
      return { zones: ['All'], zoneCounts: { All: 0 } };
    }

    const counts = { All: units.length };
    const zSet = new Set();

    units.forEach((u) => {
      const z = u.zone || 'Other';
      zSet.add(z);
      counts[z] = (counts[z] || 0) + 1;
    });

    return {
      zones: ['All', ...Array.from(zSet)],
      zoneCounts: counts
    };
  }, [units]);

  // Filter units by zone and search query
  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      const matchesZone = selectedZone === 'All' || unit.zone === selectedZone;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesZone;

      return (
        matchesZone &&
        ((unit.name && unit.name.toLowerCase().includes(q)) ||
          (unit.location && unit.location.toLowerCase().includes(q)) ||
          (unit.zone && unit.zone.toLowerCase().includes(q)) ||
          (unit.president && unit.president.toLowerCase().includes(q)) ||
          (unit.secretary && unit.secretary.toLowerCase().includes(q)) ||
          (unit.presidentPhone && unit.presidentPhone.toLowerCase().includes(q)) ||
          (unit.secretaryPhone && unit.secretaryPhone.toLowerCase().includes(q)) ||
          (unit.email && unit.email.toLowerCase().includes(q)))
      );
    });
  }, [units, selectedZone, searchQuery]);

  const resetFilters = () => {
    setSelectedZone('All');
    setSearchQuery('');
  };

  const isFiltered = selectedZone !== 'All' || searchQuery.trim().length > 0;

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 slide-up">

      {/* Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-200/80 dark:border-zinc-800 pb-6">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 dark:text-zinc-500 uppercase">
            Directory & Regional Network
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-serif mt-1">
            Constituent Units
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1 max-w-2xl">
            Official leadership directory across the 27 constituent units of the Mao Students' Union.
          </p>
        </div>

        <div className="text-xs font-medium text-slate-500 dark:text-zinc-400 shrink-0">
          Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredUnits.length}</span> of {units.length} units
        </div>
      </div>

      {/* Sleek Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
        
        {/* Zone Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 flex-wrap">
          {zones.map((zone) => {
            const isActive = selectedZone === zone;
            const count = zoneCounts[zone];

            return (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none shrink-0 ${
                  isActive
                    ? 'bg-[#20387b] text-white shadow-sm'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <span>{zone}</span>
                {count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Minimal Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search unit or officer..."
            className="w-full pl-9 pr-8 py-2 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 placeholder-slate-400 text-xs rounded-lg border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-[#20387b] dark:focus:border-blue-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Units */}
      {filteredUnits.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
          <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">No constituent units found</p>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or switching to another zone filter.
          </p>
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#20387b] dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700 transition-colors"
            >
              <X className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUnits.map((unit, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-slate-200/80 dark:border-zinc-800 shadow-[0_2px_8px_rgb(0,0,0,0.02)] hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Hairline top hover accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#20387b] dark:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                {/* Meta Header: Zone & Location */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 border border-slate-200/50 dark:border-zinc-700/50">
                    {unit.zone || 'Constituent Unit'}
                  </span>

                  {unit.location && (
                    <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium inline-flex items-center gap-1 truncate max-w-[170px]">
                      <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                      <span className="truncate">{unit.location}</span>
                    </span>
                  )}
                </div>

                {/* Unit Name */}
                <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white leading-snug group-hover:text-[#20387b] dark:group-hover:text-blue-400 transition-colors mb-4">
                  {unit.name}
                </h3>

                {/* Leadership Section: 2-Column Clean Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3.5 border-t border-slate-100 dark:border-zinc-800/80">
                    
                    {/* President */}
                    <div className="flex flex-col justify-between">
                      <span className="text-[9.5px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase flex items-center gap-1 mb-1">
                        <User className="w-2.5 h-2.5" />
                        President
                      </span>
                      <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200 truncate">
                        {unit.president || 'In Office'}
                      </p>
                      <div className="mt-1">
                        {unit.presidentPhone ? (
                          <a
                            href={`tel:${unit.presidentPhone}`}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-zinc-400 hover:text-[#20387b] dark:hover:text-blue-400 transition-colors"
                            title={`Call President (${unit.presidentPhone})`}
                          >
                            <Phone className="w-2.5 h-2.5 text-slate-400" />
                            <span>{unit.presidentPhone}</span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-400 dark:text-zinc-600">—</span>
                        )}
                      </div>
                    </div>

                    {/* General Secretary */}
                    <div className="flex flex-col justify-between">
                      <span className="text-[9.5px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase flex items-center gap-1 mb-1">
                        <User className="w-2.5 h-2.5" />
                        Gen. Secretary
                      </span>
                      <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200 truncate">
                        {unit.secretary || 'In Office'}
                      </p>
                      <div className="mt-1">
                        {unit.secretaryPhone ? (
                          <a
                            href={`tel:${unit.secretaryPhone}`}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-zinc-400 hover:text-[#20387b] dark:hover:text-blue-400 transition-colors"
                            title={`Call Secretary (${unit.secretaryPhone})`}
                          >
                            <Phone className="w-2.5 h-2.5 text-slate-400" />
                            <span>{unit.secretaryPhone}</span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-400 dark:text-zinc-600">—</span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Footer: Email Link */}
                {unit.email && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 dark:text-zinc-500">Official Email</span>
                    <a
                      href={`mailto:${unit.email}`}
                      className="inline-flex items-center gap-1 font-medium text-slate-600 dark:text-zinc-400 hover:text-[#20387b] dark:hover:text-blue-400 truncate max-w-[180px] transition-colors"
                      title={unit.email}
                    >
                      <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{unit.email}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

    </div>
  );
};

export default ConstituentUnits;
