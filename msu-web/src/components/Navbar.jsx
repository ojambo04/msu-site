import React from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun, Menu, X, Phone, Search } from 'lucide-react';
import { useMarkdown } from '../hooks/useMarkdown';

const Navbar = ({ toggleTheme, theme }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { attributes: contactData } = useMarkdown('contact.md');
  const { attributes: aboutData } = useMarkdown('about.md');

  const location = contactData?.location || "Central HQ: Tadubi & Senapati, Manipur";
  const helpline = contactData?.helpline || "+91 94360 88201";
  const facebook = contactData?.socials?.facebook || "#";
  const instagram = contactData?.socials?.instagram || "#";
  const youtube = contactData?.socials?.youtube || "#";
  
  const constitutionPdf = aboutData?.header?.constitutionPdf || "#";

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT & HISTORY', path: '/about' },
    { name: 'EXECUTIVE COUNCIL', path: '/leadership' },
    { name: 'NOTICE & PRESS', path: '/notices' },
    { name: 'EVENTS', path: '/events' },
    { name: 'STUDENTS\' CORNER', path: '/students' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="w-full flex flex-col z-50 shadow-md relative">
      {/* Top Bar - Very Dark Blue */}
      <div className="bg-[#0f172a] dark:bg-zinc-950 text-slate-300 dark:text-zinc-300 py-1.5 px-6 hidden lg:block text-xs border-b border-slate-800 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-500">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              {location}
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <Phone size={12} /> {helpline.includes('Helpline') ? helpline : `Helpline: ${helpline}`}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-amber-500 flex items-center gap-1 font-medium"><span className="text-amber-500 text-sm leading-none">🎓</span> Scholarships</a>
            <a href={constitutionPdf} className="hover:text-amber-500 flex items-center gap-1 font-medium"><span className="text-amber-500 text-sm leading-none">📄</span> Constitution PDF</a>
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-700">
              <a href={facebook} className="hover:text-white transition-colors" title="Facebook">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" /></svg>
              </a>
              <a href={instagram} className="hover:text-white transition-colors" title="Instagram">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={youtube} className="hover:text-white transition-colors" title="YouTube">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Bar - White/Dark Slate */}
      <div className="bg-white dark:bg-zinc-950 py-4 px-6 border-b border-slate-100 dark:border-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo & Brand */}
          <NavLink to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-transparent shrink-0 flex items-center justify-center relative">
              <img src="/assets/images/logo.png" alt="MSU Logo" className="w-full h-full object-contain absolute inset-0 z-10" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
              {/* Fallback generic circular logo if image is missing */}
              <div className="w-full h-full rounded-full border-[3px] border-[#25418b] dark:border-blue-400 hidden flex-col items-center justify-center">
                <span className="text-[#25418b] dark:text-blue-400 font-bold text-lg leading-none">MSU</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-black text-[#20387b] dark:text-blue-400 font-serif tracking-tight group-hover:text-blue-600 transition-colors">MAO STUDENTS' UNION</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] md:text-sm font-bold text-amber-500 tracking-wider">ESTD - 1933</span>
                <span className="text-slate-400 text-xs hidden sm:inline">|</span>
                <span className="text-[10px] md:text-sm italic text-slate-500 dark:text-zinc-400 font-serif hidden sm:inline">"Sacrifice and Progress"</span>
              </div>
            </div>
          </NavLink>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="relative">
              <input type="text" placeholder="Search Portal..." className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-full py-2 pl-5 pr-10 text-sm w-64 focus:outline-none focus:border-amber-500 transition-colors dark:text-white placeholder-slate-400" />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-zinc-300 transition-colors ml-2" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button className="p-2 text-slate-700 dark:text-zinc-300" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="text-slate-700 dark:text-zinc-300 p-2" onClick={toggleMenu}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar - Theme Primary (#20387b) */}
      <div className={`lg:block bg-[#20387b] dark:bg-zinc-950 ${isOpen ? 'block absolute top-full left-0 w-full z-50 shadow-xl' : 'hidden'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:justify-center lg:items-center">
          <div className="flex flex-col lg:flex-row w-full lg:w-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `px-5 py-4 lg:py-3.5 text-[13px] font-bold tracking-wider transition-colors border-b lg:border-b-0 border-blue-800/50 dark:border-zinc-900 lg:border-r lg:last:border-r-0 lg:first:border-l ${isActive ? 'bg-amber-500 text-slate-900 border-transparent shadow-[inset_0_3px_0_rgba(0,0,0,0.2)]' : 'text-slate-200 hover:bg-blue-800 dark:hover:bg-slate-800 hover:text-white'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
