'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Code2, Globe, Smartphone, Trophy, GitBranch } from 'lucide-react';
import { about, timeline } from '@/content.config';
import { useLanguage } from '@/components/LanguageProvider';
import { translations } from '@/i18n/translations';

const ICON_MAP: Record<string, React.ReactNode> = {
  MapPin:    <MapPin size={11} />,
  Code2:     <Code2 size={11} />,
  Globe:     <Globe size={11} />,
  Smartphone:<Smartphone size={11} />,
  Trophy:    <Trophy size={11} />,
};

// Deterministic short hashes for timeline items
const HASHES = ['a3f9b2', 'e87d14', 'c21f05', 'b6a831', '9d3ec7', 'f104ab'];

function SkillBar({ label, percent, delay }: { label: string; percent: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="skill-bar-wrap">
      <div className="skill-bar-header">
        <span>{label}</span>
        <span style={{ color: 'var(--accent)' }}>{percent}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function About({ sectionRef }: { sectionRef?: React.RefObject<HTMLElement> }) {
  const { t, lang } = useLanguage();
  const skills = translations[lang].about_skills as Record<string, string>;
  const tagLabels = translations[lang].about_tags as Record<string, string>;
  const photoTitles: Record<string, string> = {
    '// Ministry of Transport':      `// ${t('photo_ministry')}`,
    '// GIS Workstation':            `// ${t('photo_gis')}`,
    '// Oct–Nov 2023 Internship':    `// ${t('photo_intern')}`,
    '// MOTCIT Event':               `// ${t('photo_motcit')}`,
  };
  const ref = useRef<HTMLElement>(null);
  const combinedRef = (sectionRef ?? ref) as React.RefObject<HTMLElement>;

  return (
    <section id="about" ref={combinedRef} aria-label="About" className="section">
      <p className="section-file-comment">{t('about_file')}</p>

      <div className="about-layout">
        {/* Left: README.md card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-h2" style={{ marginBottom: 24 }}>
            <span className="glow-accent">{t('about_heading_1')}</span><br />
            {t('about_heading_2')}
          </h2>

          {/* README.md card */}
          <div className="readme-card">
            <div className="readme-card-bar">
              <span className="readme-card-bar-icon">📄</span>
              <span className="readme-card-bar-title">README.md</span>
              <span className="readme-card-action">Raw</span>
              <span className="readme-card-action">Blame</span>
              <span className="readme-card-action">Copy</span>
            </div>
            <div className="readme-card-body">
              {[t('about_bio_1'), t('about_bio_2')].map((p, i) => (
                <p key={i} style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.75, marginBottom: 12 }}>
                  {p}
                </p>
              ))}

              {/* Tag pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                {about.tags.map(tag => (
                  <span key={tag.label} className="tag-pill">
                    {ICON_MAP[tag.icon]}
                    {tagLabels[tag.label] ?? tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: skill bars */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--syn-comment)', marginBottom: 16 }}>
            {'// proficiency.map()'}
          </p>
          {about.skills.map((skill, i) => (
            <SkillBar key={skill.label} label={skills[skill.label] ?? skill.label} percent={skill.percent} delay={i * 0.08} />
          ))}
        </motion.div>
      </div>

      {/* Career timeline — git log style */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ marginTop: 64 }}
      >
        {/* git log header */}
        <div className="git-log-header">
          <GitBranch size={13} />
          <span style={{ color: 'var(--accent)' }}>git</span>
          <span>log --oneline --graph</span>
          <span style={{ color: 'var(--syn-string)' }}>origin/main</span>
        </div>

        <div className="timeline">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={`timeline-dot ${item.current ? 'current' : ''}`} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
                  <span className="timeline-hash">{HASHES[i] ?? 'f00000'} ·</span>
                  <span className="timeline-role">{item.role}</span>
                  {item.current && <span className="timeline-head-tag">HEAD → main</span>}
                </div>
                <span className="timeline-date">{item.start} — {item.end}</span>
              </div>
              <p className="timeline-company">{item.company}</p>
              <ul className="timeline-bullets">
                {item.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Photo gallery strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ marginTop: 48 }}
      >
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
          {'// rawan.photos()'}
        </p>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8 }}>
          {[
            { src: '/images/misc__summary__060.jpg',                                  alt: 'Rawan at Ministry of Transport event',  title: '// Ministry of Transport' },
            { src: '/images/team__ministry_housing_urban_planning__018.jpg',           alt: 'GIS workstation',                       title: '// GIS Workstation' },
            { src: '/images/team__0ct_-16_nov_2023_ministry_transport__045.jpg',       alt: 'Ministry internship Oct 2023',           title: '// Oct–Nov 2023 Internship' },
            { src: '/images/team__ministry_transport_communication_in__053.jpg',       alt: 'MOTCIT team event',                      title: '// MOTCIT Event' },
          ].map(({ src, alt, title }) => (
            <div key={src} className="photo-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} />
              <div className="photo-card-overlay">
                <span className="photo-card-overlay-text">{photoTitles[title] ?? title}</span>
              </div>
              <div className="photo-card-label">{photoTitles[title] ?? title}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

