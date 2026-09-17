import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart, Calendar, Image as ImageIcon, BookOpen } from 'lucide-react';
import { ScrapbookSection } from '../types';

interface SidebarProps {
  currentSection: ScrapbookSection;
  onSelectSection: (section: ScrapbookSection) => void;
  onBackToLanding?: () => void;
}

interface NavItem {
  id: ScrapbookSection;
  label: string;
  icon: typeof BookOpen;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', icon: BookOpen },
  { id: 'day1', label: 'Day 1', icon: Calendar },
  { id: 'day2', label: 'Day 2', icon: Calendar },
  { id: 'day3', label: 'Day 3', icon: Calendar },
  { id: 'day4', label: 'Day 4', icon: Calendar },
  { id: 'slideshow', label: 'Slideshow', icon: ImageIcon },
];

export default function Sidebar({
  currentSection,
  onSelectSection,
  onBackToLanding,
}: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (section: ScrapbookSection) => {
    onSelectSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Top Navigation Bar with Hamburger */}
      <div className="md:hidden w-full bg-[#f9d7df] border-b-2 border-[#f0bcc8] px-4 py-3 flex items-center justify-between z-30 sticky top-0 shadow-xs">
        <div className="flex items-center gap-2">
          <Heart size={20} className="fill-black stroke-black" />
          <span className="font-bold text-black text-lg">Our Scrapbook</span>
        </div>

        <button
          id="btn-mobile-menu-toggle"
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="p-2 rounded-xl bg-[#fcdce3] border border-[#f2b3c2] text-black active:scale-95"
        >
          {mobileMenuOpen ? <X size={22} className="text-black" /> : <Menu size={22} className="text-black" />}
        </button>
      </div>

      {/* Mobile Dropdown / Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden w-full bg-[#fcecee] border-b-2 border-[#f0bcc8] px-4 py-4 space-y-2 z-20 overflow-hidden shadow-md"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left font-semibold text-base transition-all ${
                    isActive
                      ? 'bg-[#f7c0ce] border-2 border-[#e89db1] shadow-xs'
                      : 'bg-[#fadce3]/60 hover:bg-[#f7d0db] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-black stroke-[2.2]" />
                    <span className="text-black">{item.label}</span>
                  </div>
                  {isActive && <Heart size={16} className="fill-black stroke-black" />}
                </button>
              );
            })}

            {onBackToLanding && (
              <div className="pt-2 border-t border-[#f2ccd5]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBackToLanding();
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-black/80 hover:text-black"
                >
                  ← Back to Question
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Vertical Sidebar */}
      <aside
        id="desktop-sidebar"
        className="hidden md:flex flex-col w-64 lg:w-72 h-screen bg-[#fbe2e8] border-r-2 border-[#f0bcc8] p-6 justify-between shadow-[4px_0_24px_rgba(220,130,150,0.08)] flex-shrink-0"
      >
        {/* Navigation Links */}
        <div className="space-y-6">
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  id={`nav-${item.id}`}
                  type="button"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectSection(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-left font-semibold text-base transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#f7c0ce] border-2 border-[#e89db1] shadow-sm'
                      : 'bg-transparent hover:bg-[#f6d2dc] border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={19} className="text-black stroke-[2.2]" />
                    <span className="text-black tracking-wide">{item.label}</span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-heart"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    >
                      <Heart size={16} className="fill-black stroke-black" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-4 border-t border-[#f2ccd5]">
          {onBackToLanding && (
            <button
              id="btn-return-landing"
              type="button"
              onClick={onBackToLanding}
              className="w-full py-2 px-3 rounded-xl bg-[#fcdce3] hover:bg-[#faccd7] border border-[#f0bcc8] text-xs font-semibold text-black tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all shadow-2xs"
            >
              <span>← Revisit Question</span>
            </button>
          )}

          <div className="px-2 text-center">
            <p className="text-xs text-black opacity-70 font-medium">
              
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
