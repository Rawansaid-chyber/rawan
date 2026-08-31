'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import TitleBar from '@/components/ide/TitleBar';
import TabBar   from '@/components/ide/TabBar';
import Sidebar  from '@/components/ide/Sidebar';
import StatusBar from '@/components/ide/StatusBar';
import Hero      from '@/components/sections/Hero';
import About     from '@/components/sections/About';
import Stack     from '@/components/sections/Stack';
import Portfolio from '@/components/sections/Portfolio';
import Offline   from '@/components/sections/Offline';
import World     from '@/components/sections/World';
import Resume    from '@/components/sections/Resume';
import Contact   from '@/components/sections/Contact';

const SECTIONS = ['hero','about','stack','portfolio','offline','world','resume','contact'] as const;
type SectionId = typeof SECTIONS[number];

export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [scrollLine, setScrollLine] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    hero:      useRef<HTMLElement>(null),
    about:     useRef<HTMLElement>(null),
    stack:     useRef<HTMLElement>(null),
    portfolio: useRef<HTMLElement>(null),
    offline:   useRef<HTMLElement>(null),
    world:     useRef<HTMLElement>(null),
    resume:    useRef<HTMLElement>(null),
    contact:   useRef<HTMLElement>(null),
  } as Record<SectionId, React.RefObject<HTMLElement>>;

  // Track active section on scroll
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollTop = el.scrollTop;
      const totalH    = el.scrollHeight - el.clientHeight;
      setScrollLine(Math.max(1, Math.round((scrollTop / (totalH || 1)) * 200)));

      let current: SectionId = 'hero';
      for (const id of SECTIONS) {
        const sec = sectionRefs[id].current;
        if (sec && sec.offsetTop - 60 <= scrollTop) current = id;
      }
      setActiveSection(current);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id: SectionId) => {
    const sec = sectionRefs[id].current;
    if (sec) {
      contentRef.current?.scrollTo({ top: sec.offsetTop, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="ide-shell">
      <TitleBar />
      <TabBar activeSection={activeSection} onTabClick={id => scrollTo(id as SectionId)} />
      <Sidebar activeSection={activeSection} onFileClick={id => scrollTo(id as SectionId)} />

      {/* Main scrollable content */}
      <main className="ide-content" ref={contentRef} id="main-content">
        <Hero      sectionRef={sectionRefs.hero}      />
        <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />
        <About     sectionRef={sectionRefs.about}     />
        <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />
        <Stack     sectionRef={sectionRefs.stack}     />
        <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />
        <Portfolio sectionRef={sectionRefs.portfolio} />
        <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />
        <Offline   sectionRef={sectionRefs.offline}   />
        <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />
        <World     sectionRef={sectionRefs.world}     />
        <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />
        <Resume    sectionRef={sectionRefs.resume}    />
        <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />
        <Contact   sectionRef={sectionRefs.contact}   />
        <div style={{ height: 48 }} />
      </main>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {(['hero','about','stack','portfolio','offline','world','resume','contact'] as SectionId[]).map(id => (
          <button
            key={id}
            className={`mobile-nav-item ${activeSection === id ? 'active' : ''}`}
            onClick={() => scrollTo(id)}
            aria-label={id}
          >
            <span style={{ fontSize: 16 }}>
              {id === 'hero' ? '⚛' : id === 'world' ? '🌍' : id === 'resume' ? '📄' : '#'}
            </span>
            <span>{id}</span>
          </button>
        ))}
      </nav>

      <StatusBar scrollLine={scrollLine} />
    </div>
  );
}
