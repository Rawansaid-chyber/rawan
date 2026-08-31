'use client';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { profile } from '@/content.config';
import { useLanguage } from '@/components/LanguageProvider';

export default function Resume({ sectionRef }: { sectionRef?: React.RefObject<HTMLElement> }) {
  const { t } = useLanguage();
  return (
    <section id="resume" ref={sectionRef} aria-label="Resume" className="section" style={{ textAlign: 'center', maxWidth: 600 }}>
      <p className="section-file-comment" style={{ textAlign: 'left' }}>
        {t('resume_file')}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-h2" style={{ marginBottom: 12 }}>
          <span className="glow-accent">{t('resume_title')}</span>
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 36, lineHeight: 1.6 }}>
          {t('resume_preview')}
        </p>

        {/* PDF preview frame */}
        <div style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '28px 24px',
          marginBottom: 28,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 13,
          color: 'var(--text-muted)',
          textAlign: 'left',
        }}>
          <div style={{ color: 'var(--syn-comment)', marginBottom: 8 }}>{'// Rawan_Said_Alsiyabi_CV.pdf'}</div>
          <div><span style={{ color: 'var(--syn-keyword)' }}>Name:     </span>{profile.name}</div>
          <div><span style={{ color: 'var(--syn-keyword)' }}>Role:     </span>{profile.role}</div>
          <div><span style={{ color: 'var(--syn-keyword)' }}>Location: </span>{profile.basedIn}</div>
          <div><span style={{ color: 'var(--syn-keyword)' }}>Email:    </span>{profile.email}</div>
          <div><span style={{ color: 'var(--syn-keyword)' }}>Status:   </span><span style={{ color: '#3fb950' }}>{t('available')}</span></div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/resume.pdf" download className="btn-primary" style={{ fontSize: 14, padding: '12px 24px' }}>
            <Download size={16} />
            {t('resume_download')}
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: 14, padding: '12px 24px' }}>
            <ExternalLink size={16} />
            {t('resume_open_tab')}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
