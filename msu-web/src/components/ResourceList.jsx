import React from 'react';

const EmptyState = ({ message, description }) => (
  <div className="col-span-1 md:col-span-2 text-center py-20 text-slate-500 bg-white dark:bg-zinc-900 rounded-[20px] border border-slate-200 dark:border-zinc-800 shadow-sm w-full">
    <svg className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
    <h3 className="text-xl font-bold mb-2">{message}</h3>
    <p>{description}</p>
  </div>
);

const ResourceList = ({ data, activeTab }) => {

  const renderScholarships = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
      {(!data?.scholarships || data.scholarships.length === 0) ? (
        <EmptyState message="No Scholarships Found" description="There are currently no scholarships available." />
      ) : (
        data.scholarships.map((item, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-100 dark:border-zinc-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {item.provider}
              </span>
            </div>
            <h3 className="text-[22px] font-bold font-serif text-[#0f172a] dark:text-white mb-3 leading-snug">{item.title}</h3>
            <p className="text-[15px] text-slate-500 dark:text-zinc-400 mb-6 leading-relaxed font-medium">{item.description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5 border-t border-slate-100 dark:border-zinc-800">
            <div className="flex items-center text-[13.5px] font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Deadline: {item.deadline}
            </div>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#20387b] hover:bg-[#152554] text-white text-sm font-bold py-2.5 px-6 rounded-full transition-colors flex items-center justify-center shadow-md hover:shadow-lg">
              Apply Now
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H16M16 6V12M16 6L8 14" />
              </svg>
            </a>
          </div>
        </div>
        ))
      )}
    </div>
  );

  const renderJobs = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
      {(!data?.jobs || data.jobs.length === 0) ? (
        <EmptyState message="No Job Vacancies" description="There are currently no job openings listed." />
      ) : (
        data.jobs.map((item, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-100 dark:border-zinc-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {item.department}
              </span>
            </div>
            <h3 className="text-[22px] font-bold font-serif text-[#0f172a] dark:text-white mb-3 leading-snug">{item.title}</h3>
            <p className="text-[15px] text-slate-500 dark:text-zinc-400 mb-6 leading-relaxed font-medium">{item.description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5 border-t border-slate-100 dark:border-zinc-800">
            <div className="flex items-center text-[13.5px] font-bold text-rose-600 dark:text-rose-500 bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-lg">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Deadline: {item.deadline}
            </div>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#20387b] hover:bg-[#152554] text-white text-sm font-bold py-2.5 px-6 rounded-full transition-colors flex items-center justify-center shadow-md hover:shadow-lg">
              View Details
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H16M16 6V12M16 6L8 14" />
              </svg>
            </a>
          </div>
        </div>
        ))
      )}
    </div>
  );

  const renderExams = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
      {(!data?.exams || data.exams.length === 0) ? (
        <EmptyState message="No Exams Scheduled" description="There are currently no competitive exams scheduled." />
      ) : (
        data.exams.map((item, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-100 dark:border-zinc-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {item.category} Exam
              </span>
            </div>
            <h3 className="text-[22px] font-bold font-serif text-[#0f172a] dark:text-white mb-3 leading-snug">{item.title}</h3>
            <p className="text-[15px] text-slate-500 dark:text-zinc-400 mb-6 leading-relaxed font-medium">{item.description}</p>
          </div>
          
          <div className="flex flex-col xl:flex-row justify-between items-center gap-4 pt-5 border-t border-slate-100 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-2 sm:gap-4 xl:gap-1 w-full xl:w-auto">
              <div className="flex items-center text-[13px] font-bold text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-md w-full sm:w-auto justify-center xl:justify-start">
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Opens: {item.openingDate}
              </div>
              <div className="flex items-center text-[13px] font-bold text-rose-600 dark:text-rose-500 bg-rose-50 dark:bg-rose-900/20 px-3 py-1 rounded-md w-full sm:w-auto justify-center xl:justify-start">
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Closes: {item.closingDate}
              </div>
            </div>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-full xl:w-auto bg-[#20387b] hover:bg-[#152554] text-white text-sm font-bold py-2.5 px-6 rounded-full transition-colors flex items-center justify-center shadow-md hover:shadow-lg mt-2 xl:mt-0 shrink-0">
              Apply Now
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H16M16 6V12M16 6L8 14" />
              </svg>
            </a>
          </div>
        </div>
        ))
      )}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 slide-up" style={{ animationDelay: '100ms' }}>

      {/* Content Area */}
      {activeTab === 'scholarships' && renderScholarships()}
      {activeTab === 'jobs' && renderJobs()}
      {activeTab === 'exams' && renderExams()}

    </div>
  );
};

export default ResourceList;
