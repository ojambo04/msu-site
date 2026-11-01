import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMarkdown } from '../hooks/useMarkdown';
import { getFileUrl, getImageUrl } from '../utils/getFileUrl';
import Timeline from '../components/Timeline';
import HallOfFame from '../components/HallOfFame';

const About = () => {
  const { content, attributes, loading } = useMarkdown('about.md');
  const { attributes: hallOfFameAttrs, loading: hallOfFameLoading } = useMarkdown('hallOfFame.md');

  if (loading || hallOfFameLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-zinc-800 border-t-primary dark:border-t-primary-light rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center pb-12 fade-in">
      {/* Hero Banner Section */}
      <div className="w-full relative pt-24 pb-20 px-4 md:px-8 overflow-hidden z-0">
        <div className="absolute inset-0 z-[-1]">
          <img src={getImageUrl('banner_abstract.png')} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#20387b]/85 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#152554]/90 dark:to-zinc-950/95"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-serif mb-4 tracking-tight">
            {attributes.header?.title || 'About Us'}
          </h1>
          {attributes.header?.subtitle && (
            <p className="text-blue-100 max-w-3xl text-sm md:text-base leading-relaxed">
              {attributes.header.subtitle}
            </p>
          )}
          {attributes.header?.constitutionPdf && (
            <div className="mt-8">
              <a href={getFileUrl(attributes.header.constitutionPdf)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                <span className="text-lg leading-none">📄</span> Read the Constitution
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Vision & Mission Cards */}
      {attributes.mission && attributes.vision && (
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 mt-10 mb-4 grid grid-cols-1 md:grid-cols-2 gap-6 slide-up" style={{ animationDelay: '100ms' }}>

          {/* Mission Card */}
          <div className="bg-[#0f172a] rounded-2xl p-8 md:p-10 shadow-lg border border-slate-800 flex flex-col items-start">
            <div className="inline-flex items-center bg-[#1e293b] rounded-full px-4 py-1.5 mb-6 border border-slate-700">
              <svg className="w-4 h-4 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-amber-500 text-[11px] font-bold tracking-widest uppercase">
                {attributes.mission.tag}
              </span>
            </div>
            <h2 className="text-[28px] md:text-3xl font-bold text-white font-serif mb-4">{attributes.mission.title}</h2>
            <p className="text-slate-300 leading-relaxed font-medium">
              {attributes.mission.content}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#20387b] rounded-2xl p-8 md:p-10 shadow-lg border border-[#2a4594] flex flex-col items-start">
            <div className="inline-flex items-center bg-orange-500 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <svg className="w-4 h-4 text-[#0f172a] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-[#0f172a] text-[11px] font-bold tracking-widest uppercase">
                {attributes.vision.tag}
              </span>
            </div>
            <h2 className="text-[28px] md:text-3xl font-bold text-white font-serif mb-4">{attributes.vision.title}</h2>
            <p className="text-blue-50 leading-relaxed font-medium">
              {attributes.vision.content}
            </p>
          </div>

        </div>
      )}

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 mt-2 slide-up" style={{ animationDelay: '150ms' }}>
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-2xl transition-all duration-300 p-8 md:p-14 border border-slate-100 dark:border-zinc-800">
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt, ...props }) => <img src={getImageUrl(src)} alt={alt} {...props} />
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Page Specific Components */}
        {attributes.timeline && (
          <div className="mt-12 slide-up" style={{ animationDelay: '150ms' }}>
            <Timeline data={attributes.timeline} />
          </div>
        )}

        {hallOfFameAttrs?.hallOfFame && (
          <div className="mt-12 slide-up" style={{ animationDelay: '300ms' }}>
            <HallOfFame data={hallOfFameAttrs.hallOfFame} />
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
