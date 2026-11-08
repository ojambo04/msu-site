import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto flex flex-col w-full">
      {/* Top Tier */}
      <div className="bg-[#20387b] dark:bg-zinc-900 py-6 px-6 border-b border-blue-900/50 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <h2 className="text-white font-bold text-lg md:text-xl font-serif">Mao Students' Union — Established 1933</h2>
            <p className="text-amber-400 font-medium italic mt-1 text-sm md:text-base">"Sacrifice and Progress" — Empowering 15,000+ Mao Students</p>
          </div>
        </div>
      </div>

      {/* Bottom Tier */}
      <div className="bg-[#0f172a] dark:bg-zinc-950 py-16 px-6 text-slate-300 dark:text-zinc-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1: Navigation */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Navigation</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Home & Announcements</Link></li>
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">›</span> About, Mission & History</Link></li>
              <li><Link to="/leadership" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Executive Council 2026–2028</Link></li>
              <li><Link to="/notices" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Notice & Official Press Hub</Link></li>
              <li><Link to="/students" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Students' Corner & Scholarships</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 2: Resources */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Student Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">📥</span> MSU Constitution PDF</a></li>
              <li><Link to="/students#scholarships" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">›</span> MSU Scholarship Scheme</Link></li>
              <li><Link to="/about#hall-of-fame" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Past Presidents Hall of Fame</Link></li>
              <li><Link to="/leadership#units" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">›</span> 27 Constituent Units Directory</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"><span className="text-xs">›</span> Suggestion & Feedback Box</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Central Headquarters</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">📍</span>
                <span className="text-sm text-slate-400 leading-relaxed">Mao Students' Union Central HQ, Tadubi Sub-Division / Senapati, Manipur – 795104</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-500">📞</span>
                <span className="text-sm text-slate-400">+91 94360 88201 / +91 98625 77140</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-500">✉️</span>
                <a href="mailto:official@maostudentsunion.org" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">official@maostudentsunion.org</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-500">✔️</span>
                <span className="text-sm text-amber-500/80 italic">Official Registered Student Body (Estd 1933)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Map */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Location Map</h4>
            <div className="w-full h-40 md:h-full min-h-[160px] max-h-[220px] rounded-xl overflow-hidden border border-slate-700/50">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.3546755498877!2d94.1378875!3d25.539088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3748cdb8c7c7f3b5%3A0x6b8f395f87b38c29!2sTadubi%2C%20Manipur%20795104!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                className="w-full h-full border-0 filter opacity-80 hover:opacity-100 transition-opacity" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="MSU Headquarters Map"
              ></iframe>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Mao Students' Union. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-slate-500 hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-amber-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
