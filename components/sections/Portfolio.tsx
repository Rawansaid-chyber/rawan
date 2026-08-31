'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Smartphone, Trophy, MapPin, Globe } from 'lucide-react';
import { projects } from '@/content.config';
import { useLanguage } from '@/components/LanguageProvider';

const ICON_MAP: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={18} />,
  Trophy:     <Trophy size={18} />,
  MapPin:     <MapPin size={18} />,
  Globe:      <Globe size={18} />,
};

// Per-project accent colors for the top border
const PROJECT_COLORS = [
  '#FF2A6D', // pink
  '#05D9E8', // cyan
  '#FFC000', // yellow
  '#01FFC3', // teal
  '#B026FF', // purple
  '#FF6B35', // orange
];

export default function Portfolio({ sectionRef }: { sectionRef?: React.RefObject<HTMLElement> }) {
  const { t } = useLanguage();
  return (
    <section id="portfolio" ref={sectionRef} aria-label="Portfolio" className="section">
      <p className="section-file-comment">{t('portfolio_file')}</p>
      <h2 className="section-h2" style={{ marginBottom: 40 }}>
        {t('portfolio_heading')} <span className="glow-accent">{t('portfolio_accent')}</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: 24 }}>
        {projects.map((project, i) => {
          const accentColor = PROJECT_COLORS[i % PROJECT_COLORS.length];
          return (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ padding: 0, overflow: 'hidden' }}
            >
              {/* Colored top accent line */}
              <div
                className="project-card-top"
                style={{ background: `linear-gradient(90deg, ${accentColor}cc, ${accentColor}22)` }}
              />

              {/* Project image with hover overlay */}
              {project.image && (
                <div className="project-img-wrap" style={{ width: '100%', height: 180, borderBottom: '1px solid var(--border)' }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="project-img-overlay">
                    {'// view project'}
                  </div>
                  {/* Badge overlay */}
                  {project.badge && (
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      padding: '4px 10px',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid var(--accent-soft)',
                      borderRadius: 999,
                      fontSize: 11,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      zIndex: 2,
                    }}>
                      {project.badge}
                    </div>
                  )}
                </div>
              )}

              {/* Card body */}
              <div style={{ padding: 20 }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ color: accentColor, background: `${accentColor}22`, padding: '7px', borderRadius: 8 }}>
                    {ICON_MAP[project.icon]}
                  </div>
                  {!project.badge && (
                    <span style={{
                      padding: '3px 8px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      fontSize: 10,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--text-muted)',
                    }}>
                      {project.id}
                    </span>
                  )}
                </div>

                <p className="project-namespace">{'// '}{project.namespace}</p>
                <h3 className="project-title" style={{ fontSize: 16, marginBottom: 6 }}>{project.title}</h3>
                <p className="project-desc" style={{ fontSize: 12, marginBottom: 12 }}>{project.description}</p>

                {/* Color-coded tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {project.tags.map((tag, ti) => {
                    // Cycle tag tints
                    const tints = ['#05D9E8', '#FF2A6D', '#FFC000', '#01FFC3', '#B026FF'];
                    const tint = tints[ti % tints.length];
                    return (
                      <span
                        key={tag}
                        style={{
                          padding: '2px 7px',
                          background: `${tint}18`,
                          border: `1px solid ${tint}44`,
                          borderRadius: 4,
                          fontSize: 10,
                          fontFamily: 'JetBrains Mono, monospace',
                          color: tint,
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
