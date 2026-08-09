import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PageRenderer from '../components/PageRenderer';
import { useMarkdown } from '../hooks/useMarkdown';

const Home = () => {
  const { attributes: homeData } = useMarkdown('home.md');
  const { attributes: eventsData } = useMarkdown('events.md');
  const { attributes: noticesData } = useMarkdown('notices.md');
  const { attributes: aboutData } = useMarkdown('about.md');

  const upcomingEvents = eventsData?.upcoming?.slice(0, 3) || [];
  const latestNotices = noticesData?.notices?.slice(0, 3) || [];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[75vh] flex items-center bg-[#152759] overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-20 mt-8">

          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border border-amber-500/80 rounded-full px-5 py-2 bg-transparent text-amber-500 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
              <span className="text-amber-400">✧</span> {homeData?.hero?.badge || 'ESTABLISHED 1933 • 93 YEARS OF EXCELLENCE'}
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white font-serif tracking-tight mb-3 leading-[1.1]">
              {homeData?.hero?.title || "Mao Students' Union"}
            </h1>
            <h2 className="text-3xl md:text-4xl italic font-serif text-amber-500 mb-8 font-medium">
              {homeData?.hero?.subtitle || '"Sacrifice and Progress"'}
            </h2>

            <p className="text-lg text-blue-100 mb-10 leading-relaxed max-w-2xl font-light">
              {homeData?.hero?.description || "Welcome to the official web portal of the Mao Students' Union (MSU). Advancing student welfare, nurturing leadership, preserving tribal cultural heritage, and driving environmental conservation across 27 constituent units."}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a href={homeData?.hero?.primaryButton?.link || "/students"} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-bold py-3.5 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg">
                <span className="text-lg">{homeData?.hero?.primaryButton?.icon || '🎓'}</span> {homeData?.hero?.primaryButton?.text || 'Explore Scholarships & Services'}
              </a>
              <a href={homeData?.hero?.secondaryButton?.link || "/about"} className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-bold py-3.5 px-8 rounded-full border border-amber-500 hover:border-amber-400 transition-colors flex items-center justify-center gap-2">
                <span className="text-amber-500">{homeData?.hero?.secondaryButton?.icon || '📖'}</span> {homeData?.hero?.secondaryButton?.text || 'Read Union History & Constitution'}
              </a>
            </div>
            {/* <div className="mt-8 flex justify-center sm:justify-start w-full">
              <a href="/contact" className="text-slate-300 hover:text-white flex items-center gap-1.5 font-medium transition-colors text-sm border-b border-transparent hover:border-white pb-0.5">
                Submit Grievance <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div> */}
          </div>

          {/* Right Content - Stats Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="bg-[#0f172a] rounded-[2rem] p-8 border border-slate-700 shadow-2xl w-full max-w-[420px] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-amber-500"></div>

              <div className="flex-1 flex flex-col items-center justify-center py-8">
                <div className="w-32 h-32 mb-8 relative flex items-center justify-center">
                  <img src="/images/logo.png" alt="MSU Logo" className="w-full h-full object-contain drop-shadow-2xl z-10 relative" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="w-full h-full rounded-full border-[3px] border-[#25418b] hidden flex-col items-center justify-center bg-white shadow-inner">
                    <span className="text-[#25418b] font-black text-2xl">MSU</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white font-serif tracking-widest text-center">{homeData?.secretariat?.title || 'CENTRAL SECRETARIAT'}</h3>
                <p className="text-amber-500 italic font-serif text-center mt-2 font-medium">{homeData?.secretariat?.location || 'Tadubi Sub-Division & Senapati, Manipur'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-900 rounded-xl p-5 text-center border border-slate-800 shadow-inner">
                  <div className="text-3xl font-black text-amber-500 mb-2">{homeData?.secretariat?.stats?.[0]?.value || '27'}</div>
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest" dangerouslySetInnerHTML={{ __html: homeData?.secretariat?.stats?.[0]?.label || 'CONSTITUENT<br />UNITS' }}></div>
                </div>
                <div className="bg-slate-900 rounded-xl p-5 text-center border border-slate-800 shadow-inner">
                  <div className="text-3xl font-black text-amber-500 mb-2">{homeData?.secretariat?.stats?.[1]?.value || '4'}</div>
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest" dangerouslySetInnerHTML={{ __html: homeData?.secretariat?.stats?.[1]?.label || 'SUBORDINATE<br />BODIES' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative -mt-32 z-20">

          <NavLink to={homeData?.features?.[0]?.link || "/leadership"} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:-translate-y-4 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 border border-white dark:border-slate-700 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-400/10 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-inner border border-blue-200/50 dark:border-blue-700/50">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-serif">{homeData?.features?.[0]?.title || 'Leadership'}</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">{homeData?.features?.[0]?.description || 'Meet the Executive Council and Constituent Units leading our union forward.'}</p>
          </NavLink>

          <NavLink to={homeData?.features?.[1]?.link || "/students"} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:-translate-y-4 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 border border-white dark:border-slate-700 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 dark:bg-amber-400/10 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform shadow-inner border border-amber-200/50 dark:border-amber-700/50">
              <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-serif">{homeData?.features?.[1]?.title || "Student's Corner"}</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">{homeData?.features?.[1]?.description || 'Access scholarships, important downloads, and resources for students.'}</p>
          </NavLink>

          <NavLink to={homeData?.features?.[2]?.link || "/notices"} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:-translate-y-4 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 border border-white dark:border-slate-700 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-400/10 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-inner border border-emerald-200/50 dark:border-emerald-700/50">
              <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-serif">{homeData?.features?.[2]?.title || 'Notices & Press'}</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">{homeData?.features?.[2]?.description || 'Stay informed with the latest press releases and official union notices.'}</p>
          </NavLink>

        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 bg-slate-50 dark:bg-slate-900 relative z-20 pb-12">
        <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 dark:border-slate-700 py-10 flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-700">

          <div className="flex-1 w-full text-center py-4 md:py-0">
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-[#5d6042] dark:text-[#a3a873] mb-2">{homeData?.stats?.[0]?.value || '93+ Years'}</h3>
            <p className="text-[11px] font-bold text-[#d97706] dark:text-amber-500 uppercase tracking-[0.15em]">{homeData?.stats?.[0]?.label || 'ESTD 1933'}</p>
          </div>

          <div className="flex-1 w-full text-center py-4 md:py-0">
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-[#5d6042] dark:text-[#a3a873] mb-2">{homeData?.stats?.[1]?.value || '27 Units'}</h3>
            <p className="text-[11px] font-bold text-[#d97706] dark:text-amber-500 uppercase tracking-[0.15em]">{homeData?.stats?.[1]?.label || 'ACROSS REGIONS'}</p>
          </div>

          <div className="flex-1 w-full text-center py-4 md:py-0">
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-[#5d6042] dark:text-[#a3a873] mb-2">{homeData?.stats?.[2]?.value || '4 Bodies'}</h3>
            <p className="text-[11px] font-bold text-[#d97706] dark:text-amber-500 uppercase tracking-[0.15em]">{homeData?.stats?.[2]?.label || 'SUBORDINATE CELLS'}</p>
          </div>

          <div className="flex-1 w-full text-center py-4 md:py-0">
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-[#5d6042] dark:text-[#a3a873] mb-2">{homeData?.stats?.[3]?.value || '15,000+'}</h3>
            <p className="text-[11px] font-bold text-[#d97706] dark:text-amber-500 uppercase tracking-[0.15em]">{homeData?.stats?.[3]?.label || 'STUDENTS REPRESENTED'}</p>
          </div>

        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl translate-y-1/4 translate-x-1/4"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          {/* Mission Card */}
          <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

            <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase mb-6">{aboutData?.mission?.tag || 'CORE MISSION'}</h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 shrink-0 bg-blue-50 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm border border-blue-100 dark:border-blue-800/50">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white leading-tight">{aboutData?.mission?.title || 'Our Mission'}</h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg flex-1">{aboutData?.mission?.content}</p>
          </div>

          {/* Vision Card */}
          <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 to-orange-500"></div>

            <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-[0.2em] uppercase mb-6">{aboutData?.vision?.tag || 'ENDURING VISION'}</h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 shrink-0 bg-amber-50 dark:bg-amber-900/40 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-amber-100 dark:border-amber-800/50">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white leading-tight">{aboutData?.vision?.title || 'Our Vision'}</h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg flex-1">{aboutData?.vision?.content}</p>
          </div>
        </div>
      </section>

      {/* Latest Updates & Events */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Upcoming Events Widget */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white mb-2">Upcoming Events</h2>
                <div className="h-1 w-20 bg-amber-500 rounded-full"></div>
              </div>
              <Link to="/events" className="text-sm font-bold text-[#20387b] dark:text-blue-400 hover:underline flex items-center">
                View All
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5">
                    <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 rounded-xl p-3 flex flex-col items-center justify-center min-w-[70px]">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">{event.date?.split(' ')[0] || 'TBA'}</span>
                      <span className="text-2xl font-black text-amber-700 dark:text-amber-400">{event.date?.split(' ')[1]?.replace(',', '') || '--'}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{event.title}</h4>
                      <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time || 'Time TBA'}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl text-center border border-slate-100 dark:border-slate-700">
                  <p className="text-slate-500 font-medium">No upcoming events at the moment.</p>
                </div>
              )}
            </div>
          </div>

          {/* Latest Notices Widget */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white mb-2">Latest Notices</h2>
                <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
              </div>
              <Link to="/notices" className="text-sm font-bold text-[#20387b] dark:text-blue-400 hover:underline flex items-center">
                View All
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="space-y-4">
              {latestNotices.length > 0 ? (
                latestNotices.map((notice, i) => (
                  <Link to="/notices" key={i} className="block bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded">
                        {notice.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{notice.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">{notice.title}</h4>
                    <div className="text-xs text-slate-500 font-mono">Ref: {notice.ref}</div>
                  </Link>
                ))
              ) : (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl text-center border border-slate-100 dark:border-slate-700">
                  <p className="text-slate-500 font-medium">No recent notices available.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Social Media Banner */}
      <section className="pb-24 px-6 relative z-10 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto bg-[#20387b] rounded-[30px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mb-4">{homeData?.socials?.title || "Connect with Mao Students' Union Social Channels"}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{homeData?.socials?.description || "Stay updated with daily announcements, cultural videos, literary meet archives, and sports updates on our official social handles."}</p>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-end gap-4 shrink-0">
            <a href={homeData?.socials?.links?.facebook || "#"} className="flex items-center gap-2 bg-[#25418b] hover:bg-[#1c326b] text-white font-bold py-2 px-4 rounded-full transition-colors text-xs">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" /></svg>
              Facebook
            </a>
            <a href={homeData?.socials?.links?.instagram || "#"} className="flex items-center gap-2 bg-[#25418b] hover:bg-[#1c326b] text-white font-bold py-2 px-4 rounded-full transition-colors text-xs">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Instagram
            </a>
            <a href={homeData?.socials?.links?.youtube || "#"} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-full transition-colors text-xs">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
