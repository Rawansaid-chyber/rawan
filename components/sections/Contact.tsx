'use client';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { profile } from '@/content.config';
import { useLanguage } from '@/components/LanguageProvider';

const TRAFFIC_LIGHTS = [
  { color: '#FF5F57' },
  { color: '#FEBC2E' },
  { color: '#28C840' },
];

export default function Contact({ sectionRef }: { sectionRef?: React.RefObject<HTMLElement> }) {
  const { t } = useLanguage();

  const LINKS = [
    {
      icon: <Mail size={20} />,
      label: t('contact_email'),
      value: profile.email,
      href: `mailto:${profile.email}`,
      comment: '// primary — fastest response',
    },
    {
      icon: <FaLinkedin size={20} />,
      label: t('contact_linkedin'),
      value: 'rawan-al-siyabi',
      href: profile.linkedin,
      comment: '// open to connect',
    },
    {
      icon: <Phone size={20} />,
      label: t('contact_phone'),
      value: profile.phone,
      href: `tel:${profile.phone}`,
      comment: '// by appointment',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} aria-label="Contact" className="section" style={{ maxWidth: 640 }}>
      <p className="section-file-comment">{t('contact_file')}</p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-h2" style={{ marginBottom: 12 }}>
          {t('contact_heading')} <span className="glow-accent">{t('contact_accent')}</span>
        </h2>

        {/* Response time badge */}
        <div className="contact-response-badge" style={{ marginBottom: 32 }}>
          <span className="badge-key">avg_response</span>
          <span style={{ color: 'var(--text-muted)' }}>:</span>
          <span className="badge-val">"&lt; 24 hours"</span>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <span style={{ color: '#3fb950' }}>● open to opportunities</span>
        </div>

        {/* Terminal chrome window */}
        <div className="contact-terminal">
          {/* Traffic light chrome bar */}
          <div className="contact-terminal-chrome">
            <div style={{ display: 'flex', gap: 6 }}>
              {TRAFFIC_LIGHTS.map(({ color }) => (
                <div key={color} style={{ width: 12, height: 12, borderRadius: '50%', background: color }} />
              ))}
            </div>
            <span className="contact-terminal-chrome-title">contact.ts — rawan@dev</span>
          </div>

          {/* Contact links inside terminal */}
          <div className="contact-terminal-body">
            {/* Prompt header */}
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
              <span style={{ color: 'var(--syn-keyword)' }}>await </span>
              <span style={{ color: 'var(--syn-fn)' }}>connect</span>
              <span style={{ color: 'var(--text-muted)' }}>({'{ preferred: '}</span>
              <span style={{ color: 'var(--syn-string)' }}>'email'</span>
              <span style={{ color: 'var(--text-muted)' }}>{' })'}</span>
            </div>

            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 18px',
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-soft)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px var(--accent-glow)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ color: 'var(--accent)', flexShrink: 0 }}>{link.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: 'var(--syn-comment)', marginBottom: 2 }}>
                    {link.comment}
                  </p>
                  <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)', marginBottom: 1 }}>
                    {link.label}
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {link.value}
                  </p>
                </div>
                <span style={{ fontSize: 18, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
