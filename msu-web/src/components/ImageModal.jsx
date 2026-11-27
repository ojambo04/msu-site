import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { getImageUrl } from '../utils/getFileUrl';

const ImageModal = ({ imageUrl, onClose, title = 'Profile Photo' }) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [imageUrl]);

  useEffect(() => {
    if (!imageUrl) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageUrl, onClose]);

  if (!imageUrl || typeof document === 'undefined') return null;

  const resolvedUrl = getImageUrl(imageUrl);

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = resolvedUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[99999] w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-950/92 backdrop-blur-md select-none fade-in"
      onClick={onClose}
    >
      {/* Subtle ambient blurred image backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 blur-3xl scale-110 pointer-events-none"
        style={{ backgroundImage: `url(${resolvedUrl})` }}
      />

      {/* Top floating action bar */}
      <div
        className="fixed top-4 right-4 md:top-6 md:right-6 z-20 flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/50 border border-white/15 backdrop-blur-xl shadow-2xl">
          <button
            type="button"
            title={zoomed ? 'Zoom out' : 'Zoom in'}
            aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
            onClick={() => setZoomed((prev) => !prev)}
            className="p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          >
            {zoomed ? <ZoomOut className="w-4 h-4 md:w-5 md:h-5" /> : <ZoomIn className="w-4 h-4 md:w-5 md:h-5" />}
          </button>

          <button
            type="button"
            title="Download photo"
            aria-label="Download photo"
            onClick={handleDownload}
            className="p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="w-px h-5 bg-white/15 mx-0.5" />

          <button
            type="button"
            title="Close (Esc)"
            aria-label="Close image modal"
            onClick={() => onClose?.()}
            className="p-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white transition-colors cursor-pointer shadow-sm"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      {/* Centered framed image */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-5 md:p-12 pt-20 pb-14">
        <img
          src={resolvedUrl}
          alt={title}
          draggable={false}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setZoomed((prev) => !prev);
          }}
          onClick={(e) => e.stopPropagation()}
          className={`max-w-full max-h-full w-auto h-auto object-contain rounded-2xl ring-1 ring-white/15 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] transition-transform duration-300 ease-out ${
            zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
        />
      </div>

      {/* Subtle bottom hint */}
      <div className="fixed bottom-4 inset-x-0 z-10 flex justify-center pointer-events-none">
        <span className="px-3.5 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-mono text-white/60">
          Double-click to zoom • Esc or click outside to close
        </span>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
