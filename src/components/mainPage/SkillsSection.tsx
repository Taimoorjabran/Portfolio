import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ADDITIONAL_SKILLS, FRONTEND_SKILLS, BACKEND_AND_TOOLS } from '@/app/constants';



const SkillsSection: React.FC = () => {
  const skillChartRef = useRef<HTMLDivElement>(null);

  // Initialize chart
  useEffect(() => {
    if (skillChartRef.current) {
      const chart = echarts.init(skillChartRef.current);
      const option = {
        animation: false,
        radar: {
          indicator: [
            { name: 'React.js', max: 100 },
            { name: 'Next.js', max: 100 },
            { name: 'TypeScript', max: 100 },
            { name: 'Node.js', max: 100 },
            { name: 'User Interface', max: 100 },
            { name: 'Performance', max: 100 }
          ],
          radius: 130,
          splitNumber: 5,
          axisName: {
            color: '#333',
            fontSize: 14,
            fontWeight: 500
          }
        },
        series: [{
          type: 'radar',
          data: [{
            value: [95, 90, 85, 80, 88, 92],
            name: 'Skills',
            areaStyle: {
              color: 'rgba(59, 130, 246, 0.6)'
            },
            lineStyle: {
              color: 'rgba(59, 130, 246, 0.8)',
              width: 2
            },
            itemStyle: {
              color: '#3b82f6'
            }
          }]
        }]
      };
      chart.setOption(option);
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Technical <span className="text-blue-600">Skills</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={skillChartRef} className="w-full h-80"></div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                  <i className="fas fa-code text-blue-600 mr-3"></i>
                  Frontend
                </h3>
                <ul className="space-y-4">
                  {FRONTEND_SKILLS.map((skill, index) => (
                    <li key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                  <i className="fas fa-server text-blue-600 mr-3"></i>
                  Backend & Tools
                </h3>
                <ul className="space-y-4">
                  {BACKEND_AND_TOOLS.map((skill, index) => (
                    <li key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <i className="fas fa-tools text-blue-600 mr-3"></i>
                Additional Skills
              </h3>
              <div className="flex flex-wrap gap-4">
                {ADDITIONAL_SKILLS.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md px-4 py-3 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={skill.icon} className="text-blue-600" />
                    <span className="text-gray-700">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;