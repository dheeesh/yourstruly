import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import {
  QUESTION,
  LANDING_PHOTOCARD_IMAGE,
} from '../content';

interface LandingPageProps {
  onYes: () => void;
}

export default function LandingPage({ onYes }: LandingPageProps) {
  const [showError, setShowError] = useState(false);
  const [errorKey, setErrorKey] = useState(0);
  const [noClickCount, setNoClickCount] = useState(0);

  const handleNoClick = () => {
    setShowError(true);
    setErrorKey((prev) => prev + 1);
    setNoClickCount((prev) => prev + 1);

    // Auto-dismiss the "Try again ❤️" message after 3.2 seconds
    setTimeout(() => {
      setShowError(false);
    }, 3200);
  };

  return (
    <div
      id="landing-container"
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 bg-[#fcecee]"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Question and Action Buttons */}
        <motion.div
          id="landing-left-column"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6"
        >
          {/* Main Question */}
          <h1
            id="landing-question"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-snug break-words"
          >
            {QUESTION}
          </h1>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col items-center lg:items-start space-y-4 w-full sm:w-auto">
            <div className="flex flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center lg:justify-start">
              {/* YES Button */}
              <motion.button
                id="btn-yes"
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={onYes}
                className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-[#f7c5d2] hover:bg-[#f5b3c3] active:bg-[#f39fb3] border-2 border-[#e8a2b5] text-black font-bold text-lg sm:text-xl shadow-[0_6px_20px_rgba(224,142,160,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[130px] sm:min-w-[150px]"
              >
                <span>YES</span>
                <Heart size={20} className="fill-black stroke-black" />
              </motion.button>

              {/* NO Button with playful shake on click */}
              <motion.button
                id="btn-no"
                type="button"
                key={noClickCount}
                animate={
                  showError
                    ? {
                        x: [0, -8, 8, -6, 6, -3, 3, 0],
                        rotate: [0, -2, 2, -1, 1, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.45 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.93 }}
                onClick={handleNoClick}
                className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-[#fadfe6] hover:bg-[#f7d1dc] active:bg-[#f4c2cf] border border-[#e8bac7] text-black font-semibold text-lg sm:text-xl shadow-[0_4px_12px_rgba(224,142,160,0.2)] transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[130px] sm:min-w-[150px]"
              >
                <span>NO</span>
              </motion.button>
            </div>

            {/* Error / "Try again ❤️" message */}
            <div className="h-10 flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                {showError && (
                  <motion.div
                    id="try-again-message"
                    key={errorKey}
                    initial={{ opacity: 0, y: -6, scale: 0.92 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      x: [0, -4, 4, -3, 3, 0],
                    }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fde8ed] border border-[#f2afbe] shadow-sm text-black font-semibold text-base sm:text-lg"
                  >
                    <span className="text-black">Try again ❤️</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Photocard (Polaroid Style) */}
        <motion.div
          id="landing-right-column"
          initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <div
            id="photocard-frame"
            className="w-full max-w-[340px] sm:max-w-[380px] bg-[#fff5f7] border-2 border-[#f2ccd5] rounded-3xl p-4 sm:p-5 shadow-[0_12px_32px_rgba(200,120,140,0.18)] transition-all duration-300 transform hover:shadow-[0_16px_40px_rgba(200,120,140,0.25)]"
          >
            {/* Photocard Image Container */}
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#fcecee] border border-[#f5dbe1] relative">
              <img
                src={LANDING_PHOTOCARD_IMAGE}
                alt="Photocard Memory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-3 right-3 bg-[#fcecee]/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#f3ccd5] text-xs font-semibold text-black flex items-center gap-1 shadow-xs">
                <Heart size={12} className="fill-black stroke-black" />
                <span>Memory</span>
              </div>
            </div>

            {/* Photocard Caption / Polaroid bottom margin */}
            <div className="pt-4 pb-1 text-center">
              <p className="text-black font-medium text-sm sm:text-base tracking-wide">
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
