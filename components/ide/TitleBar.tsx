'use client';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { profile } from '@/content.config';
import { Download } from 'lucide-react';

const THEME_COLORS: Record<string, string> = {
  amber:  '#f5a623',
  violet: '#8957e5',
  teal:   '#2dd4bf',
  rose:   '#f43f5e',
};

export default function TitleBar() {
  const { theme, setTheme }   = useTheme();
  const { lang, setLang, t }  = useLanguage();

  return (
    <div className="ide-title-bar">
      {/* macOS traffic lights */}
      <div className="traffic-lights">
        <div className="traffic-light tl-red"    title="Close" />
        <div className="traffic-light tl-yellow" title="Minimise" />
        <div className="traffic-light tl-green"  title="Fullscreen" />
      </div>

      {/* Breadcrumb path */}
      <div className="title-path">
        <span style={{ color: 'var(--syn-type)' }}>{profile.handle}</span>
        <span style={{ color: 'var(--text-dim)' }}>@portfolio</span>
        <span style={{ color: 'var(--text-muted)' }}>:~/portfolio — index.tsx</span>
      </div>

      {/* Right side: theme dots + lang toggle + run button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

        {/* Theme palette dots */}
        <div className="theme-dots" aria-label="Theme switcher">
          {(Object.entries(THEME_COLORS) as [string, string][]).map(([name, color]) => (
            <button
              key={name}
              className={`theme-dot ${theme === name ? 'active' : ''}`}
              style={{ background: color }}
              onClick={() => setTheme(name as any)}
              aria-label={`${name} theme`}
              title={name}
            />
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 14, background: 'var(--border)', opacity: 0.6 }} />

        {/* Language toggle — EN / AR */}
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          aria-label="Toggle language"
          title={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '4px 10px',
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
            cursor: 'pointer',
            fontSize: 11,
            fontFamily: lang === 'ar' ? 'Cairo, Inter, sans-serif' : 'JetBrains Mono, monospace',
            fontWeight: 600,
            color: 'var(--accent)',
            transition: 'all 0.18s ease',
            letterSpacing: lang === 'en' ? '0.08em' : 0,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-glow)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-soft)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-secondary)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
          }}
        >
          {/* Globe icon as SVG */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          {t('lang_toggle')}
        </button>

        {/* Run / Download CV */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ padding: '5px 12px', fontSize: '11px' }}
          aria-label="Download CV"
        >
          <Download size={12} />
          Run ▶
        </a>
      </div>
    </div>
  );
}
