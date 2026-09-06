'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, MapPin, ChevronRight, Download } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { profile } from '@/content.config';
import { useLanguage } from '@/components/LanguageProvider';
import { useEffect, useRef, useState } from 'react';

/* ── Floating keywords ─────────────────────────────────────── */
const BG_KEYWORDS: { text: string; type: 'keyword' | 'string' | 'fn' | 'type' | 'op' | 'comment' }[] = [
  { text: 'const',      type: 'keyword' },
  { text: 'async',      type: 'keyword' },
  { text: 'await',      type: 'keyword' },
  { text: 'export',     type: 'keyword' },
  { text: 'import',     type: 'keyword' },
  { text: 'class',      type: 'keyword' },
  { text: 'new',        type: 'keyword' },
  { text: 'void',       type: 'keyword' },
  { text: 'null',       type: 'keyword' },
  { text: '</>',        type: 'type' },
  { text: '.tsx',       type: 'type' },
  { text: '.ts',        type: 'type' },
  { text: 'ArcGIS',     type: 'type' },
  { text: 'Swift',      type: 'type' },
  { text: "'rawan'",    type: 'string' },
  { text: "'oman'",     type: 'string' },
  { text: "'dev'",      type: 'string' },
  { text: 'git push',   type: 'string' },
  { text: 'SELECT',     type: 'string' },
  { text: 'fn()',       type: 'fn' },
  { text: 'map()',      type: 'fn' },
  { text: 'build()',    type: 'fn' },
  { text: 'learn()',    type: 'fn' },
  { text: 'design()',   type: 'fn' },
  { text: '=>',         type: 'op' },
  { text: '&&',         type: 'op' },
  { text: '||',         type: 'op' },
  { text: 'if()',       type: 'op' },
  { text: '// TODO',    type: 'comment' },
  { text: '// ...init', type: 'comment' },
  { text: 'git',        type: 'comment' },
  { text: 'npm',        type: 'comment' },
];

const TYPE_COLORS: Record<string, { color: string; glow: string }> = {
  keyword: { color: '#FF2A6D', glow: '#FF2A6D' },
  string:  { color: '#05D9E8', glow: '#05D9E8' },
  fn:      { color: '#FFC000', glow: '#FFC000' },
  type:    { color: '#01FFC3', glow: '#01FFC3' },
  op:      { color: '#B026FF', glow: '#B026FF' },
  comment: { color: '#7E8C9A', glow: '#7E8C9A' },
};

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function FloatingKeywords() {
  return (
    <div className="bg-keywords-wrap" aria-hidden="true">
      {BG_KEYWORDS.map((kw, i) => {
        const { color, glow } = TYPE_COLORS[kw.type];
        const x        = seededRandom(i * 7 + 1) * 88;
        const y        = seededRandom(i * 7 + 2) * 85;
        const size     = 11 + seededRandom(i * 7 + 3) * 10;
        const duration = 6  + seededRandom(i * 7 + 4) * 14;
        const delay    = seededRandom(i * 7 + 5) * 12;
        const driftX   = (seededRandom(i * 7 + 6) - 0.5) * 30;
        const driftY   = (seededRandom(i * 7 + 7) - 0.5) * 24;
        return (
          <span
            key={i}
            className="bg-keyword"
            style={{
              left:    `${x}%`,
              top:     `${y}%`,
              fontSize: `${size}px`,
              animationDuration:  `${duration}s`,
              animationDelay:     `-${delay}s`,
              color,
              textShadow: `0 0 12px ${glow}66`,
              ['--dx' as any]: `${driftX}px`,
              ['--dy' as any]: `${driftY}px`,
            }}
          >
            {kw.text}
          </span>
        );
      })}
    </div>
  );
}

/* ── Typewriter role ───────────────────────────────────────── */
const ROLES: Record<'en' | 'ar', string[]> = {
  en: ['Software Developer', 'GIS Programmer', 'iOS Developer', 'Full-Stack Engineer'],
  ar: ['مطوّرة برمجيات', 'مبرمجة GIS', 'مطوّرة iOS', 'مهندسة فُل ستاك'],
};

function TypewriterRole({ lang }: { lang: 'en' | 'ar' }) {
  const roles = ROLES[lang];
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIdx % roles.length];
    if (!deleting) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setDeleting(false);
        setRoleIdx((r) => (r + 1) % roles.length);
      }
    }
    return () => { if (timeoutRef.current !== null) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIdx, roles]);

  return (
    <div className="hero-role-line">
      <span className="hero-role-prefix">{'<'}</span>
      <span className="hero-role-typed">{displayed}</span>
      <span className="hero-role-suffix">{' />'}</span>
    </div>
  );
}

/* ── Language activity bars ────────────────────────────────── */
const LANGS = [
  { label: 'TypeScript', pct: 85, color: '#05D9E8' },
  { label: 'Python',     pct: 75, color: '#FFC000' },
  { label: 'Swift',      pct: 65, color: '#FF2A6D' },
  { label: 'SQL / GIS',  pct: 80, color: '#01FFC3' },
  { label: 'JavaScript', pct: 78, color: '#B026FF' },
];

/* ── Main component ────────────────────────────────────────── */
export default function Hero({ sectionRef }: { sectionRef?: React.RefObject<HTMLElement> }) {
  const { t, lang } = useLanguage();

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Hero — index.tsx"
      className="hero-layout"
    >
      <FloatingKeywords />

      {/* ── LEFT COLUMN ── */}
      <div className="hero-left">
        {/* File comment */}
        <motion.p
          className="section-file-comment"
          style={{ marginBottom: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {'// index.tsx — entry point'}
        </motion.p>

        {/* Giant gradient name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--syn-comment)', marginBottom: 6 }}>
            {"const developer = {"}
          </p>
          <h1 className="hero-name-gradient">{profile.name}</h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TypewriterRole key={lang} lang={lang} />
        </motion.div>

        {/* Status chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
        >
          <span className="tag-pill"><MapPin size={11} /> {profile.basedIn}</span>
          <span className="available-pill">
            <span className="available-dot" />
            <span>{t('available')}</span>
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7, maxWidth: 460 }}
        >
          {t('hero_bio')}
        </motion.p>

        {/* Stat counters */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
        >
          {[
            { num: '200+', label: 'Commits' },
            { num: '6',    label: 'Projects' },
            { num: '5',    label: 'Languages' },
            { num: '2',    label: 'Internships' },
          ].map(({ num, label }) => (
            <div key={label} className="hero-stat">
              <span className="hero-stat-num">{num}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
        >
          <a
            href="#contact"
            className="btn-primary"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            {t('hero_cta_contact')} <ChevronRight size={14} />
          </a>
          <a
            href="#stack"
            className="btn-outline"
            onClick={e => { e.preventDefault(); document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            {t('hero_cta_stack')}
          </a>
        </motion.div>
      </div>

      {/* ── RIGHT COLUMN — Profile Card ── */}
      <motion.aside
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hero-right"
      >
        {/* Live badge */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          fontFamily: 'JetBrains Mono, monospace',
          color: 'var(--text-muted)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
          {t('hero_live_badge')}
        </div>

        {/* Avatar with scanline */}
        <div className="avatar-wrap">
          <div className="avatar-ring">
            <Image
              src="/avatar.jpg"
              alt={profile.name}
              width={140}
              height={140}
              priority
            />
          </div>
          <div className="avatar-status-dot" title="Available for work" />
        </div>

        {/* Name + role tag */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 17, marginBottom: 6 }}>
            {profile.name}
          </p>
          <p style={{ color: 'var(--syn-type)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
            {'<'}<span style={{ color: 'var(--accent)' }}>SoftwareDeveloper</span>{' />'}
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: 'var(--border)' }} />

        {/* Language activity bars */}
        <div className="lang-activity">
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--syn-comment)', marginBottom: 4 }}>
            {'// lang.activity()'}
          </p>
          {LANGS.map(({ label, pct, color }, idx) => (
            <div key={label} className="lang-activity-item">
              <span className="lang-activity-label">{label}</span>
              <div className="lang-activity-track">
                <div
                  className="lang-activity-bar"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${color}99, ${color})`,
                    animationDelay: `${idx * 0.12}s`,
                  }}
                />
              </div>
              <span className="lang-activity-pct">{pct}%</span>
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Contact buttons */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a
            href={`mailto:${profile.email}`}
            className="btn-primary"
            style={{ justifyContent: 'center', fontSize: 12 }}
          >
            <Mail size={14} />
            {profile.email}
          </a>
          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={14} />
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              download
              className="btn-outline"
              style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
              aria-label="Download CV"
            >
              <Download size={14} />
              CV
            </a>
          </div>
        </div>
      </motion.aside>
    </section>
  );
}

