'use client';
import { GitBranch, AlertCircle, Code2, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatusBarProps { scrollLine: number; }

export default function StatusBar({ scrollLine }: StatusBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="ide-status-bar" role="status" aria-label="Editor status bar">
      <div className="status-item">
        <GitBranch size={12} />
        <span>main</span>
      </div>
      <span className="status-sep status-hide-sm">·</span>
      <div className="status-item status-hide-sm">
        <AlertCircle size={12} />
        <span>0 errors</span>
      </div>
      <span className="status-sep status-hide-sm">·</span>
      <div className="status-item status-hide-sm">
        <Code2 size={12} />
        <span>TypeScript</span>
      </div>
      <span className="status-sep status-hide-sm">·</span>
      <span className="status-item status-hide-sm">UTF-8</span>
      <span className="status-sep">·</span>
      <span className="status-item">Ln {scrollLine}, Col 1</span>

      <div className="status-right">
        {time && <span>{time}</span>}
        <a
          href="/resume.pdf"
          download
          style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#000', textDecoration: 'none', fontWeight: 700 }}
          aria-label="Download CV"
        >
          <Download size={11} />
          CV
        </a>
      </div>
    </footer>
  );
}
