import React from 'react';
import { getImageUrl } from '../utils/getFileUrl';

const HeroBanner = ({ title, subtitle, imageSrc = "banner_abstract.png" }) => {
  return (
    <div className="w-full relative pt-28 pb-36 px-4 md:px-8 overflow-hidden z-0">
      <div className="absolute inset-0 z-[-1]">
        <img src={getImageUrl(imageSrc)} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#20387b]/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#152554]/90 dark:to-zinc-950/95"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <h1 className="text-4xl md:text-[48px] font-extrabold text-white font-serif mb-6 tracking-tight leading-tight drop-shadow-sm">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-blue-100 max-w-2xl mx-auto text-base md:text-lg leading-relaxed drop-shadow-sm">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
