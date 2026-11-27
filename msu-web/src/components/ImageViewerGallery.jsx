import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Download, 
  Share2, 
  Images, 
  Expand, 
  Check, 
  Layers,
  LayoutGrid,
  SlidersHorizontal,
  RotateCw
} from 'lucide-react';
import { getImageUrl } from '../utils/getFileUrl';

/**
 * ImageViewerGallery Component
 * 
 * An interactive image gallery and full-screen lightbox image viewer designed
 * for MSU events.
 * 
 * The full screen mode fills 100% of the entire viewport (height and width)
 * edge-to-edge with floating translucent HUD overlays.
 * 
 * Features:
 * - Full screen mode fills 100% width and 100% height of the viewport
 * - "Fill Viewport" (edge-to-edge cover) / "Fit Image" display toggling
 * - Floating translucent control bar, navigation arrows, and thumbnail strip
 * - Click-to-toggle HUD controls for an unobstructed cinematic view
 * - Viewport-fit inline showcase mode (`h-[50vh] md:h-[68vh]`)
 * - Responsive grid view toggle option with "+N more" badge
 * - Keyboard navigation (Left/Right arrows, Escape, +, -, 0, F)
 * - Mobile touch/swipe gesture support
 * - Pan and zoom capabilities (up to 3x)
 * - Quick actions: Download image, Share/Copy link, Fullscreen toggle
 */
const ImageViewerGallery = ({ 
  images = [], 
  title = 'Event Gallery', 
  defaultMode = 'showcase', // 'showcase' (viewport fit) | 'grid'
  initialLimit = 6,
  className = '' 
}) => {
  const [viewMode, setViewMode] = useState(defaultMode); // 'showcase' | 'grid'
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [fitMode, setFitMode] = useState('contain'); // 'contain' (fit photo) | 'cover' (fill screen)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  // References
  const lightboxRef = useRef(null);
  const modalThumbnailsTrackRef = useRef(null);
  const inlineThumbnailsTrackRef = useRef(null);
  const thumbnailRefs = useRef([]);
  const inlineThumbnailRefs = useRef([]);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  // Normalize image data to standard object
  const normalizedImages = (images || []).map((img, idx) => {
    if (typeof img === 'string') {
      return {
        url: getImageUrl(img),
        rawPath: img,
        alt: `${title} - Photo ${idx + 1}`,
        id: idx
      };
    }
    return {
      url: getImageUrl(img.url || img.src || img.path),
      rawPath: img.url || img.src || img.path,
      alt: img.alt || img.caption || `${title} - Photo ${idx + 1}`,
      caption: img.caption,
      id: idx
    };
  });

  const totalImages = normalizedImages.length;
  const currentImage = normalizedImages[currentIndex] || normalizedImages[0];

  // Open viewer at specific index
  const openViewer = (index = 0) => {
    setCurrentIndex(index);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setRotation(0);
    setImageLoading(true);
    setShowControls(true);
    setIsOpen(true);
  };

  // Close viewer
  const closeViewer = useCallback(() => {
    setIsOpen(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setRotation(0);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setRotation(0);
    setImageLoading(true);
  }, [totalImages]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setRotation(0);
    setImageLoading(true);
  }, [totalImages]);

  const goToIndex = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setRotation(0);
    setImageLoading(true);
  };

  // Rotation handler
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const toggleZoom = () => {
    if (zoomLevel > 1) {
      handleResetZoom();
    } else {
      setZoomLevel(2);
    }
  };

  // Toggle fit mode between cover (fill viewport) and contain (fit image)
  const toggleFitMode = () => {
    setFitMode((prev) => (prev === 'cover' ? 'contain' : 'cover'));
    handleResetZoom();
  };

  // Pan handlers when zoomed
  const handleMouseDown = (e) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!lightboxRef.current) return;
    if (!document.fullscreenElement) {
      lightboxRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  // Share handler
  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - Photo ${currentIndex + 1}`,
          text: `Check out this photo from "${title}"`,
          url: shareUrl
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard?.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  // Download handler
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage.url;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-photo-${currentIndex + 1}.jpg`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (zoomLevel > 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartXRef.current - touchEndX;
    const diffY = touchStartYRef.current - touchEndY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    if (typeof window !== 'undefined' && window.scrollX !== 0) {
      window.scrollTo(0, window.scrollY);
    }

    const originalOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          closeViewer();
          break;
        case 'ArrowRight':
        case 'KeyD':
          goToNext();
          break;
        case 'ArrowLeft':
        case 'KeyA':
          goToPrev();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
        case '_':
          handleZoomOut();
          break;
        case '0':
          handleResetZoom();
          break;
        case 'r':
        case 'R':
          handleRotate();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case ' ':
          setShowControls((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalDocOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isOpen, closeViewer, goToNext, goToPrev]);

  // Auto-scroll active thumbnail inside modal (track-only scroll, never scrolling window)
  useEffect(() => {
    if (!isOpen) return;
    const track = modalThumbnailsTrackRef.current;
    const thumb = thumbnailRefs.current[currentIndex];
    if (track && thumb) {
      const trackWidth = track.clientWidth;
      const thumbLeft = thumb.offsetLeft;
      const thumbWidth = thumb.clientWidth;
      track.scrollTo({
        left: Math.max(0, thumbLeft - trackWidth / 2 + thumbWidth / 2),
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isOpen]);

  // Auto-scroll active thumbnail in inline showcase (track-only scroll, never scrolling window)
  useEffect(() => {
    if (viewMode !== 'showcase') return;
    const track = inlineThumbnailsTrackRef.current;
    const thumb = inlineThumbnailRefs.current[currentIndex];
    if (track && thumb) {
      const trackWidth = track.clientWidth;
      const thumbLeft = thumb.offsetLeft;
      const thumbWidth = thumb.clientWidth;
      track.scrollTo({
        left: Math.max(0, thumbLeft - trackWidth / 2 + thumbWidth / 2),
        behavior: 'smooth'
      });
    }
  }, [currentIndex, viewMode]);

  if (totalImages === 0) {
    return null;
  }

  // Calculate visible images for grid mode
  const shouldLimit = !isExpanded && totalImages > initialLimit;
  const visibleImages = shouldLimit 
    ? normalizedImages.slice(0, initialLimit) 
    : normalizedImages;
  const remainingCount = totalImages - initialLimit;

  return (
    <div className={`w-full ${className}`}>
      {/* Gallery Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400">
            <Images className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
              Event Gallery
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {totalImages} {totalImages === 1 ? 'photo' : 'photos'} • Click to view full-screen
            </p>
          </div>
        </div>

        {/* View Mode & Actions */}
        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          {totalImages > 1 && (
            <div className="flex items-center bg-slate-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-slate-200 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => setViewMode('showcase')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'showcase'
                    ? 'bg-white dark:bg-zinc-700 text-[#20387b] dark:text-blue-300 shadow-sm'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Showcase View (Fits Viewport)"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Showcase</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-zinc-700 text-[#20387b] dark:text-blue-300 shadow-sm'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          )}

          {/* Fullscreen Slideshow Launch */}
          <button
            type="button"
            onClick={() => openViewer(currentIndex)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#20387b] hover:bg-blue-800 text-white transition-colors shadow-sm"
          >
            <Expand className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* VIEWPORT-FIT SHOWCASE MODE */}
      {viewMode === 'showcase' ? (
        <div className="w-full flex flex-col bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          {/* Main Viewport Stage */}
          <div 
            className="relative w-full h-[50vh] sm:h-[60vh] md:h-[68vh] max-h-[640px] min-h-[340px] flex items-center justify-center p-2 sm:p-4 overflow-hidden group/stage select-none cursor-pointer"
            onClick={() => openViewer(currentIndex)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background ambient texture */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-25 blur-2xl scale-110 pointer-events-none transition-all duration-700"
              style={{ backgroundImage: `url(${currentImage.url})` }}
            />

            {/* Navigation Arrow - Left */}
            {totalImages > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-3 md:left-5 z-20 p-2.5 md:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md opacity-80 group-hover/stage:opacity-100 transition-all hover:scale-105"
                title="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}

            {/* Main Stage Image */}
            <div className="relative w-full h-full flex items-center justify-center z-10">
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover/stage:scale-[1.01]"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Navigation Arrow - Right */}
            {totalImages > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-3 md:right-5 z-20 p-2.5 md:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md opacity-80 group-hover/stage:opacity-100 transition-all hover:scale-105"
                title="Next photo"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}

            {/* Top Badges & Controls Overlay */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-amber-400 border border-white/10">
                {currentIndex + 1} / {totalImages}
              </span>
            </div>

            <div className="absolute top-3 right-3 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10 opacity-90 group-hover/stage:opacity-100 transition-opacity">
                <Expand className="w-3.5 h-3.5 text-amber-400" />
                Click to expand
              </span>
            </div>
          </div>

          {/* Inline Thumbnail Ribbon */}
          {totalImages > 1 && (
            <div className="shrink-0 bg-black/80 border-t border-white/10 px-3 py-2.5 backdrop-blur-md">
              <div ref={inlineThumbnailsTrackRef} className="relative flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-white/20">
                {normalizedImages.map((img, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      ref={(el) => (inlineThumbnailRefs.current[idx] = el)}
                      type="button"
                      onClick={() => goToIndex(idx)}
                      className={`relative shrink-0 rounded-lg overflow-hidden transition-all duration-200 aspect-video h-12 md:h-14 ${
                        isActive 
                          ? 'ring-2 ring-amber-400 scale-105 opacity-100' 
                          : 'opacity-40 hover:opacity-80'
                      }`}
                    >
                      <img 
                        src={img.url} 
                        alt={img.alt} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* GRID VIEW MODE */
        <div>
          {totalImages === 1 ? (
            <div 
              onClick={() => openViewer(0)}
              className="group relative rounded-2xl overflow-hidden aspect-video max-w-3xl mx-auto bg-slate-100 dark:bg-zinc-900 shadow-md border border-slate-200 dark:border-zinc-800 cursor-pointer"
            >
              <img 
                src={visibleImages[0].url} 
                alt={visibleImages[0].alt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 text-slate-900 dark:text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-md">
                  <Expand className="w-4 h-4 text-amber-500" />
                  Click to view photo
                </span>
              </div>
            </div>
          ) : totalImages === 2 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {visibleImages.map((image, idx) => (
                <div 
                  key={idx}
                  onClick={() => openViewer(idx)}
                  className="group relative rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-zinc-900 shadow-md border border-slate-200 dark:border-zinc-800 cursor-pointer"
                >
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md">
                      <Expand className="w-3.5 h-3.5 text-amber-400" />
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {visibleImages.map((image, idx) => {
                const isLastWithOverlay = shouldLimit && idx === initialLimit - 1;

                return (
                  <div 
                    key={idx}
                    onClick={() => openViewer(idx)}
                    className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 dark:bg-zinc-900 shadow-sm border border-slate-200 dark:border-zinc-800 cursor-pointer"
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />

                    {isLastWithOverlay ? (
                      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-3 text-center transition-all group-hover:bg-slate-950/85">
                        <span className="text-2xl md:text-3xl font-extrabold text-amber-400 tracking-tight">
                          +{remainingCount + 1}
                        </span>
                        <span className="text-xs md:text-sm font-semibold text-slate-200 mt-1">
                          More Photos
                        </span>
                        <span className="text-[11px] text-slate-400 mt-0.5">
                          Click to explore all
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="inline-flex items-center gap-1.5 text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          <Expand className="w-3 h-3 text-amber-400" />
                          Photo {idx + 1}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {totalImages > initialLimit && (
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 text-sm font-semibold transition-all shadow-sm"
              >
                <Images className="w-4 h-4 text-amber-500" />
                {isExpanded ? 'Show Less Photos' : `View All ${totalImages} Photos in Grid`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL - RENDERED VIA PORTAL TO FILL 100% OF BROWSER VIEWPORT */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div 
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} Fullscreen Viewer`}
          className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[99999] w-screen h-screen overflow-hidden bg-black text-white select-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
            margin: 0,
            padding: 0
          }}
          onClick={() => setShowControls((prev) => !prev)}
        >
          {/* Ambient blurred backdrop layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 blur-3xl scale-110 pointer-events-none transition-all duration-700"
            style={{ backgroundImage: `url(${currentImage.url})` }}
          />

          {/* Symmetrical edge-to-edge image canvas */}
          <div 
            className={`absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden transition-all duration-300 ${
              fitMode === 'contain' && showControls
                ? 'p-4 md:p-8 pt-16 pb-24'
                : 'p-0'
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-12 h-12 border-4 border-white/20 border-t-amber-400 rounded-full animate-spin" />
              </div>
            )}

            <img
              src={currentImage.url}
              alt={currentImage.alt}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              onDoubleClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              draggable={false}
              style={{
                imageOrientation: 'from-image',
                maxWidth: fitMode === 'contain' ? (rotation % 180 !== 0 ? '70vh' : '100%') : undefined,
                maxHeight: fitMode === 'contain' ? (rotation % 180 !== 0 ? '70vw' : '100%') : undefined,
                width: fitMode === 'cover' ? '100%' : 'auto',
                height: fitMode === 'cover' ? '100%' : 'auto',
                objectFit: fitMode,
                transform: `rotate(${rotation}deg) scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                transition: isDragging ? 'none' : 'transform 0.25s ease-out'
              }}
              className={`select-none pointer-events-auto transition-opacity duration-300 mx-auto my-auto ${
                fitMode === 'contain' ? 'max-w-full max-h-full rounded-lg shadow-2xl' : 'w-full h-full object-cover'
              }`}
            />
          </div>

          {/* FLOATING TOP CONTROL BAR OVERLAY */}
          <div 
            className={`absolute top-0 inset-x-0 z-40 flex items-center justify-between px-3 md:px-8 py-3.5 md:py-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-all duration-300 pointer-events-auto ${
              showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Counter & Title */}
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                {currentIndex + 1} / {totalImages}
              </span>
              <div className="truncate">
                <h4 className="text-sm md:text-base font-semibold text-white truncate drop-shadow">
                  {title}
                </h4>
                {currentImage.caption && (
                  <p className="text-xs text-slate-300 truncate drop-shadow">
                    {currentImage.caption}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 md:gap-2 shrink-0">
              {/* Toggle Fit vs Fill Viewport */}
              <button
                type="button"
                onClick={toggleFitMode}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border backdrop-blur-md transition-all ${
                  fitMode === 'cover'
                    ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
                }`}
                title={fitMode === 'cover' ? 'Switch to Fit Entire Photo (fit inside)' : 'Switch to Fill Viewport (fill entire screen)'}
              >
                <span>{fitMode === 'cover' ? 'Fill Viewport' : 'Fit Photo'}</span>
              </button>

              {/* Toggle Thumbnails */}
              {totalImages > 1 && (
                <button
                  type="button"
                  title={showThumbnails ? 'Hide thumbnail bar' : 'Show thumbnail bar'}
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className={`p-2 rounded-lg transition-colors border backdrop-blur-md ${
                    showThumbnails 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'bg-white/10 text-slate-400 border-white/10 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </button>
              )}

              {/* Rotate 90 deg */}
              <button
                type="button"
                title="Rotate 90° (R)"
                onClick={handleRotate}
                className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white transition-colors border border-white/15 backdrop-blur-md"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Zoom Controls */}
              <div className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/15 rounded-lg p-0.5">
                <button
                  type="button"
                  title="Zoom Out (-)"
                  disabled={zoomLevel <= 1}
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-md hover:bg-white/15 text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Reset Zoom (0)"
                  onClick={handleResetZoom}
                  className="px-2 py-1 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  title="Zoom In (+)"
                  disabled={zoomLevel >= 3}
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-md hover:bg-white/15 text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
                onClick={toggleFullscreen}
                className="hidden sm:flex p-2 rounded-lg bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white transition-colors border border-white/15 backdrop-blur-md"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Share / Copy Link */}
              <button
                type="button"
                title="Share link"
                onClick={handleShare}
                className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white transition-colors border border-white/15 backdrop-blur-md"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Download */}
              <button
                type="button"
                title="Download original image"
                onClick={handleDownload}
                className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white transition-colors border border-white/15 backdrop-blur-md"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                title="Close viewer (Esc)"
                onClick={closeViewer}
                className="p-2 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white transition-colors shadow-lg ml-1 backdrop-blur-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* FLOATING PREVIOUS BUTTON */}
          {totalImages > 1 && (
            <button
              type="button"
              title="Previous photo (Left arrow)"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className={`absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 rounded-full bg-black/40 hover:bg-black/80 border border-white/15 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl ${
                showControls ? 'opacity-90 hover:opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
              }`}
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          )}

          {/* FLOATING NEXT BUTTON */}
          {totalImages > 1 && (
            <button
              type="button"
              title="Next photo (Right arrow)"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className={`absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 rounded-full bg-black/40 hover:bg-black/80 border border-white/15 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl ${
                showControls ? 'opacity-90 hover:opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
              }`}
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          )}

          {/* Toast Notification */}
          {copied && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4" />
              Link copied to clipboard!
            </div>
          )}

          {/* FLOATING BOTTOM BAR OVERLAY */}
          <div 
            className={`absolute bottom-0 inset-x-0 z-40 pb-4 pt-8 px-4 md:px-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-all duration-300 flex flex-col items-center pointer-events-auto ${
              showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bottom Thumbnails */}
            {totalImages > 1 && showThumbnails && (
              <div ref={modalThumbnailsTrackRef} className="relative w-full max-w-4xl flex items-center justify-start md:justify-center gap-2 overflow-x-auto py-1.5 scrollbar-thin scrollbar-thumb-white/20">
                {normalizedImages.map((img, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      ref={(el) => (thumbnailRefs.current[idx] = el)}
                      type="button"
                      onClick={() => goToIndex(idx)}
                      className={`relative shrink-0 rounded-lg overflow-hidden transition-all duration-200 aspect-video h-12 md:h-14 ${
                        isActive 
                          ? 'ring-2 ring-amber-400 scale-105 opacity-100 shadow-xl' 
                          : 'opacity-40 hover:opacity-85'
                      }`}
                    >
                      <img 
                        src={img.url} 
                        alt={img.alt} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Desktop Keyboard Helper */}
            <div className="hidden md:flex items-center gap-4 text-[11px] text-white/60 mt-2 font-mono">
              <span>◀ / ▶ Navigate</span>
              <span>•</span>
              <span>Click to toggle controls</span>
              <span>•</span>
              <span>Double-click or +/- to Zoom</span>
              <span>•</span>
              <span>R Rotate</span>
              <span>•</span>
              <span>F Fullscreen</span>
              <span>•</span>
              <span>Esc Close</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export { ImageViewerGallery, ImageViewerGallery as EventGallery };
export default ImageViewerGallery;
