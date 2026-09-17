import type { Key } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

interface FlashcardProps {
  key?: Key;
  id: string;
  title: string;
  subtitle?: string;
  text: string;
}

export default function Flashcard({ id, title, subtitle, text }: FlashcardProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-3 sm:p-6 md:p-8">
      <motion.div
        id={id}
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -15, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-3xl max-h-[82vh] sm:max-h-[85vh] bg-[#fff5f7] border-2 border-[#f2ccd5] rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_12px_36px_rgba(215,130,150,0.18)] flex flex-col relative overflow-hidden"
      >
        {/* Subtle decorative header bar */}
        <div className="flex items-center justify-between pb-5 border-b border-[#f3ccd5] mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#fcdce3] border border-[#f3b9c6] flex items-center justify-center text-black">
              <BookOpen size={18} className="text-black stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs sm:text-sm text-black font-medium opacity-80">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-black">
            <Heart size={18} className="fill-black stroke-black opacity-90" />
            <Sparkles size={16} className="text-black opacity-80" />
          </div>
        </div>

        {/* Scrollable text container to comfortably hold even huge amounts of text */}
        <div
          id={`${id}-content`}
          className="flex-1 overflow-y-auto pr-2 sm:pr-4 space-y-4 focus:outline-none"
        >
          {text.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="text-black text-base sm:text-lg md:text-xl font-normal leading-relaxed break-words whitespace-pre-line"
            >
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
