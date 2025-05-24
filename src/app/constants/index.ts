import {
    faTachometerAlt,
    faMobileAlt,
    faSearch,
    faTasks,
    faVial,
    faCloud,
    faDownload,
  } from '@fortawesome/free-solid-svg-icons';
  import { faDocker } from '@fortawesome/free-brands-svg-icons';

export const KEY_STRENGTHS = [
    'Advanced React Patterns & Hooks',
    'Next.js App Router & SSR/SSG',
    'Scalable Backend with Node.js & MongoDB',
    'JWT-based Auth & Role Management',
    'WebSockets & Real-Time Architecture'
];
export const PROFESSIONAL_SUMMARY = 'Experienced Senior Software Engineer with 5 years of expertise in building scalable, high - performance web applications and delivering user - centric designs.Proficient in React.js, Next.js, and Node.js integrations with strong experience in frontend, backend, and cloud - based solutions.Adept at working across cross - functional teams, enhancing web vitals, and leading development efforts in dynamic environments.'
export const NOTABLE_CONTRIBUTIONS = [
    'Reduced frontend load times by 40% via code-splitting and core web vital improvements',
    'Led end-to-end development of forecasting and health care platforms',
    'Streamlined CI/CD process cutting deployment time by 60%',
    'Mentored junior developers and onboarded new team members'
  ];
export const PROFESSIONAL_EXPERIENCE = [
    {
        role: 'Senior Engineer',
        company: 'Celestial Systems Inc.',
        period: 'May 2021 - Present',
        location: 'Noida, India',
        description: 'Leading the frontend development team in building enterprise-level React applications.',
        achievements: [
            'Designed and developed high-performance UIs for large-scale enterprise products.',
            'Improved application performance, achieving a 30% reduction in core loading times.',
            'Led the integration of JWT-based authentication with BigCommerce and custom apps',
            'Mentored junior engineers, conducted code reviews, and participated in architectural decisions.',
            'Implemented dynamic dashboards, multi-tenant solutions, and scalable web modules.'
        ],
        tech: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Node.js', 'MongoDB', 'Ci/CD', 'Jest', 'AWS']
    },
    {
        role: 'Frontend Developer',
        company: 'Source Coad Labs',
        period: 'Sep 2020 - Feb 2021',
        location: 'Mumbai, India',
        description: 'Developed and maintained multiple client-facing React applications.',
        achievements: [
            'Built a drag-and-drop website builder platform with reusable component libraries.',
            'Focused on scalability and maintainability, ensuring long-term product evolution.',
            'Collaborated with UX teams to enhance user flows and responsivedesign practices.'
        ],
        tech: ['React', 'Redux', 'Node.js', 'MongoDB', 'Material UI']
    }
];

export const PORTFOLIO_HEADING = 'Transforming business requirements into scalable modern applications with 5 years of expertise in building enterprise-level solutions.'
export const PROJECT_DATA = [
    {
      title: 'Kinexis — Enterprise Integration Platform',
      description:
        'Built complex UI to manage Salesforce, BigCommerce, and third-party integrations. Implemented OAuth 2.0 PKCE flows and an activity dashboard with real-time notifications.',
      image: '/images/kinexis.png',
      tags: ['Next.js', 'TypeScript', 'GraphQL', 'Node.js', 'PostgreSQL'],
      demo: '#',
      github: '#',
    },
    {
      title: '360 Learning — Collaborative Learning Platform',
      description:
        'Built complex UI for Admin Dashboard flow, added class management features, learner apporval flow and third-party integrations.',
      image: '/images/360_Learning.png',
      tags: ['React.js', 'TypeScript', 'GraphQL', 'Node.js', 'PostgreSQL'],
      demo: 'https://360learning.com',
      github: '#',
    },
    {
      title: 'PCU — Forecasting Platform',
      description:
        'Created a project dashboard with forecasting, custom settings, and enhanced reporting using visual KPIs and interactive charts. Also implemented estimation module.',
      image: '/images/PCU.png',
      tags: ['React', 'Context API', 'Node.js', 'ECharts', 'PostgreSQL'],
      demo: '#',
      github: '#',
    },
    {
      title: 'MEDGuide — Healthcare Platform',
      description:
        'Developed dynamic forms, dashboards, and offline-ready components with PWA support for enhanced medical data accessibility.',
      image: '/images/medGuide.png',
      tags: ['React', 'Context API', 'Material UI', 'SSR', 'Apollo GraphQL'],
      demo: 'https://medguide-rc1.csi-infra.com/medguide',
      github: '#',
    },
    {
      title: 'SQLDM — Network Management System',
      description:
        'Delivered responsive dashboards and real-time visualizations for network analytics and dynamic table views.',
      image: '/images/SQLDM.png',
      tags: ['React', 'Redux', 'Material UI', 'React charts'],
      demo: 'https://www.idera.com/products/sql-diagnostic-manager',
      github: '#',
    },
    {
      title: '360 View — Virtual Tour Platform',
      description:
        'Built a mobile-first 360° virtual tour app with form data capture and seamless media experiences. User can experience virtual tours in 360 view.',
      image: '/images/360_View.png',
      tags: ['React', 'Redux', 'CSS', 'Firebase'],
      demo: '#',
      github: '#',
    },
  ];

export const ADDITIONAL_SKILLS = [
    { name: 'Performance Optimization', icon: faTachometerAlt },
    { name: 'Responsive Design', icon: faMobileAlt },
    { name: 'SEO', icon: faSearch },
    { name: 'Agile/Scrum', icon: faTasks },
    { name: 'Testing', icon: faVial },
    { name: 'AWS', icon: faCloud },
    { name: 'Docker', icon: faDocker }
  ];

export const FRONTEND_SKILLS = [
    { name: 'React.js', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Redux/Context', level: 90 },
    { name: 'CSS/SASS', level: 88 }
  ];

export const BACKEND_AND_TOOLS = [
    { name: 'Node.js', level: 80 },
    { name: 'GraphQL', level: 75 },
    { name: 'REST APIs', level: 90 },
    { name: 'Git/GitHub', level: 92 },
    { name: 'CI/CD', level: 85 }
  ];