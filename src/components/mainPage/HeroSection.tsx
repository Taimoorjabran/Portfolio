import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PORTFOLIO_HEADING } from '@/app/constants';


interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = '5 Years Experience • Software Engineer • Frontend Expert';
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="hero" className="pt-24 md:pt-0 relative bg-gradient-to-br from-gray-900 via-blue-900 to-black" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Image using next/image */}
        {/* <Image
          src="/images/hero-background.jpg"
          alt="Ultramodern minimalist tech background"
          fill
          quality={80}
          className="opacity-40"
          priority
        /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>
      </div>
      <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-3/5 text-center md:text-left text-white">
            <div className="inline-block px-4 py-2 bg-blue-600/20 rounded-full mb-6">
              <span className="text-blue-400 font-semibold">Available for Frontend, Backend and Full Stack Engineer roles</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Taimoor Jabran</span>
              <br />
              <span className="text-white">Software Engineer</span>
            </h1>
            <div className="h-8 mb-8">
              <p className="text-xl md:text-2xl font-light">{typedText}<span className="animate-pulse">|</span></p>
            </div>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl">{PORTFOLIO_HEADING}</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="group bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 !rounded-button cursor-pointer whitespace-nowrap flex items-center"
              >
                <span>View Portfolio</span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => window.open('https://www.linkedin.com/in/taimoorjabran', '_blank')}
                className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 !rounded-button cursor-pointer whitespace-nowrap flex items-center"
              >
                <i className="fab fa-linkedin mr-2"></i>
                <span>LinkedIn Profile</span>
              </button>
            </div>
            <div className="flex items-center mt-12 space-x-6">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-blue-400">5</span>
                <span className="text-gray-400">Years Experience</span>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-blue-400">15+</span>
                <span className="text-gray-400">Projects Completed</span>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-blue-400">100%</span>
                <span className="text-gray-400">Client Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="/images/profile.png"
                alt="Taimoor Jabran Professional Headshot"
                fill
                quality={90}
                priority
                sizes={'auto'}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
        <button onClick={() => scrollToSection('about')} className="text-white animate-bounce cursor-pointer">
          <i className="fas fa-chevron-down text-2xl"></i>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;