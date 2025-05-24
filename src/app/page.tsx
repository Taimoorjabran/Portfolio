'use client';

import React, { useState } from 'react';
import Navbar from '../components/mainPage/Navbar';
import HeroSection from '../components/mainPage/HeroSection';
import AboutSection from '../components/mainPage/AboutSection';
import ProjectsSection from '../components/mainPage/ProjectSection';
import SkillsSection from '../components/mainPage/SkillsSection';
import BackToTopButton from '../components/mainPage/BackToTopButton';
import ContactSection from '@/components/mainPage/ContactSection';
import Footer from '@/components/mainPage/Footer';
import ExperienceSection from '@/components/mainPage/ExperienceSection';

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        scrollToSection={scrollToSection}
      />
      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <BackToTopButton scrollToSection={scrollToSection} />
    </div>
  );
};

export default Home;