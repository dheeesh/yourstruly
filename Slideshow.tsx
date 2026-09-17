import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, Image as ImageIcon } from 'lucide-react';
import { SLIDESHOW_IMAGES } from '../content';

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const totalImages = SLIDESHOW_IMAGES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  // Autoplay timer with 3.8s delay between images
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3800);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentImageSrc = SLIDESHOW_IMAGES[currentIndex];

  return (
    <div
      id="slideshow-fullscreen-container"
      className="relative w-full h-[calc(100vh-5rem)] md:h-screen flex flex-col items-center justify-between p-3 sm:p-6 bg-[#fcecee] overflow-hidden"
    >
      {/* Top Bar: Title & Image Counter */}
      <div className="w-full flex items-center justify-between max-w-5xl z-20 px-3 py-2">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} className="text-black" />
          <span className="text-black font-semibold text-base sm:text-lg">
            Our Slideshow
          </span>
        </div>
        <div className="px-3.5 py-1 rounded-full bg-[#fbdfe6] border border-[#f3ccd5] text-black font-bold text-xs sm:text-sm tracking-wider">
          {currentIndex + 1} / {totalImages}
        </div>
      </div>

      {/* Main Image Stage - fills available screen, preserves aspect ratio with object-fit: contain */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden my-2 max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            className="w-full h-full flex items-center justify-center p-2 sm:p-4"
          >
            <div className="relative max-w-full max-h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(200,120,140,0.22)] bg-[#fff5f7] border-2 border-[#f2ccd5] p-2 sm:p-3">
              <img
                src={currentImageSrc}
                alt={`Slideshow memory ${currentIndex + 1}`}
                referrerPolicy="no-referrer"
                className="max-h-[62vh] md:max-h-[72vh] max-w-full object-contain rounded-xl select-none"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous Button Overlay */}
        <button
          id="btn-slideshow-prev"
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-[#fcecee]/85 hover:bg-[#fbdbe3] border border-[#f2ccd5] text-black shadow-md transition-all cursor-pointer z-20 active:scale-95"
        >
          <ChevronLeft size={24} className="text-black stroke-[2.5]" />
        </button>

        {/* Next Button Overlay */}
        <button
          id="btn-slideshow-next"
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-[#fcecee]/85 hover:bg-[#fbdbe3] border border-[#f2ccd5] text-black shadow-md transition-all cursor-pointer z-20 active:scale-95"
        >
          <ChevronRight size={24} className="text-black stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom Controls & 15-Dot Progress Indicator */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-3 z-20 pb-2">
        {/* Play / Pause toggle button */}
        <div className="flex items-center gap-4">
          <button
            id="btn-slideshow-playpause"
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbdfe6] hover:bg-[#f9d2dc] border border-[#f3ccd5] text-black text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause size={14} className="text-black fill-black" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={14} className="text-black fill-black" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>

        {/* 15 Progress Dots */}
        <div
          id="slideshow-indicators"
          className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap max-w-full px-2"
        >
          {SLIDESHOW_IMAGES.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                type="button"
                aria-label={`Jump to image ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-6 sm:w-8 h-2.5 sm:h-3 bg-black shadow-xs'
                    : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#e8aab8] hover:bg-black/60'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
