'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { stack, stackIcons } from '@/content.config';
import * as Si from 'react-icons/si';

function StackIcon({ slug }: { slug: string }) {
  const meta = stackIcons[slug];
  if (!meta) return null;
  const IconComp = meta.siSlug ? (Si as any)[meta.siSlug] : null;

  return (
    <motion.div
      className="stack-icon-card"
      whileHover={{ scale: 1.06 }}
      title={meta.label}
      style={{ '--icon-color': meta.color } as any}
    >
      {IconComp ? (
        <IconComp size={28} style={{ color: meta.color }} aria-hidden="true" />
      ) : (
        <span style={{ fontSize: 24, color: meta.color }}>{meta.label[0]}</span>
      )}
      <span>{meta.label}</span>
    </motion.div>
  );
}

const TERMINAL_LINES = [
  { type: 'prompt', text: '$ npm run build' },
  { type: 'ok',     text: '✓ Compiled successfully in 2.1s' },
  { type: 'info',   text: '  Pages: index.tsx, about.ts, portfolio.ts ...' },
  { type: 'prompt', text: '$ arcgis-pro --check-layers salalah.gdb' },
  { type: 'ok',     text: '✓ 42 layers validated — 0 projection issues' },
  { type: 'prompt', text: '$ python geo_connect.py --platform geooman' },
  { type: 'ok',     text: '✓ Connected to Geo Oman Platform (v2.4.1)' },
  { type: 'info',   text: '  Remote sensing index: 3 paths processed' },
  { type: 'warn',   text: 'coffee.status → brewing ☕' },
];

function FakeTerminal() {
  const [visible, setVisible] = useState(0);
  const [cycle, setCycle] = useState(0); // bump to restart

  useEffect(() => {
    if (visible < TERMINAL_LINES.length) {
      const t = setTimeout(() => setVisible(v => v + 1), 320);
      return () => clearTimeout(t);
    } else {
      // pause 3s then restart
      const t = setTimeout(() => {
        setVisible(0);
        setCycle(c => c + 1);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [visible, cycle]);

  return (
    <div className="terminal-block">
      {TERMINAL_LINES.slice(0, visible).map((line, i) => (
        <div key={`${cycle}-${i}`}>
          {line.type === 'prompt' && <><span className="term-prompt">❯ </span><span className="term-cmd">{line.text.slice(2)}</span></>}
          {line.type === 'ok'     && <span className="term-ok">{line.text}</span>}
          {line.type === 'info'   && <span className="term-info">{line.text}</span>}
          {line.type === 'warn'   && <span className="term-warn">{line.text}</span>}
        </div>
      ))}
      {visible < TERMINAL_LINES.length && <span style={{ color: 'var(--accent)' }}>▌</span>}
    </div>
  );
}

const GROUPS = [
  { label: 'frontend', title: 'Frontend',      exportName: 'frontend' },
  { label: 'backend',  title: 'Backend',        exportName: 'backend'  },
  { label: 'gis',      title: 'GIS / Spatial',  exportName: 'gis'      },
  { label: 'tooling',  title: 'Tooling',         exportName: 'tooling'  },
];

export default function Stack({ sectionRef }: { sectionRef?: React.RefObject<HTMLElement> }) {
  return (
    <section id="stack" ref={sectionRef} aria-label="Tech Stack" className="section">
      <p className="section-file-comment">{"import { backend, frontend, gis, tooling } from '@stack/core';"}</p>

      <h2 className="section-h2" style={{ marginBottom: 40 }}>
        <span className="glow-accent">stack</span>.config.ts
      </h2>

      {GROUPS.map((group, gi) => (
        <div key={group.label} style={{ marginBottom: 36 }}>
          {/* export const syntax header */}
          <p style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', marginBottom: 14, lineHeight: 1.5 }}>
            <span style={{ color: 'var(--syn-keyword)' }}>export const </span>
            <span style={{ color: 'var(--syn-fn)' }}>{group.exportName}</span>
            <span style={{ color: 'var(--text-muted)' }}> = [</span>
            <span style={{ color: 'var(--syn-comment)' }}>  {`/* ${group.title} */`}</span>
            <span style={{ color: 'var(--text-muted)' }}>]</span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))', gap: 12 }}>
            {(stack as any)[group.label].map((slug: string, i: number) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <StackIcon slug={slug} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Fake terminal — loops */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginTop: 48 }}
      >
        <p style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--syn-comment)', marginBottom: 12 }}>
          {'// build.output'}
        </p>
        <FakeTerminal />
      </motion.div>
    </section>
  );
}
