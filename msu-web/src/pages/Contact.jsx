import React from 'react';
import { MapPin, Phone, Mail, Building, ExternalLink, Clock, Send, Share2 } from 'lucide-react';
import { useMarkdown } from '../hooks/useMarkdown';

const Contact = () => {
  const { attributes: homeData } = useMarkdown('home.md');
  const { attributes: contactData } = useMarkdown('contact.md');

  const address = contactData?.address || "Central Headquarters, Tadubi Sub-Division / Senapati, Manipur – 795104, India";
  const email = contactData?.email || "contact@maostudentsunion.org";
  
  const directoryTitle = contactData?.directory?.title || "Constituent Units Directory";
  const directoryDesc = contactData?.directory?.description || "The Mao Students' Union spans 27 Constituent Units across Manipur, Nagaland, Assam, and major university hubs in India. For unit-specific queries, reach out directly via your regional executive representatives.";

  return (
    <div className="w-full flex flex-col items-center pb-12 fade-in">
      {/* Hero Banner Section */}
      <div className="w-full relative pt-24 pb-20 px-4 md:px-8 overflow-hidden z-0">
        <div className="absolute inset-0 z-[-1]">
          <img src="/assets/images/banner_abstract.png" alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#20387b]/85 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#152554]/90 dark:to-zinc-950/95"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-serif mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-blue-100 max-w-3xl text-sm md:text-base leading-relaxed mx-auto md:mx-0">
            Reach out to the Mao Students' Union Central Headquarters or our constituent units for any inquiries, assistance, or grievance redressal.
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 mt-[-40px] relative z-10 slide-up">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 overflow-hidden h-full flex flex-col">
              <div className="bg-[#20387b] px-6 py-5 border-b border-[#152554]">
                <h2 className="text-white font-bold font-serif flex items-center gap-2 text-xl">
                  <Mail className="text-amber-400" size={22} />
                  Send us a Message
                </h2>
                <p className="text-blue-100 text-sm mt-1 ml-7">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              <div className="p-6 md:p-8 flex-1">
                <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
                  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-2">Full Name</label>
                      <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-zinc-600 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-2">Email Address</label>
                      <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-zinc-600 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-2">Subject</label>
                    <input type="text" name="subject" required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-zinc-600 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="How can we help you?" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-2">Message</label>
                    <textarea name="message" required rows="5" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-zinc-600 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-y" placeholder="Your message..."></textarea>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="bg-[#20387b] hover:bg-[#152554] text-white font-bold py-3.5 px-8 rounded-lg shadow hover:shadow-lg transition-all flex items-center justify-center gap-2 group w-full md:w-auto">
                      <span>Send Message</span>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">

            {/* Directory Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm p-6 border border-slate-200 dark:border-zinc-800 flex-1">
              <h3 className="text-[#d97706] font-bold font-serif flex items-center gap-2 text-lg mb-4">
                <Building size={20} />
                {directoryTitle}
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-[15px] leading-relaxed">
                {directoryDesc}
              </p>
            </div>

            {/* Social Channels Card */}
            <div className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 border border-slate-800">
              <h3 className="text-[#f59e0b] font-bold font-serif flex items-center gap-3 text-[17px] mb-6 uppercase tracking-wider">
                <Share2 size={22} className="text-[#f59e0b]" />
                Social Channels
              </h3>
              <div className="flex flex-col gap-3">
                <a href={homeData?.socials?.links?.facebook || "#"} className="flex items-center gap-3 bg-[#1e293b] hover:bg-[#334155] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm border border-slate-700 w-full justify-start">
                  <svg className="w-5 h-5 text-[#3b5998]" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" /></svg>
                  Follow on Facebook
                </a>
                <a href={homeData?.socials?.links?.instagram || "#"} className="flex items-center gap-3 bg-[#1e293b] hover:bg-[#334155] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm border border-slate-700 w-full justify-start">
                  <svg className="w-5 h-5 text-[#e1306c]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  Follow on Instagram
                </a>
                <a href={homeData?.socials?.links?.youtube || "#"} className="flex items-center gap-3 bg-[#1e293b] hover:bg-[#334155] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm border border-slate-700 w-full justify-start">
                  <svg className="w-5 h-5 text-[#ff0000]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  Subscribe on YouTube
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-zinc-800 flex flex-col">
          <div className="bg-[#20387b] px-6 py-4 flex justify-between items-center">
            <h2 className="text-white font-bold font-serif flex items-center gap-2 text-lg">
              <MapPin className="text-amber-400" size={20} />
              MSU Central Headquarters Location
            </h2>
            <span className="bg-[#152554] text-amber-400 text-xs px-3 py-1 rounded-full font-medium hidden sm:inline">Manipur, India</span>
          </div>

          <div className="relative w-full h-[400px] md:h-[500px] bg-slate-100 dark:bg-zinc-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.3546755498877!2d94.1378875!3d25.539088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3748cdb8c7c7f3b5%3A0x6b8f395f87b38c29!2sTadubi%2C%20Manipur%20795104!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MSU Headquarters Map"
            ></iframe>
            <a href="https://maps.google.com/?q=Tadubi,Manipur" target="_blank" rel="noopener noreferrer" className="absolute top-4 left-4 bg-white text-blue-600 px-4 py-2 rounded shadow-md text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors z-10">
              Open in Maps <ExternalLink size={16} />
            </a>
          </div>

          <div className="p-6 md:p-8 bg-white dark:bg-zinc-950 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="text-slate-500 mt-1 shrink-0" size={18} />
              <p className="text-slate-700 dark:text-zinc-300 text-[15px]">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Address:</span>
                <span className="text-slate-900 px-1.5 font-medium rounded inline-block">{address}</span>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-slate-500 mt-1 shrink-0" size={18} />
              <p className="text-slate-700 dark:text-zinc-300 text-[15px]">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Official Email:</span>
                {email}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
