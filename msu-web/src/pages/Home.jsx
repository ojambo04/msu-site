import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Target, Eye } from 'lucide-react';
import { useMarkdown } from '../hooks/useMarkdown';
import { getImageUrl } from '../utils/getFileUrl';

const Home = () => {
  const { attributes: homeData } = useMarkdown('home.md');
  const { attributes: eventsData } = useMarkdown('events.md');
  const { attributes: noticesData } = useMarkdown('notices.md');
  const { attributes: aboutData } = useMarkdown('about.md');
  const { attributes: contactData } = useMarkdown('contact.md');

  const upcomingEvents = eventsData?.upcoming?.slice(0, 3) || [];
  const latestNotices = noticesData?.notices?.slice(0, 3) || [];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[75vh] flex items-center bg-[#152759] overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-20 mt-2">

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
          </div>

          {/* Right Content - Stats Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="bg-[#0f172a] rounded-[2rem] p-6 border border-slate-700 shadow-2xl w-full max-w-[420px] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-amber-500"></div>

              <div className="flex-1 flex flex-col items-center justify-center py-4">
                <div className="w-36 h-36 mb-5 relative flex items-center justify-center bg-white rounded-full overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-4 border-slate-800">
                  <img src={getImageUrl('logo.png')} alt="MSU Logo" className="w-full h-full object-contain object-center p-2 z-10 relative" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="w-full h-full rounded-full hidden flex-col items-center justify-center bg-white">
                    <span className="text-[#25418b] font-black text-2xl">MSU</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white font-serif tracking-widest text-center">{homeData?.secretariat?.title || 'CENTRAL SECRETARIAT'}</h3>
                <p className="text-amber-500 italic font-serif text-center mt-1.5 font-medium text-[15px]">{homeData?.secretariat?.location || 'Tadubi Sub-Division & Senapati, Manipur'}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-[#15203c] rounded-xl p-4 text-center border border-slate-800 shadow-inner">
                  <div className="text-3xl font-black text-amber-500 mb-1">{homeData?.secretariat?.stats?.[0]?.value || '27'}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed" dangerouslySetInnerHTML={{ __html: homeData?.secretariat?.stats?.[0]?.label || 'CONSTITUENT<br />UNITS' }}></div>
                </div>
                <div className="bg-[#15203c] rounded-xl p-4 text-center border border-slate-800 shadow-inner">
                  <div className="text-3xl font-black text-amber-500 mb-1">{homeData?.secretariat?.stats?.[1]?.value || '4'}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed" dangerouslySetInnerHTML={{ __html: homeData?.secretariat?.stats?.[1]?.label || 'SUBORDINATE<br />BODIES' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-zinc-950 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative -mt-32 z-20">

          <NavLink to={homeData?.features?.[0]?.link || "/leadership"} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-zinc-800 group relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#152759] to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#152759] transition-colors duration-300 shadow-sm border border-slate-100 dark:border-zinc-700">
              <svg className="w-8 h-8 text-[#152759] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#152759] dark:text-white mb-3 font-serif group-hover:text-amber-500 transition-colors duration-300">{homeData?.features?.[0]?.title || 'Leadership'}</h3>
            <p className="text-slate-600 dark:text-zinc-400 font-medium">{homeData?.features?.[0]?.description || 'Meet the Executive Council and Constituent Units leading our union forward.'}</p>
          </NavLink>

          <NavLink to={homeData?.features?.[1]?.link || "/students"} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-zinc-800 group relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-300 shadow-sm border border-slate-100 dark:border-zinc-700">
              <svg className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#152759] dark:text-white mb-3 font-serif group-hover:text-amber-500 transition-colors duration-300">{homeData?.features?.[1]?.title || "Student's Corner"}</h3>
            <p className="text-slate-600 dark:text-zinc-400 font-medium">{homeData?.features?.[1]?.description || 'Access scholarships, important downloads, and resources for students.'}</p>
          </NavLink>

          <NavLink to={homeData?.features?.[2]?.link || "/notices"} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-zinc-800 group relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#20387b] to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#20387b] transition-colors duration-300 shadow-sm border border-slate-100 dark:border-zinc-700">
              <svg className="w-8 h-8 text-[#20387b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#152759] dark:text-white mb-3 font-serif group-hover:text-amber-500 transition-colors duration-300">{homeData?.features?.[2]?.title || 'Notices & Press'}</h3>
            <p className="text-slate-600 dark:text-zinc-400 font-medium">{homeData?.features?.[2]?.description || 'Stay informed with the latest press releases and official union notices.'}</p>
          </NavLink>

        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 bg-slate-50 dark:bg-zinc-950 relative z-20 pb-16">
        <div className="max-w-6xl mx-auto bg-[#152759] dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-[#20387b] dark:border-zinc-800 py-12 flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x divide-[#20387b] dark:divide-zinc-800 relative overflow-hidden">
          {/* Subtle background pattern for stats */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

          <div className="flex-1 w-full text-center py-6 md:py-0 relative z-10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{homeData?.stats?.[0]?.value || '93+ Years'}</h3>
            <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">{homeData?.stats?.[0]?.label || 'ESTD 1933'}</p>
          </div>

          <div className="flex-1 w-full text-center py-6 md:py-0 relative z-10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{homeData?.stats?.[1]?.value || '27 Units'}</h3>
            <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">{homeData?.stats?.[1]?.label || 'ACROSS REGIONS'}</p>
          </div>

          <div className="flex-1 w-full text-center py-6 md:py-0 relative z-10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{homeData?.stats?.[2]?.value || '4 Bodies'}</h3>
            <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">{homeData?.stats?.[2]?.label || 'SUBORDINATE CELLS'}</p>
          </div>

          <div className="flex-1 w-full text-center py-6 md:py-0 relative z-10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{homeData?.stats?.[3]?.value || '15,000+'}</h3>
            <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">{homeData?.stats?.[3]?.label || 'STUDENTS REPRESENTED'}</p>
          </div>

        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-white dark:bg-zinc-950 px-6 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-3">Our Core Purpose</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-serif tracking-tight">Mission & Vision</h3>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#1e3a8a] to-amber-500 rounded-full mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div className="group relative bg-slate-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:shadow-2xl border border-slate-200/60 dark:border-zinc-800 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-[#1e3a8a] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                      <Target className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold font-serif text-slate-900 dark:text-white leading-tight">{aboutData?.mission?.title || 'Our Mission'}</h4>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-500/50 to-transparent rounded-full"></div>
                  <p className="text-slate-600 dark:text-zinc-300 leading-relaxed text-lg md:text-xl pl-6">
                    {aboutData?.mission?.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-slate-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:shadow-2xl border border-slate-200/60 dark:border-zinc-800 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-amber-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Eye className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold font-serif text-slate-900 dark:text-white leading-tight">{aboutData?.vision?.title || 'Our Vision'}</h4>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-amber-500/50 to-transparent rounded-full"></div>
                  <p className="text-slate-600 dark:text-zinc-300 leading-relaxed text-lg md:text-xl pl-6">
                    {aboutData?.vision?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates & Events */}
      <section className="py-24 bg-slate-50 dark:bg-zinc-950 px-6">
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
                  <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5">
                    <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 rounded-xl p-3 flex flex-col items-center justify-center min-w-[70px]">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">{event.date?.split(' ')[0] || 'TBA'}</span>
                      <span className="text-2xl font-black text-amber-700 dark:text-amber-400">{event.date?.split(' ')[1]?.replace(',', '') || '--'}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{event.title}</h4>
                      <div className="flex items-center text-sm font-medium text-slate-500 dark:text-zinc-400 mb-2">
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time || 'Time TBA'}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-zinc-300 line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl text-center border border-slate-100 dark:border-zinc-800">
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
                  <Link to="/notices" key={i} className="block bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
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
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl text-center border border-slate-100 dark:border-zinc-800">
                  <p className="text-slate-500 font-medium">No recent notices available.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Social Media Banner */}
      <section className="pb-24 px-6 relative z-10 bg-slate-50 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto bg-[#20387b] rounded-[30px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mb-4">{homeData?.socials?.title || "Connect with Mao Students' Union Social Channels"}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{homeData?.socials?.description || "Stay updated with daily announcements, cultural videos, literary meet archives, and sports updates on our official social handles."}</p>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-end gap-4 shrink-0">
            <a href={contactData?.socials?.facebook || "#"} className="flex items-center gap-2 bg-[#25418b] hover:bg-[#1c326b] text-white font-bold py-2 px-4 rounded-full transition-colors text-xs">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" /></svg>
              Facebook
            </a>
            <a href={contactData?.socials?.instagram || "#"} className="flex items-center gap-2 bg-[#25418b] hover:bg-[#1c326b] text-white font-bold py-2 px-4 rounded-full transition-colors text-xs">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Instagram
            </a>
            <a href={contactData?.socials?.youtube || "#"} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-full transition-colors text-xs">
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
