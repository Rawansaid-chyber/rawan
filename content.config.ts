// content.config.ts — single source of truth for all portfolio content

export const profile = {
  name: 'Rawan Said Al Siyabi',
  handle: 'rawan',
  role: 'Software Developer & GIS Programmer',
  currentlyAt: 'Middle East College',
  basedIn: 'Muscat, OM',
  writes: ['JavaScript', 'Swift', 'SQL', 'PHP', 'Python'],
  availability: 'available' as const,
  avatarUrl: '/avatar.jpg',
  email: 'Rawan1172h@gmail.com',
  phone: '+968 79110606',
  linkedin: 'https://www.linkedin.com/in/rawan-al-siyabi',
  github: '',
};

export const about = {
  headline: 'Building software that maps the real world.',
  subheadline: 'Fresh CS graduate blending full-stack development with GIS expertise.',
  paragraphs: [
    'I hold a BSc in Computer Science from Middle East College (in partnership with Coventry University, UK). My graduation project — a full-stack application for Mazoon Dairy Company — earned a 90% grade and gave me hands-on experience delivering production software against real business requirements.',
    'Since graduating I have worked across government digital-transformation programs, satellite projects, and GIS infrastructure at three Omani ministries. I write across the stack — JavaScript, PHP and SQL on the web side; Swift for iOS; and Python when scripting spatial data in ArcGIS. I care about software that is reliable in the real world, not just in a demo.',
  ],
  skills: [
    { label: 'JavaScript / Web Dev', percent: 85 },
    { label: 'ArcGIS Pro / GIS', percent: 85 },
    { label: 'SQL / Databases', percent: 80 },
    { label: 'Figma / UI-UX', percent: 75 },
    { label: 'PHP / Backend', percent: 75 },
    { label: 'Swift / iOS', percent: 70 },
    { label: 'Mendix (Low-code)', percent: 70 },
    { label: 'Python (Spatial)', percent: 65 },
  ],
  tags: [
    { label: 'Muscat, OM', icon: 'MapPin' },
    { label: 'Full-Stack Dev', icon: 'Code2' },
    { label: 'GIS Specialist', icon: 'Globe' },
    { label: 'iOS Developer', icon: 'Smartphone' },
    { label: 'Hackathon Winner', icon: 'Trophy' },
  ],
};

export const timeline = [
  {
    role: 'Testing, Quality Assurance & Application Security Specialist',
    company: '360Remit',
    location: 'Muscat, OM',
    start: 'Dec 2025',
    end: 'Present',
    current: true,
    bullets: [
      'Test planning, execution, and end-to-end QA across functional, integration, regression, UAT, API, and security testing cycles.',
      'Validation of business, technical, and security requirements against functional specifications.',
      'Defect and vulnerability tracking in close collaboration with developers through to resolution.',
      'Cybersecurity validation for the mobile app and Admin Portal — authentication, session management, access control, and secure workflows.',
      'Secure API and payment testing — wallet transactions, remittances, payment gateways, card payments, and fintech integrations.',
      'Release validation, production verification, and audit-ready test documentation.',
    ],
  },
  {
    role: 'GIS Programmer (Training)',
    company: 'Geo Solutions',
    location: 'Muscat, OM',
    start: '2024',
    end: 'Jul 2025',
    current: false,
    bullets: [
      'Spatial data management, analysis, and web-layer publishing using ArcGIS Pro.',
      'Water infrastructure asset mapping — valves, hydrants, service connections — with ArcGIS Enterprise.',
      'Resolved GIS layer projection issues and prepared datasets for web deployment.',
      'Created thematic maps with categorised asset types for municipal infrastructure.',
    ],
  },
  {
    role: 'Digital Transformation Intern',
    company: 'Ministry of Transport, Communications & IT',
    location: 'Muscat, OM',
    start: 'Nov 2023',
    end: 'Mar 2024',
    current: false,
    bullets: [
      'Contributed to the national digital-transformation programme.',
      'Evaluated technology solutions and delivered workshops to ministry stakeholders.',
      'Produced written content and presented topics to ministry leadership.',
    ],
  },
  {
    role: 'GIS Intern — Geo Oman Platform',
    company: 'Ministry of Housing & Urban Planning',
    location: 'Muscat, OM',
    start: 'Jun 2024',
    end: 'Jul 2024',
    current: false,
    bullets: [
      'Used ESRI ArcGIS Pro for remote sensing and geospatial analysis.',
      'Studied valley paths across Oman using satellite imagery.',
      'Corrected Python scripts connecting spatial layers to the Geo Oman platform.',
    ],
  },
  {
    role: 'Space Program Intern',
    company: 'Ministry of Transport, Communications & IT',
    location: 'Muscat, OM',
    start: 'Oct 2023',
    end: 'Nov 2023',
    current: false,
    bullets: [
      'Participated in the National Space Program.',
      'Contributed to project management and analysis workflows.',
      'Worked on a CubeSat project focused on fish-wealth monitoring.',
    ],
  },
  {
    role: 'IT Support Technician',
    company: 'Middle East College',
    location: 'Muscat, OM',
    start: '2021',
    end: '2022',
    current: false,
    bullets: [
      'Provided technical support to students and academic staff.',
      'Performed periodic hardware inspection and maintenance.',
    ],
  },
];

export const stack = {
  frontend: ['javascript', 'html5', 'css3', 'swift', 'typescript'],
  backend:  ['php', 'mysql', 'postgresql'],
  gis:      ['arcgis', 'python', 'postgresql'],
  tooling:  ['figma', 'git', 'xcode', 'mendix'],
};

// Icon slugs map to react-icons/si names or lucide-react names
export const stackIcons: Record<string, { label: string; color: string; siSlug?: string; lucideIcon?: string }> = {
  javascript: { label: 'JavaScript',  color: '#f7df1e', siSlug: 'SiJavascript' },
  html5:      { label: 'HTML5',       color: '#e34f26', siSlug: 'SiHtml5' },
  css3:       { label: 'CSS3',        color: '#1572b6', siSlug: 'SiCss3' },
  swift:      { label: 'Swift',       color: '#fa7343', siSlug: 'SiSwift' },
  typescript: { label: 'TypeScript',  color: '#3178c6', siSlug: 'SiTypescript' },
  php:        { label: 'PHP',         color: '#777bb4', siSlug: 'SiPhp' },
  mysql:      { label: 'MySQL',       color: '#4479a1', siSlug: 'SiMysql' },
  postgresql: { label: 'PostgreSQL',  color: '#4169e1', siSlug: 'SiPostgresql' },
  arcgis:     { label: 'ArcGIS Pro',  color: '#2c7bb6', siSlug: 'SiEsri' },
  python:     { label: 'Python',      color: '#3776ab', siSlug: 'SiPython' },
  figma:      { label: 'Figma',       color: '#f24e1e', siSlug: 'SiFigma' },
  git:        { label: 'Git',         color: '#f05032', siSlug: 'SiGit' },
  xcode:      { label: 'Xcode',       color: '#147efb', siSlug: 'SiXcode' },
  mendix:     { label: 'Mendix',      color: '#0595db', siSlug: 'SiMendix' },
};

export const projects = [
  {
    id: 'telal-erp',
    title: 'Telal Al-Bidaya ERP Suite',
    namespace: 'property.erp.legal',
    description:
      'Full-stack engineering for a live bilingual (Arabic/English) property management and legal-vault ERP. Built FastAPI backend services, financial ledger logic, tenant CRM modules, and automated email integrations for Telal Al-Bidaya Real Estate.',
    tags: ['Next.js', 'FastAPI', 'Full-Stack', 'ERP'],
    badge: '26+ Modules',
    badgeColor: 'amber',
    icon: 'Globe',
    image: null,
  },
  {
    id: 'mazoon',
    title: 'Mazoon Dairy App',
    namespace: 'graduation.project',
    description:
      'Full-stack mobile application built for Mazoon Dairy Company as a graduation project. Earned a grade of 90% — designed, developed, and deployed end-to-end.',
    tags: ['Swift', 'iOS', 'Full-Stack', 'Graduation'],
    badge: '90% Grade',
    badgeColor: 'amber',
    icon: 'Smartphone',
    image: '/images/team__my_works__034.jpg',
  },
  {
    id: 'coinedge',
    title: 'COIN EDGE',
    namespace: 'nbo.hackathon',
    description:
      'Fintech platform built at the NBO Financial Startups Hackathon. Secured 3rd place — a Bank Accelerators entry combining coding and design under competition pressure.',
    tags: ['Fintech', 'Hackathon', 'JavaScript', 'Figma'],
    badge: '🥉 3rd Place',
    badgeColor: 'amber',
    icon: 'Trophy',
    image: '/images/hackathon__nbo_financial_startups_hackathon_th__065.jpg',
  },
  {
    id: 'nds-water',
    title: 'NDS Water GIS Platform',
    namespace: 'arcgis.enterprise.web',
    description:
      'Developed a live GIS web portal tracking 205.4k km of water network in Salalah. Built and published ArcGIS dashboards showing valves, hydrants, service connections, and pump stations in real-time.',
    tags: ['ArcGIS Enterprise', 'Dashboards', 'Web GIS', 'GIS'],
    badge: '205k km network',
    badgeColor: 'teal',
    icon: 'Globe',
    image: '/images/team__my_works__061.jpg',
  },
  {
    id: 'arcgis-enterprise',
    title: 'Geo Solutions ArcGIS Portal',
    namespace: 'arcgis.enterprise.admin',
    description:
      'Administered and configured the Geo Solutions ArcGIS Enterprise organization portal. Managed layers, galleries, and user access for the national GIS infrastructure team.',
    tags: ['ArcGIS Enterprise', 'Admin', 'GIS', 'Spatial Data'],
    badge: null,
    badgeColor: 'teal',
    icon: 'MapPin',
    image: '/images/team__my_works__048.jpg',
  },
  {
    id: 'gis-salalah',
    title: 'GIS Water Tracking — Salalah',
    namespace: 'arcgis.infrastructure',
    description:
      'Water network mapping project for Salalah. Mapped valves, hydrants, and service connections at device level using ArcGIS Pro; resolved coordinate system mismatches and published web layers.',
    tags: ['ArcGIS Pro', 'ArcGIS Enterprise', 'Spatial Data', 'GIS'],
    badge: null,
    badgeColor: 'teal',
    icon: 'MapPin',
    image: '/images/project__water_tracking_project_salalah__050.jpg',
  },
  {
    id: 'geo-oman',
    title: 'Geo Oman Valley Mapping',
    namespace: 'remote.sensing',
    description:
      'Remote-sensing study of Omani valley paths using satellite imagery and ArcGIS Pro. Corrected Python scripts to connect spatial layers to the national Geo Oman web platform.',
    tags: ['Remote Sensing', 'Python', 'ArcGIS', 'Geo Oman'],
    badge: null,
    badgeColor: 'teal',
    icon: 'Globe',
    image: '/images/project__tracking_project_salalah__057.jpg',
  },
];


export const interests = [
  {
    namespace: 'arcgis.mapping',
    title: 'GIS & Spatial Analysis',
    description: 'Turning raw coordinates into meaningful maps — from water networks to valley paths.',
    icon: 'Map',
    interactive: true, // → GIS Coordinate Converter widget
  },
  {
    namespace: 'ios.dev',
    title: 'iOS Development',
    description: 'Building native iPhone apps with Swift — from architecture to App Store.',
    icon: 'Smartphone',
    interactive: false,
  },
  {
    namespace: 'ux.design',
    title: 'UI / UX Design',
    description: 'Designing interfaces in Figma before writing a single line of code.',
    icon: 'Layers',
    interactive: false,
  },
];

export const certificates = [
  'Certified Lean Six Sigma White Belt / Yellow Belt',
  'Complete Agile Scrum Master Certification Training',
];

export const travel = {
  visited: [
    { lat: 23.5880, lng: 58.3829, label: 'Muscat, Oman' },
    { lat: 17.0151, lng: 54.0924, label: 'Salalah, Oman' },
    { lat: 22.9336, lng: 57.5300, label: 'Nizwa, Oman' },
  ],
};

export const theme = {
  default: 'amber',
  options: ['amber', 'violet', 'teal', 'rose'] as const,
};

export type ThemeName = (typeof theme.options)[number];
