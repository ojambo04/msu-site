import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

const EventList = ({ upcoming, ongoing, past, activeTab }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 slide-up" style={{ animationDelay: '100ms' }}>

      {/* Upcoming Events */}
      {activeTab === 'upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in">
          {(!upcoming || upcoming.length === 0) ? (
            <div className="col-span-1 md:col-span-2 text-center py-20 text-slate-500 bg-white dark:bg-zinc-900 rounded-[20px] border border-slate-200 dark:border-zinc-800 shadow-sm">
              <svg className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">No Upcoming Events</h3>
              <p>Check back later for new programs and activities.</p>
            </div>
          ) : (
            upcoming.map((event, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div className="p-8 flex-1 flex flex-col">
                  
                  {/* Date & Time Badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="bg-[#20387b] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center shadow-sm">
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(event.date)}
                    </span>
                    {event.time && (
                      <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full flex items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold font-serif text-[#0f172a] dark:text-white mb-3 leading-snug">{event.title}</h3>
                  
                  {event.location && (
                    <div className="flex items-start text-slate-500 dark:text-zinc-400 mb-4 text-[15px] font-medium">
                      <svg className="w-5 h-5 mr-2 mt-0.5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  )}

                  <p className="text-slate-600 dark:text-zinc-300 text-base leading-relaxed flex-1 mb-6">
                    {event.snippet || event.description}
                  </p>

                  {event.hasBody && (
                    <Link 
                      to={`/events/${event.slug}`}
                      className="mt-auto w-full py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-[13px] hover:bg-[#20387b] hover:text-white hover:border-[#20387b] transition-all flex justify-center items-center group"
                    >
                      View Event Details
                      <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Ongoing Programs */}
      {activeTab === 'ongoing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in">
          {(!ongoing || ongoing.length === 0) ? (
            <div className="col-span-1 md:col-span-2 text-center py-20 text-slate-500 bg-white dark:bg-zinc-900 rounded-[20px] border border-slate-200 dark:border-zinc-800 shadow-sm">
              <svg className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-xl font-bold mb-2">No Ongoing Programs</h3>
              <p>Check back later for current initiatives and drives.</p>
            </div>
          ) : (
            ongoing.map((program, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div className="p-8 flex-1 flex flex-col">
                  
                  {/* Date & Time Badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="bg-[#20387b] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center shadow-sm">
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(program.date)}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-serif text-[#0f172a] dark:text-white mb-3 leading-snug">{program.title}</h3>
                  
                  {program.location && (
                    <div className="flex items-start text-slate-500 dark:text-zinc-400 mb-4 text-[15px] font-medium">
                      <svg className="w-5 h-5 mr-2 mt-0.5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {program.location}
                    </div>
                  )}

                  <p className="text-slate-600 dark:text-zinc-300 text-base leading-relaxed flex-1 mb-6">
                    {program.snippet || program.description}
                  </p>

                  {program.hasBody && (
                    <Link 
                      to={`/events/${program.slug}`}
                      className="mt-auto w-full py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-[13px] hover:bg-[#20387b] hover:text-white hover:border-[#20387b] transition-all flex justify-center items-center group"
                    >
                      View Program Details
                      <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Past Events */}
      {activeTab === 'past' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in">
          {(!past || past.length === 0) ? (
            <div className="col-span-1 md:col-span-3 text-center py-20 text-slate-500 bg-white dark:bg-zinc-900 rounded-[20px] border border-slate-200 dark:border-zinc-800 shadow-sm">
               <svg className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">No Past Events</h3>
              <p>No historical events have been recorded yet.</p>
            </div>
          ) : (
            past.map((event, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-100 dark:border-zinc-800 shadow-[0_2px_10px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col h-full fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <span className="text-sm font-bold text-slate-400 dark:text-zinc-500 mb-3 block flex items-center">
                   <svg className="w-4 h-4 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                  {formatDate(event.date)}
                </span>
                <h3 className="text-lg font-bold font-serif text-slate-800 dark:text-zinc-200 mb-2 leading-snug">{event.title}</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed mb-4 flex-1">
                  {event.snippet || event.description}
                </p>
                {event.location && (
                  <div className="flex items-center text-xs font-semibold text-slate-400 dark:text-zinc-500 bg-slate-50 dark:bg-zinc-950/50 p-2 rounded-lg mb-4">
                    <svg className="w-3.5 h-3.5 mr-1.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {event.location}
                  </div>
                )}
                
                {event.hasBody && (
                  <Link 
                    to={`/events/${event.slug}`}
                    className="mt-auto w-full py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-[13px] hover:bg-[#20387b] hover:text-white hover:border-[#20387b] transition-all flex justify-center items-center group"
                  >
                    View Event Details
                    <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;
