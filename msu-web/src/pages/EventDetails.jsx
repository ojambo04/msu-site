import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarkdown } from '../hooks/useMarkdown';
import { getImageUrl } from '../utils/getFileUrl';
import { formatDate, formatEventDate } from '../utils/formatDate';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const EventDetails = () => {
  const { slug } = useParams();
  // Fetch the individual event MD file by its slug
  const { attributes, content, loading } = useMarkdown(`events/${slug}.md`);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-[#20387b] dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const hasWriteup = content && content.trim().length > 0;

  // Only events with a markdown body have a detail page
  if (!attributes?.title || !hasWriteup) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-3xl font-bold font-serif text-slate-800 dark:text-zinc-200 mb-4">Event Not Found</h2>
        <p className="text-slate-500 dark:text-zinc-400 mb-6 max-w-md">This event does not have an extended writeup page.</p>
        <Link to="/events" className="text-[#20387b] dark:text-blue-400 hover:underline font-bold">Return to Events</Link>
      </div>
    );
  }

  const event = attributes;

  return (
    <div className="w-full flex flex-col items-center bg-[#f8fafc] dark:bg-zinc-950 min-h-screen pb-20 fade-in">
      
      {/* Hero Header */}
      <div className="w-full bg-[#20387b] pt-16 pb-24 px-4 md:px-8 overflow-hidden z-0 shadow-inner relative">
        <div className="absolute inset-0 z-[-1] opacity-20 mix-blend-overlay">
           <img src={getImageUrl('banner_abstract.png')} alt="Texture" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Link to="/events" state={{ tab: 'past' }} className="inline-flex items-center text-blue-200 hover:text-white transition-colors text-sm font-bold mb-8 group">
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </Link>
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-orange-400 text-xs font-bold tracking-widest uppercase shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatEventDate(event)}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-serif mb-6 tracking-tight leading-tight drop-shadow-sm">
            {event.title}
          </h1>
          {event.location && (
            <div className="flex items-center justify-center text-blue-100 font-medium">
              <svg className="w-5 h-5 mr-2 shrink-0 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {event.location}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8 mt-[-50px] relative z-10 slide-up" style={{ animationDelay: '150ms' }}>
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-slate-100 dark:border-zinc-800 p-8 md:p-14 mb-12">
          
          {/* Full writeup (markdown body) */}
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>

        </div>

        {/* YouTube Video Section */}
        {event.youtubeId && (
          <div className="mb-14 fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif border-l-4 border-[#20387b] pl-4">Video Highlights</h3>
            <div className="rounded-3xl overflow-hidden bg-slate-100 dark:bg-zinc-950 aspect-video shadow-lg border border-slate-200 dark:border-zinc-800">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${event.youtubeId}`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Image Gallery Section */}
        {event.images && event.images.length > 0 && (
          <div className="fade-in" style={{ animationDelay: '400ms' }}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif border-l-4 border-amber-500 pl-4">Event Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.images.map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-zinc-950 shadow-md border border-slate-200 dark:border-zinc-800 group">
                  <img src={getImageUrl(img)} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default EventDetails;
