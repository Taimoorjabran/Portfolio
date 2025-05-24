import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KEY_STRENGTHS, NOTABLE_CONTRIBUTIONS, PROFESSIONAL_SUMMARY } from '@/app/constants';



const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Professional <span className="text-blue-600">Summary</span>
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {PROFESSIONAL_SUMMARY}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Key Strengths</h3>
              <ul className="space-y-3">
                {KEY_STRENGTHS.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mt-1 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Notable Contributions</h3>
              <ul className="space-y-3">
                {NOTABLE_CONTRIBUTIONS.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-trophy text-blue-600 mt-1 mr-3"></i>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {[
                'React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'Redux Toolkit', 'Node.js',
                'Express', 'MongoDB', 'Socket.IO', 'Salesforce', 'BigCommerce', 'Tailwind CSS',
                'Material UI', 'HTML5', 'CSS/SASS/LESS', 'Jest', 'React Testing Library',
                'Webpack', 'Vite', 'Babel', 'CI/CD', 'Docker', 'AWS'
              ].map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
