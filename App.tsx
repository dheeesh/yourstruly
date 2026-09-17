import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Flashcard from './components/Flashcard';
import Slideshow from './components/Slideshow';
import { ScrapbookSection } from './types';
import {
  ABOUT_TEXT,
  DAY1_TEXT,
  DAY2_TEXT,
  DAY3_TEXT,
  DAY4_TEXT,
} from './content';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'main'>('landing');
  const [currentSection, setCurrentSection] = useState<ScrapbookSection>('about');

  return (
    <div className="min-h-screen w-full bg-[#fcecee] text-black overflow-x-hidden selection:bg-[#f3b9c6] selection:text-black">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' ? (
          <motion.div
            key="page-landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full min-h-screen"
          >
            <LandingPage onYes={() => setCurrentPage('main')} />
          </motion.div>
        ) : (
          <motion.div
            key="page-main"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex flex-col md:flex-row min-h-screen w-full bg-[#fcecee]"
          >
            {/* Sidebar Navigation */}
            <Sidebar
              currentSection={currentSection}
              onSelectSection={setCurrentSection}
              onBackToLanding={() => setCurrentPage('landing')}
            />

            {/* Main Content Presentation */}
            <main
              id="main-scrapbook-content"
              className="flex-1 min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center justify-center relative overflow-hidden bg-[#fcecee]"
            >
              <AnimatePresence mode="wait">
                {currentSection === 'about' && (
                  <Flashcard
                    key="flashcard-about"
                    id="flashcard-about"
                    title="About Us"
                    
                    text={ABOUT_TEXT}
                  />
                )}

                {currentSection === 'day1' && (
                  <Flashcard
                    key="flashcard-day1"
                    id="flashcard-day1"
                    title="Day 1"
                    
                    text={DAY1_TEXT}
                  />
                )}

                {currentSection === 'day2' && (
                  <Flashcard
                    key="flashcard-day2"
                    id="flashcard-day2"
                    title="Day 2"
                    
                    text={DAY2_TEXT}
                  />
                )}

                {currentSection === 'day3' && (
                  <Flashcard
                    key="flashcard-day3"
                    id="flashcard-day3"
                    title="Day 3"
                    
                    text={DAY3_TEXT}
                  />
                )}

                {currentSection === 'day4' && (
                  <Flashcard
                    key="flashcard-day4"
                    id="flashcard-day4"
                    title="Day 4"
                    
                    text={DAY4_TEXT}
                  />
                )}

                {currentSection === 'slideshow' && (
                  <motion.div
                    key="slideshow-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Slideshow />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
