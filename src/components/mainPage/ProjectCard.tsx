import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo: string;
  github: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, tags, demo, github }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
      {/* Image Container */}
      <div className="h-48 overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          fill
          className="transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex space-x-4">
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer"
          >
            <i className="fas fa-external-link-alt mr-2"></i>
            Live Demo
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 font-medium flex items-center cursor-pointer"
          >
            <i className="fab fa-github mr-2"></i>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;