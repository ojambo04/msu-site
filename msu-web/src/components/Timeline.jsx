import React from 'react';

const Timeline = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="w-full py-8 relative">
      <div className="mb-10 flex items-center gap-4">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Our Journey</h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/40 to-transparent rounded-full"></div>
      </div>

      {/* Dense Timeline Layout */}
      <div className="relative pl-6 md:pl-8 border-l-[3px] border-slate-200 dark:border-slate-700 space-y-8">
        {data.map((item, index) => (
          <div key={index} className="relative group slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            {/* Dot */}
            <div className="absolute -left-[35px] md:-left-[41px] top-1.5 flex items-center justify-center">
              <div className="absolute w-6 h-6 rounded-full bg-primary/20 scale-0 group-hover:scale-100 group-hover:animate-ping transition-transform duration-500"></div>
              <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3px] border-slate-300 dark:border-slate-600 group-hover:border-primary transition-colors duration-300"></div>
            </div>
            
            {/* Content */}
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300 group-hover:translate-x-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-xs font-bold tracking-widest text-primary uppercase w-fit">
                  {item.year}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{item.title}</h3>
              </div>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
