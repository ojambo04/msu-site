import React from 'react';
import { Phone, Mail, MapPin, User, Building2 } from 'lucide-react';

const SubordinateBodies = ({ bodies = [] }) => {
  if (!bodies || bodies.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto py-16 px-6 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
        <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">No subordinate bodies listed yet</p>
        <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">Details will appear here once configured in the CMS.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 slide-up">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-200/80 dark:border-zinc-800 pb-6">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 dark:text-zinc-500 uppercase">
            Apex Regional Leadership
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-serif mt-1">
            4 Subordinate Bodies
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1 max-w-2xl">
            Official executive directory of the four apex subordinate bodies of the Mao Students' Union across Imphal, Senapati, Kohima, and Dimapur.
          </p>
        </div>

        <div className="text-xs font-medium text-slate-500 dark:text-zinc-400 shrink-0">
          Showing <span className="font-semibold text-slate-900 dark:text-white">{bodies.length}</span> bodies
        </div>
      </div>

      {/* Grid of 4 Bodies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bodies.map((body, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200/80 dark:border-zinc-800 shadow-[0_2px_8px_rgb(0,0,0,0.02)] hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            {/* Hairline top hover accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#20387b] dark:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div>
              {/* Meta: Zone & Location */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 border border-slate-200/50 dark:border-zinc-700/50">
                  {body.zone || 'Apex Body'}
                </span>

                {body.location && (
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium inline-flex items-center gap-1 truncate max-w-[180px]">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{body.location}</span>
                  </span>
                )}
              </div>

              {/* Body Title */}
              <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white leading-snug group-hover:text-[#20387b] dark:group-hover:text-blue-400 transition-colors mb-2">
                {body.name}
              </h3>

              {/* Description */}
                {body.description && (
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mb-5">
                    {body.description}
                  </p>
                )}

                {/* 2-Column Leadership Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3.5 border-t border-slate-100 dark:border-zinc-800/80">
                  {/* President */}
                  <div className="flex flex-col justify-between">
                    <span className="text-[9.5px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase flex items-center gap-1 mb-1">
                      <User className="w-2.5 h-2.5" />
                      President
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200 truncate">
                      {body.president || 'In Office'}
                    </p>
                    <div className="mt-1">
                      {body.presidentPhone ? (
                        <a
                          href={`tel:${body.presidentPhone}`}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-zinc-400 hover:text-[#20387b] dark:hover:text-blue-400 transition-colors"
                          title={`Call President (${body.presidentPhone})`}
                        >
                          <Phone className="w-2.5 h-2.5 text-slate-400" />
                          <span>{body.presidentPhone}</span>
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
                      {body.secretary || 'In Office'}
                    </p>
                    <div className="mt-1">
                      {body.secretaryPhone ? (
                        <a
                          href={`tel:${body.secretaryPhone}`}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-zinc-400 hover:text-[#20387b] dark:hover:text-blue-400 transition-colors"
                          title={`Call Secretary (${body.secretaryPhone})`}
                        >
                          <Phone className="w-2.5 h-2.5 text-slate-400" />
                          <span>{body.secretaryPhone}</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400 dark:text-zinc-600">—</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Footer Link */}
              {body.email && (
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 dark:text-zinc-500">Official Email</span>
                  <a
                    href={`mailto:${body.email}`}
                    className="inline-flex items-center gap-1 font-medium text-slate-600 dark:text-zinc-400 hover:text-[#20387b] dark:hover:text-blue-400 truncate max-w-[200px] transition-colors"
                    title={body.email}
                  >
                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{body.email}</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
    </div>
  );
};

export default SubordinateBodies;
