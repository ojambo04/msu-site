import React, { useState, useMemo } from 'react';
import { Search, X, Mail, MapPin, Building2, ChevronDown } from 'lucide-react';
import OfficerProfile from './OfficerProfile';

const ConstituentUnits = ({ units = [] }) => {
  const [selectedZone, setSelectedZone] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedKeys, setExpandedKeys] = useState(() => new Set());

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

  const toggleUnit = (key) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const resetFilters = () => {
    setSelectedZone('All');
    setSearchQuery('');
  };

  const isFiltered = selectedZone !== 'All' || searchQuery.trim().length > 0;

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 slide-up">

      {/* Header bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50/90 to-blue-50/60 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/30 border border-slate-200/90 dark:border-zinc-800 p-6 md:p-8 mb-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#20387b] via-blue-600 to-amber-500"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/70 text-[#20387b] dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 mb-3">
              <Building2 className="w-3.5 h-3.5 text-amber-500" />
              Directory & Regional Network
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              Constituent Units
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Official leadership directory across the constituent units of the Mao Students' Union. Select any unit to view its leadership and contact details.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/80 shadow-sm text-xs md:text-sm font-medium text-slate-600 dark:text-zinc-300 shrink-0">
            <span>Showing</span>
            <span className="font-bold text-[#20387b] dark:text-blue-300">{filteredUnits.length}</span>
            <span>of {units.length} units</span>
          </div>
        </div>
      </div>

      {/* Sleek Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">

        {/* Zone Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 flex-wrap">
          {zones.map((zone) => {
            const isActive = selectedZone === zone;
            const count = zoneCounts[zone];

            return (
              <button
                key={zone}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-150 cursor-pointer select-none shrink-0 ${
                  isActive
                    ? 'bg-[#20387b] text-white shadow-md shadow-blue-950/15'
                    : 'bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                <span>{zone}</span>
                {count !== undefined && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
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
        <div className="relative w-full md:w-80 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search unit or officer..."
            className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 placeholder-slate-400 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-[#20387b] dark:focus:border-blue-500 focus:ring-2 focus:ring-[#20387b]/10 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Accordion Directory List */}
      {filteredUnits.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
          <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">No constituent units found</p>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or switching to another zone filter.
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#20387b] dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700 transition-colors"
            >
              <X className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredUnits.map((unit, index) => {
            const unitKey = unit.name || String(index);
            const isExpanded = expandedKeys.has(unitKey);

            return (
              <div
                key={unitKey}
                className={`bg-white dark:bg-zinc-900 rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-blue-200 dark:border-blue-900/60 shadow-md'
                    : 'border-slate-200/90 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-[0_2px_8px_rgb(0,0,0,0.02)]'
                }`}
              >
                {/* Accordion Trigger Row */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleUnit(unitKey)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleUnit(unitKey);
                    }
                  }}
                  aria-expanded={isExpanded}
                  className="w-full px-5 py-4 md:px-6 md:py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <span className="text-[11px] font-bold text-[#20387b] dark:text-blue-300 tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/50 shrink-0">
                        {unit.zone || 'Constituent Unit'}
                      </span>

                      {unit.location && (
                        <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium inline-flex items-center gap-1 truncate">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                          <span className="truncate">{unit.location}</span>
                        </span>
                      )}

                      {unit.email && (
                        <a
                          href={`mailto:${unit.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-slate-500 dark:text-zinc-400 hover:text-[#20387b] dark:hover:text-blue-400 font-medium inline-flex items-center gap-1 truncate transition-colors"
                          title={unit.email}
                        >
                          <Mail className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                          <span className="truncate">{unit.email}</span>
                        </a>
                      )}
                    </div>

                    <h3 className="text-base md:text-lg font-bold font-serif text-slate-900 dark:text-white leading-snug group-hover:text-[#20387b] dark:group-hover:text-blue-400 transition-colors truncate">
                      {unit.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline text-xs font-medium text-slate-400 dark:text-zinc-500">
                      {isExpanded ? 'Hide details' : 'View leadership'}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isExpanded
                          ? 'bg-[#20387b] text-white rotate-180'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 group-hover:bg-slate-200 dark:group-hover:bg-zinc-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Accordion Expanded Panel */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-4 md:px-6 md:pb-6 border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/40 dark:bg-zinc-950/30 fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <OfficerProfile
                        role="President"
                        name={unit.president}
                        phone={unit.presidentPhone}
                        image={unit.presidentImage}
                      />
                      <OfficerProfile
                        role="Gen. Secretary"
                        name={unit.secretary}
                        phone={unit.secretaryPhone}
                        image={unit.secretaryImage}
                      />
                    </div>

                    {unit.email && (
                      <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-slate-400 dark:text-zinc-500 font-medium">Official Email</span>
                        <a
                          href={`mailto:${unit.email}`}
                          className="inline-flex items-center gap-1.5 font-semibold text-slate-700 dark:text-zinc-300 hover:text-[#20387b] dark:hover:text-blue-400 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{unit.email}</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default ConstituentUnits;
