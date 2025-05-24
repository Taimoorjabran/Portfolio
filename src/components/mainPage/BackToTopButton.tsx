import React from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BackToTopButtonProps {
  scrollToSection: (id: string) => void;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({ scrollToSection }) => {
  return (
    <button
      onClick={() => scrollToSection('hero')}
      className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors duration-300 z-20 cursor-pointer"
    >
      <FontAwesomeIcon icon={faArrowUp} />  
    </button>
  );
};

export default BackToTopButton;