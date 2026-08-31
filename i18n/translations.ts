export type Lang = 'en' | 'ar';

export const translations = {
  en: {
    // ── Global ──────────────────────────────────────────────────
    available:        'Available for work',
    fresh_graduate:   'Fresh Graduate',
    lang_toggle:      'عربي',

    // ── Hero ────────────────────────────────────────────────────
    hero_role:        'Software Developer & GIS Programmer',
    hero_bio:         'CS graduate building full-stack apps and GIS systems that work in the real world — not just in demos.',
    hero_cta_contact: '$ run contact.ts',
    hero_cta_stack:   'view stack {}',
    hero_live_badge:  'preview.tsx — live',
    hero_quick_ref:   '// quick.ref',

    // ── About ───────────────────────────────────────────────────
    about_file:       '/** about.ts — who\'s running this process */',
    about_heading_1:  'Building software that',
    about_heading_2:  'maps the real world.',
    about_bio_1:      'I hold a BSc in Computer Science from Middle East College (in partnership with Coventry University, UK). My graduation project — a full-stack application for Mazoon Dairy Company — earned a 90% grade and gave me hands-on experience delivering production software against real business requirements.',
    about_bio_2:      'Since graduating I have worked across government digital-transformation programs, satellite projects, and GIS infrastructure at three Omani ministries. I write across the stack — JavaScript, PHP and SQL on the web side; Swift for iOS; and Python when scripting spatial data in ArcGIS. I care about software that is reliable in the real world, not just in a demo.',
    about_bio_3:      'When I\'m not writing code, I\'m mapping something.',
    about_proficiency: '// proficiency.map()',
    about_skills: {
      'JavaScript / Web Dev': 'JavaScript / Web Dev',
      'ArcGIS Pro / GIS':     'ArcGIS Pro / GIS',
      'SQL / Databases':      'SQL / Databases',
      'Figma / UI-UX':        'Figma / UI-UX',
      'PHP / Backend':        'PHP / Backend',
      'Swift / iOS':          'Swift / iOS',
      'Mendix (Low-code)':    'Mendix (Low-code)',
      'Python (Spatial)':     'Python (Spatial)',
    },
    about_tags: {
      'Muscat, OM':        'Muscat, OM',
      'Full-Stack Dev':    'Full-Stack Dev',
      'GIS Specialist':    'GIS Specialist',
      'iOS Developer':     'iOS Developer',
      'Hackathon Winner':  'Hackathon Winner',
    },
    about_timeline_label: '// career.timeline()',
    about_photos_label:   '// rawan.photos()',
    photo_ministry:       'Ministry of Transport',
    photo_gis:            'GIS Workstation',
    photo_intern:         'Oct–Nov 2023 Internship',
    photo_motcit:         'MOTCIT Event',

    // ── Stack ───────────────────────────────────────────────────
    stack_file:       '// stack.config.ts — what this machine runs on',
    stack_heading:    'Tech Stack',
    stack_frontend:   'frontend',
    stack_backend:    'backend',
    stack_gis:        'gis',
    stack_tooling:    'tooling',

    // ── Portfolio ───────────────────────────────────────────────
    portfolio_file:   '// portfolio.ts — shipped work',
    portfolio_heading:'Selected',
    portfolio_accent: 'Projects',

    // ── Offline ─────────────────────────────────────────────────
    offline_file:     '// offline.notes.ts — process running outside of work hours',
    offline_heading:  'mode',
    offline_accent:   'Off-hours',
    offline_gis_label:'GIS Coordinate Converter',
    offline_input_ph: 'Enter latitude (e.g. 23.5880)',
    offline_input2_ph:'Enter longitude (e.g. 58.3829)',
    offline_convert:  'Convert',
    offline_result:   'DMS Result',

    // ── World ───────────────────────────────────────────────────
    world_file:       '$ render world.ts',
    world_heading:    'Places I’ve',
    world_accent:     'mapped',
    world_locations:  'locations',
    world_oman_based: 'Oman-based',

    // ── Resume ──────────────────────────────────────────────────
    resume_file:      '$ cat Rawan_Said_Alsiyabi_CV.pdf',
    resume_title:     'resume',
    resume_download:  'Download CV',
    resume_open_tab:  'Open in new tab',
    resume_preview:   'Full CV with education, experience, projects, and certifications.',

    // ── Contact ─────────────────────────────────────────────────
    contact_file:     '$ run contact.ts',
    contact_heading:  'Let’s',
    contact_accent:   'connect',
    contact_subtitle: 'Available for full-time roles, freelance GIS work, or just a good conversation about maps.',
    contact_email:    'Email',
    contact_linkedin: 'LinkedIn',
    contact_phone:    'Phone',
    contact_location: 'Muscat, Oman',
    contact_location_label: 'Location',
    contact_note:     '// Response time: usually within 24h',
  },

  ar: {
    // ── Global ──────────────────────────────────────────────────
    available:        'متاحة للعمل',
    fresh_graduate:   'خريجة حديثة',
    lang_toggle:      'EN',

    // ── Hero ────────────────────────────────────────────────────
    hero_role:        'مطوّرة برمجيات ومبرمجة GIS',
    hero_bio:         'خريجة علوم حاسوب، أبني تطبيقات متكاملة وأنظمة GIS تعمل في الواقع — لا في العروض التجريبية فقط.',
    hero_cta_contact: '$ run contact.ts',
    hero_cta_stack:   'عرض المهارات {}',
    hero_live_badge:  'preview.tsx — مباشر',
    hero_quick_ref:   '// مرجع سريع',

    // ── About ───────────────────────────────────────────────────
    about_file:       '/** about.ts — من تكون هذه المطوّرة */',
    about_heading_1:  'أبني برمجيات',
    about_heading_2:  'ترسم العالم الحقيقي.',
    about_bio_1:      'أحمل درجة البكالوريوس في علوم الحاسوب من كلية الشرق الأوسط (بالشراكة مع جامعة كوفنتري، المملكة المتحدة). مشروع تخرجي — تطبيق متكامل لشركة مزون للألبان — حصل على تقدير 90%، ومنحني خبرة عملية في تسليم برمجيات إنتاجية تلبي متطلبات عمل حقيقية.',
    about_bio_2:      'منذ تخرجي عملت في برامج التحول الرقمي الحكومي، ومشاريع الأقمار الصناعية، والبنية التحتية لنظم المعلومات الجغرافية في ثلاث وزارات عُمانية. أكتب عبر كامل الحزمة التقنية — JavaScript وPHP وSQL في جانب الويب، وSwift لتطبيقات iOS، وPython عند برمجة البيانات المكانية في ArcGIS. يهمني أن تكون البرمجيات موثوقة في الواقع الفعلي، لا في العروض التجريبية فقط.',
    about_bio_3:      'حين لا أكتب كوداً، أرسم خرائط.',
    about_proficiency: '// خريطة.المهارات()',
    about_skills: {
      'JavaScript / Web Dev': 'JavaScript / تطوير الويب',
      'ArcGIS Pro / GIS':     'ArcGIS Pro / نظم المعلومات الجغرافية',
      'SQL / Databases':      'SQL / قواعد البيانات',
      'Figma / UI-UX':        'Figma / تصميم واجهات',
      'PHP / Backend':        'PHP / الخلفية',
      'Swift / iOS':          'Swift / iOS',
      'Mendix (Low-code)':    'Mendix (منخفض الشيفرة)',
      'Python (Spatial)':     'Python (تحليل مكاني)',
    },
    about_tags: {
      'Muscat, OM':        'مسقط، عُمان',
      'Full-Stack Dev':    'مطوّرة متكاملة',
      'GIS Specialist':    'مختصة GIS',
      'iOS Developer':     'مطوّرة iOS',
      'Hackathon Winner':  'فائزة بهاكاثون',
    },
    about_timeline_label: '// المسيرة.المهنية()',
    about_photos_label:   '// صور.روان()',
    photo_ministry:       'وزارة النقل',
    photo_gis:            'محطة عمل GIS',
    photo_intern:         'تدريب أكتوبر–نوفمبر 2023',
    photo_motcit:         'فعالية وزارة النقل',

    // ── Stack ───────────────────────────────────────────────────
    stack_file:       '// stack.config.ts — ما تعمل به هذه الآلة',
    stack_heading:    'الأدوات التقنية',
    stack_frontend:   'الواجهة الأمامية',
    stack_backend:    'الخلفية',
    stack_gis:        'نظم معلومات جغرافية',
    stack_tooling:    'أدوات',

    // ── Portfolio ───────────────────────────────────────────────
    portfolio_file:   '// portfolio.ts — أعمال منجزة',
    portfolio_heading:'مشاريع',
    portfolio_accent: 'مختارة',

    // ── Offline ─────────────────────────────────────────────────
    offline_file:     '// offline.notes.ts — عملية تعمل خارج ساعات الدوام',
    offline_heading:  'وضع',
    offline_accent:   'خارج الدوام',
    offline_gis_label:'محوّل إحداثيات GIS',
    offline_input_ph: 'أدخل خط العرض (مثال: 23.5880)',
    offline_input2_ph:'أدخل خط الطول (مثال: 58.3829)',
    offline_convert:  'تحويل',
    offline_result:   'نتيجة DMS',

    // ── World ───────────────────────────────────────────────────
    world_file:       '$ render world.ts',
    world_heading:    'أماكن',
    world_accent:     'رسمتُها',
    world_locations:  'مواقع',
    world_oman_based: 'مقرّها عُمان',

    // ── Resume ──────────────────────────────────────────────────
    resume_file:      '$ cat Rawan_Said_Alsiyabi_CV.pdf',
    resume_title:     'السيرة الذاتية',
    resume_download:  'تحميل السيرة الذاتية',
    resume_open_tab:  'فتح في تبويب جديد',
    resume_preview:   'السيرة الذاتية الكاملة تتضمن التعليم والخبرات والمشاريع والشهادات.',

    // ── Contact ─────────────────────────────────────────────────
    contact_file:     '$ run contact.ts',
    contact_heading:  'لنبدأ',
    contact_accent:   'التواصل',
    contact_subtitle: 'متاحة للوظائف الكاملة، وأعمال GIS الحرة، أو حتى محادثة جيدة عن الخرائط.',
    contact_email:    'البريد الإلكتروني',
    contact_linkedin: 'لينكدإن',
    contact_phone:    'الهاتف',
    contact_location: 'مسقط، عُمان',
    contact_location_label: 'الموقع',
    contact_note:     '// وقت الرد: عادةً خلال 24 ساعة',
  },
} as const;

export type TranslationKeys = keyof typeof translations.en;
