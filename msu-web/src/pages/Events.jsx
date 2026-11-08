import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useContentIndex } from '../hooks/useContentIndex';
import { getEffectiveEventStatus } from '../utils/eventStatus';
import EventList from '../components/EventList';
import TabNavigation from '../components/TabNavigation';
import HeroBanner from '../components/HeroBanner';

const Events = () => {
  const { data, loading } = useContentIndex('events');
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'upcoming');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-[#20387b] dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const { header, events = [] } = data;

  // Split the flat events array by real-time effective status based on current date
  // Upcoming events are sorted chronologically ascending (closest upcoming first)
  const upcoming = events
    .filter(e => getEffectiveEventStatus(e) === 'upcoming')
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  const ongoing  = events.filter(e => getEffectiveEventStatus(e) === 'ongoing');

  // Past events are sorted descending (most recent first)
  const past     = events
    .filter(e => getEffectiveEventStatus(e) === 'past')
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <div className="w-full flex flex-col items-center bg-[#f8fafc] dark:bg-zinc-950 min-h-screen fade-in">
      
      <HeroBanner 
        title={header?.title || "Events & Programs"} 
        subtitle={header?.subtitle} 
      />

      {/* Main Navigation - Floating Bar */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-[-40px] relative z-10">
        <TabNavigation 
          tabs={[
            { id: 'upcoming', label: 'Upcoming Events' },
            { id: 'ongoing', label: 'Ongoing Programs' },
            { id: 'past', label: 'Past Events' },
          ]} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>

      {/* Main Content Area */}
      <div className="w-full mt-4">
        <EventList upcoming={upcoming} ongoing={ongoing} past={past} activeTab={activeTab} />
      </div>

    </div>
  );
};

export default Events;
