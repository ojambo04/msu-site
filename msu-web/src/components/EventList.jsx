import React from 'react';
import EventCard from './EventCard';

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
              <EventCard
                key={event.slug || index}
                event={event}
                variant="featured"
                showTime
                ctaLabel="View Event Details"
              />
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
              <EventCard
                key={program.slug || index}
                event={program}
                variant="featured"
                ctaLabel="View Program Details"
              />
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
              <EventCard
                key={event.slug || index}
                event={event}
                variant="compact"
                ctaLabel="View Event Details"
                animationDelay={`${index * 50}ms`}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;
