import React, { useState } from 'react';
import { Mail, MapPin, Building2 } from 'lucide-react';
import OfficerProfile from './OfficerProfile';

const SubordinateBodies = ({ bodies = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!bodies || bodies.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto py-16 px-6 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800">
        <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">No subordinate bodies listed yet</p>
        <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">Details will appear here once configured in the CMS.</p>
      </div>
    );
  }

  const safeIndex = activeIndex < bodies.length ? activeIndex : 0;
  const activeBody = bodies[safeIndex];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 slide-up">
      {/* Section Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50/90 to-blue-50/60 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/30 border border-slate-200/90 dark:border-zinc-800 p-6 md:p-8 mb-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#20387b] via-blue-600 to-amber-500"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/70 text-[#20387b] dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 mb-3">
              <Building2 className="w-3.5 h-3.5 text-amber-500" />
              Apex Regional Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              {bodies.length} Subordinate Bodies
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Official executive directory of the apex subordinate bodies of the Mao Students' Union. Select a body below to view its leadership.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/80 shadow-sm text-xs md:text-sm font-medium text-slate-600 dark:text-zinc-300 shrink-0">
            <span>Apex Bodies:</span>
            <span className="font-bold text-[#20387b] dark:text-blue-300">{bodies.length}</span>
          </div>
        </div>
      </div>

      {/* Selector Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {bodies.map((body, index) => {
          const isSelected = index === safeIndex;
          return (
            <button
              key={body.name || index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#20387b] text-white border-[#20387b] shadow-lg shadow-blue-950/15'
                  : 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border-slate-200/90 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
              }`}
            >
              <span
                className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full mb-2 ${
                  isSelected
                    ? 'bg-white/15 text-amber-300'
                    : 'bg-blue-50 dark:bg-blue-950/60 text-[#20387b] dark:text-blue-300'
                }`}
              >
                {body.zone || 'Apex Body'}
              </span>
              <h3 className="text-sm font-bold font-serif leading-snug line-clamp-2">
                {body.name}
              </h3>
              {body.location && (
                <p
                  className={`text-[11px] mt-1.5 flex items-center gap-1 truncate ${
                    isSelected ? 'text-blue-100' : 'text-slate-400 dark:text-zinc-500'
                  }`}
                >
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{body.location}</span>
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Spotlight Detail Card */}
      <div
        key={safeIndex}
        className="relative bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-slate-200/90 dark:border-zinc-800 shadow-[0_4px_24px_rgb(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgb(0,0,0,0.25)] overflow-hidden fade-in"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#20387b] via-blue-600 to-amber-500"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="text-[11px] font-bold text-[#20387b] dark:text-blue-300 tracking-wider uppercase px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/50">
            {activeBody.zone || 'Apex Body'}
          </span>

          {activeBody.location && (
            <span className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 font-medium inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-500" />
              <span>{activeBody.location}</span>
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-serif text-slate-900 dark:text-white leading-snug mb-2">
          {activeBody.name}
        </h3>

        {activeBody.description && (
          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-3xl">
            {activeBody.description}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-slate-100 dark:border-zinc-800/80">
          <OfficerProfile
            role="President"
            name={activeBody.president}
            phone={activeBody.presidentPhone}
            image={activeBody.presidentImage}
          />
          <OfficerProfile
            role="Gen. Secretary"
            name={activeBody.secretary}
            phone={activeBody.secretaryPhone}
            image={activeBody.secretaryImage}
          />
        </div>

        {activeBody.email && (
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
            <span className="text-slate-400 dark:text-zinc-500 font-medium">Official Email</span>
            <a
              href={`mailto:${activeBody.email}`}
              className="inline-flex items-center gap-1.5 font-semibold text-slate-700 dark:text-zinc-300 hover:text-[#20387b] dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{activeBody.email}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubordinateBodies;
