'use client';
import { useEffect, useRef, useCallback, useState } from 'react';
import createGlobe, { type COBEOptions, type Marker } from 'cobe';


// Oman key cities as lat/lng markers
const MARKERS: Marker[] = [

  { location: [23.5880,  58.3829], size: 0.06 }, // Muscat (home)
  { location: [24.3643,  56.7076], size: 0.04 }, // Sohar
  { location: [22.5661,  59.5290], size: 0.04 }, // Sur
  { location: [17.0151,  54.0924], size: 0.04 }, // Salalah
];

// Initial phi: center on Oman (~58°E)
const OMAN_PHI = -(58.3829 * Math.PI) / 180;

interface GlobeProps {
  onCoordPick?: (lat: number, lng: number) => void;
}

export default function GlobePanel({ onCoordPick }: GlobeProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const globeRef     = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef       = useRef(OMAN_PHI);
  const thetaRef     = useRef(0.25);
  const dragging     = useRef(false);
  const lastX        = useRef(0);
  const lastY        = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // ── Build globe + animation loop ─────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr  = Math.min(window.devicePixelRatio, 2);
    const size = canvas.offsetWidth * dpr || 600;

    canvas.width  = size;
    canvas.height = size;

    const BASE_OPTS: COBEOptions = {
      devicePixelRatio: dpr,
      width:  size,
      height: size,
      phi:    phiRef.current,
      theta:  thetaRef.current,
      dark:        1,
      diffuse:     0.5,
      mapSamples:  20000,
      mapBrightness: 1.8,
      baseColor:   [0.04, 0.10, 0.16],
      markerColor: [1.0,  0.65, 0.0 ],
      glowColor:   [0.15, 0.40, 0.70],
      markers: MARKERS,
    };

    globeRef.current = createGlobe(canvas, BASE_OPTS);

    // Animation loop: auto-rotate when idle, follow drag
    const tick = () => {
      if (!dragging.current) {
        phiRef.current += 0.0018;
      }
      globeRef.current?.update({ phi: phiRef.current, theta: thetaRef.current });
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
      globeRef.current?.destroy();
    };
  }, []);

  // ── Drag to rotate ───────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    const dy = e.clientY - lastY.current;
    phiRef.current   -= dx * 0.005;
    thetaRef.current += dy * 0.003;
    thetaRef.current  = Math.max(-0.8, Math.min(0.8, thetaRef.current));
    lastX.current = e.clientX;
    lastY.current = e.clientY;
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    setIsDragging(false);
  }, []);

  // ── Click to pick Muscat on double-click ─────────────────────
  const onDoubleClick = useCallback(() => {
    // Snap to Muscat
    if (onCoordPick) onCoordPick(23.5880, 58.3829);
  }, [onCoordPick]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
      {/* Canvas fills available space */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onDoubleClick={onDoubleClick}
          style={{
            width: '100%',
            height: '100%',
            cursor: isDragging ? 'grabbing' : 'grab',
            display: 'block',
          }}
          aria-label="Interactive 3D globe — drag to rotate"
        />
        {/* Overlay hint */}
        <div style={{
          position: 'absolute', top: 10, left: 14,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          color: 'rgba(255,255,255,0.25)',
          pointerEvents: 'none',
        }}>
          drag to rotate · double-click to pick Muscat
        </div>
      </div>

      {/* Status bar */}
      <div style={{
        flexShrink: 0,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 6,
        padding: '6px 10px',
        display: 'flex', gap: 12, alignItems: 'center',
        marginTop: 10,
      }}>
        <span>
          <span style={{ color: 'var(--accent)' }}>● </span>
          <span style={{ color: 'var(--text-muted)' }}>{MARKERS.length} locations</span>
        </span>
        <span style={{ color: 'var(--text-dim)' }}>·</span>
        <span style={{ color: 'var(--text-muted)' }}>Oman-based</span>
        <span style={{ color: 'var(--text-dim)', marginLeft: 'auto' }}>23.5880°N · 58.3829°E</span>
      </div>
    </div>
  );
}
