'use client';

const TABS = [
  { id: 'hero',      label: 'index.tsx',        icon: '⚛' },
  { id: 'about',     label: 'about.ts',          icon: '#' },
  { id: 'stack',     label: 'stack.config.ts',   icon: '#' },
  { id: 'portfolio', label: 'portfolio.ts',       icon: '#' },
  { id: 'offline',   label: 'offline.notes.ts',  icon: '#' },
  { id: 'world',     label: 'world.ts',           icon: '🌍' },
  { id: 'resume',    label: 'resume',             icon: '📄' },
  { id: 'contact',   label: 'contact.ts',         icon: '#' },
];

interface TabBarProps {
  activeSection: string;
  onTabClick: (id: string) => void;
}

export default function TabBar({ activeSection, onTabClick }: TabBarProps) {
  return (
    <div className="ide-tab-bar" role="tablist" aria-label="Portfolio sections">
      {TABS.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeSection === tab.id}
          className={`ide-tab ${activeSection === tab.id ? 'active' : ''}`}
          onClick={() => onTabClick(tab.id)}
          id={`tab-${tab.id}`}
        >
          <span aria-hidden="true" style={{ fontSize: '11px' }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export { TABS };
