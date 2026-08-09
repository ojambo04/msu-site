import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMarkdown } from '../hooks/useMarkdown';
import EventList from '../components/EventList';
import TabNavigation from '../components/TabNavigation';
import HeroBanner from '../components/HeroBanner';

const Events = () => {
  const { attributes, loading } = useMarkdown('events.md');
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'upcoming');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-[#20387b] dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const { header, upcoming, ongoing, past } = attributes;

  return (
    <div className="w-full flex flex-col items-center bg-[#f8fafc] dark:bg-slate-900 min-h-screen fade-in">
      
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
