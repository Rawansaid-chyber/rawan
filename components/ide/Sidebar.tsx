'use client';
import { Download, CheckCircle, Coffee, Bug, Clock, GitBranch } from 'lucide-react';

const FILES = [
  { id: 'hero',      label: 'index.tsx',       icon: '⚛', indent: 0 },
  { id: 'about',     label: 'about.ts',        icon: '#', indent: 0 },
  { id: 'stack',     label: 'stack.config.ts', icon: '#', indent: 0 },
  { id: 'portfolio', label: 'portfolio.ts',     icon: '#', indent: 0 },
  { id: 'offline',   label: 'offline.notes.ts',icon: '#', indent: 0 },
  { id: 'world',     label: 'world.ts',         icon: '🌍',indent: 0 },
  { id: 'resume',    label: 'resume',           icon: '📄',indent: 0 },
  { id: 'contact',   label: 'contact.ts',       icon: '#', indent: 0 },
];

interface SidebarProps {
  activeSection: string;
  onFileClick: (id: string) => void;
}

export default function Sidebar({ activeSection, onFileClick }: SidebarProps) {
  return (
    <aside className="ide-sidebar" aria-label="File explorer">
      <p className="sidebar-section-title">Explorer</p>

      <nav>
        {FILES.map(file => (
          <button
            key={file.id}
            className={`sidebar-file ${activeSection === file.id ? 'active' : ''}`}
            onClick={() => onFileClick(file.id)}
            aria-current={activeSection === file.id ? 'page' : undefined}
          >
            <span aria-hidden="true" style={{ fontSize: '11px', minWidth: '14px' }}>{file.icon}</span>
            {file.label}
          </button>
        ))}
      </nav>

      {/* Live stats widget */}
      <div className="sidebar-stats">
        <p className="sidebar-section-title" style={{ padding: '0 0 6px', fontSize: '9px' }}>
          Status
        </p>
        <div className="stat-row">
          <span><CheckCircle size={10} style={{ display: 'inline', marginRight: 4 }} />build</span>
          <span className="stat-val">passing</span>
        </div>
        <div className="stat-row">
          <span><CheckCircle size={10} style={{ display: 'inline', marginRight: 4 }} />tests</span>
          <span className="stat-val">green</span>
        </div>
        <div className="stat-row">
          <span><Clock size={10} style={{ display: 'inline', marginRight: 4 }} />uptime</span>
          <span className="stat-val">∞</span>
        </div>
        <div className="stat-row">
          <span><Coffee size={10} style={{ display: 'inline', marginRight: 4 }} />coffee</span>
          <span className="stat-val">brewing</span>
        </div>
        <div className="stat-row">
          <span><Bug size={10} style={{ display: 'inline', marginRight: 4 }} />bugs fixed</span>
          <span className="stat-val" style={{ color: '#3fb950' }}>many</span>
        </div>
        <div className="stat-row">
          <span><Bug size={10} style={{ display: 'inline', marginRight: 4 }} />bugs created</span>
          <span className="stat-val" style={{ color: 'var(--syn-property)' }}>fewer</span>
        </div>
      </div>

      {/* Download CV */}
      <a href="/resume.pdf" download className="btn-dl-cv" aria-label="Download CV">
        <Download size={13} />
        Download CV
      </a>
    </aside>
  );
}
