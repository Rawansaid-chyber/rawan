'use client';
import { motion } from 'framer-motion';
import { travel } from '@/content.config';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/components/LanguageProvider';

// Load cobe globe client-side only (needs browser canvas/WebGL)
const GlobeCanvas = dynamic(() => import('./GlobeCanvas'), { ssr: false });

export default function World({ sectionRef }: { sectionRef?: React.RefObject<HTMLElement> }) {
  const { t } = useLanguage();
  return (
    <section id="world" ref={sectionRef} aria-label="World globe" className="section">
      <p className="section-file-comment">{t('world_file')}</p>
      <h2 className="section-h2" style={{ marginBottom: 8 }}>
        {t('world_heading')} <span className="glow-accent">{t('world_accent')}</span>
      </h2>
      <p style={{
        color: 'var(--text-muted)', fontSize: 13, marginBottom: 32,
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        <span style={{ color: 'var(--accent)' }}>●</span>
        {' '}amber pins = places worked / visited{' '}
        <span style={{ color: 'var(--text-dim)' }}>·</span>
        {' '}drag to rotate
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <GlobeCanvas visited={travel.visited} />
      </motion.div>

      <p style={{
        marginTop: 14,
        fontSize: 12,
        fontFamily: 'JetBrains Mono, monospace',
        color: 'var(--text-muted)',
        textAlign: 'center',
      }}>
        {travel.visited.length} {t('world_locations')} &nbsp;·&nbsp; {t('world_oman_based')}
      </p>
    </section>
  );
}
