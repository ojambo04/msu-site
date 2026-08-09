import React from 'react';

const ExecutiveLeaders = ({ leaders }) => {
  if (!leaders || leaders.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 slide-up">
      <div className="mb-10">
        <h4 className="text-sm font-bold text-accent tracking-widest uppercase mb-2">Key Executive Leaders</h4>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-serif">President & General Secretary Section</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {leaders.map((leader, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            {/* Top Half - Dark Blue */}
            <div className="bg-[#20387b] p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 rounded-3xl p-1 border-2 border-yellow-400 shrink-0 overflow-hidden bg-white/10">
                <img src={leader.image} alt={leader.name} className="w-full h-full object-cover rounded-[20px]" />
              </div>
              <div className="text-center md:text-left text-white mt-2 md:mt-0">
                <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md tracking-wider uppercase mb-3">
                  {leader.role}
                </div>
                <h3 className="text-2xl font-bold font-serif mb-2">{leader.name}</h3>
                <p className="text-blue-100 text-sm mb-2">{leader.unit}</p>
                <div className="flex items-center justify-center md:justify-start text-yellow-400 text-xs font-medium">
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {leader.hours}
                </div>
              </div>
            </div>

            {/* Bottom Half - White */}
            <div className="p-8">
              <div className="border-l-4 border-orange-500 pl-5 mb-8">
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  <strong className="text-slate-900 dark:text-white">Term Message: </strong>
                  "{leader.message}"
                </p>
              </div>
              <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                <svg className="w-5 h-5 mr-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email: <a href={`mailto:${leader.email}`} className="ml-1 text-primary dark:text-primary-light hover:underline">{leader.email}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveLeaders;
