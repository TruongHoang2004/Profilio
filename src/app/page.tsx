"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import WelcomeSection from '@/components/welcome/WelcomeSection';
import AboutMeSection from '@/components/about/AboutMeSection';
import ProjectsSection from '@/components/projects/ProjectSection';
import SkillsSection from '@/components/skills/SkillSection';

export const variants = {
  enter: {
    y: 1000,
    opacity: 0
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1
  },
  exit: {
    zIndex: 0,
    y: -1000,
    opacity: 0
  }
};

const FullpagePortfolio = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sections: Array<'welcome' | 'about' | 'skills' | 'projects'> = ['welcome', 'about', 'skills', 'projects'];
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'up' | 'down') => {
    if (isScrolling) return;

    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 1000);

    if (direction === 'down' && currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else if (direction === 'up' && currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? 'down' : 'up');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          handleScroll('down');
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          handleScroll('up');
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [currentSection, isScrolling]);

  // Navigation dots
  const Dots = () => (
    <div className="top-1/2 right-8 fixed space-y-4 transform -translate-y-1/2">
      {sections.map((_, index) => (
        <motion.div
          key={index}
          className={`w-3 h-3 rounded-full cursor-pointer ${currentSection === index ? 'bg-white' : 'bg-white/50'
            }`}
          whileHover={{ scale: 1.5 }}
          onClick={() => setCurrentSection(index)}
        />
      ))}
    </div>
  );

  const sectionComponents: { [key in 'welcome' | 'about' | 'skills' | 'projects']: (props: any) => JSX.Element } = {
    welcome: WelcomeSection,
    about: AboutMeSection,
    skills: SkillsSection,
    projects: ProjectsSection
  };

  const CurrentSection = sectionComponents[sections[currentSection]];

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen overflow-hidden"
    >
      <CurrentSection />
      <Dots />
    </div>
  );
};

export default FullpagePortfolio;
