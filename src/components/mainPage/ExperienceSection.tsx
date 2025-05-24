import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faDownload } from '@fortawesome/free-solid-svg-icons';
import { PROFESSIONAL_EXPERIENCE } from '@/app/constants';


const ExperienceSection: React.FC = () => {
    

    return (
        <section id="experience" className="py-20 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
                    Professional <span className="text-blue-600">Experience</span>
                </h2>

                <div className="max-w-4xl mx-auto">
                    {PROFESSIONAL_EXPERIENCE.map((experience, index) => (
                        <div key={index} className="mb-12 relative">
                            <div className="absolute left-0 top-0 w-1 bg-blue-200 h-full rounded-full dark:bg-blue-800"></div>
                            <div className="ml-8 relative">
                                <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-inner dark:border-gray-900"></div>
                                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 dark:bg-gray-700">
                                    <div className="flex flex-wrap justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{experience.role}</h3>
                                            <div className="text-blue-600 font-medium">{experience.company}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-600 font-medium dark:text-gray-300">{experience.period}</div>
                                            <div className="text-gray-500 dark:text-gray-400">{experience.location}</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-4 dark:text-gray-300">{experience.description}</p>
                                    <div className="mb-4">
                                        <h4 className="text-gray-800 font-semibold mb-2 dark:text-gray-100">Key Achievements:</h4>
                                        <ul className="space-y-2">
                                            {experience.achievements.map((achievement, i) => (
                                                <li key={i} className="flex items-start">
                                                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mt-1 mr-3" />
                                                    <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-gray-800 font-semibold mb-2 dark:text-gray-100">Technologies:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {experience.tech.map((tech, i) => (
                                                <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium dark:bg-blue-800 dark:text-blue-100">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="/taimoor-jabran-cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 !rounded-button cursor-pointer whitespace-nowrap">
                        <FontAwesomeIcon icon={faDownload} className="text-white-600 mt-1 mr-3" />
                        Download Full Resume
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;