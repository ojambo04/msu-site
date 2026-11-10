import React from 'react';
import { getImageUrl } from '../utils/getFileUrl';

const DEFAULT_BANNER = '/msu-content/images/banner_abstract.png';

/**
 * Universal Hero Banner Component with customizable per-page background image.
 *
 * Priority for banner image:
 * 1. imageSrc prop
 * 2. bannerImage prop (e.g. from page frontmatter header.bannerImage)
 * 3. image prop
 * 4. Fallback default banner (/msu-content/images/banner_abstract.png)
 */
const HeroBanner = ({
  title,
  subtitle,
  imageSrc,
  bannerImage,
  image,
  align = 'center',
  className = '',
  children
}) => {
  const activeImage = imageSrc || bannerImage || image || DEFAULT_BANNER;
  const isLeft = align === 'left';

  return (
    <div className={`w-full relative pt-24 pb-28 md:pt-28 md:pb-36 px-4 md:px-8 overflow-hidden z-0 ${className}`}>
      {/* Background Image Layer with Dark Blue Multiply & Gradient Overlays */}
      <div className="absolute inset-0 z-[-1]">
        <img
          src={getImageUrl(activeImage)}
          alt={title ? `${title} Banner` : 'Page Banner'}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={(e) => {
            // Graceful fallback to default banner if custom image fails to load
            if (activeImage !== DEFAULT_BANNER) {
              e.currentTarget.src = getImageUrl(DEFAULT_BANNER);
            }
          }}
        />
        <div className="absolute inset-0 bg-[#20387b]/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#152554]/90 dark:to-zinc-950/95"></div>
      </div>

      {/* Banner Content Container */}
      <div className={`max-w-6xl mx-auto relative z-10 ${isLeft ? 'text-center md:text-left' : 'text-center'}`}>
        {title && (
          <h1 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold text-white font-serif mb-4 md:mb-6 tracking-tight leading-tight drop-shadow-sm">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className={`text-blue-100 text-sm md:text-lg leading-relaxed drop-shadow-sm ${isLeft ? 'max-w-3xl mx-auto md:mx-0' : 'max-w-2xl mx-auto'}`}>
            {subtitle}
          </p>
        )}

        {children && (
          <div className="mt-6 md:mt-8">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
