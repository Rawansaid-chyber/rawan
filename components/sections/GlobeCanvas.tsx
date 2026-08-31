'use client';
import { useEffect, useRef, useCallback, useState } from 'react';
import createGlobe, { type COBEOptions, type Marker } from 'cobe';

interface Pin { lat: number; lng: number; label: string; }

const OMAN_PHI   = -(58.38 * Math.PI) / 180;
const OMAN_THETA = 0.28;

export default function GlobeCanvas({ visited }: { visited: Pin[] }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const globeRef   = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef     = useRef(OMAN_PHI);
  const thetaRef   = useRef(OMAN_THETA);
  const dragging   = useRef(false);
  const lastX      = useRef(0);
  const lastY      = useRef(0);
  const rafRef     = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const markers: Marker[] = visited.map(p => ({
    location: [p.lat, p.lng] as [number, number],
    size: 0.055,
  }));

  // ── Globe init — wait for real layout size via ResizeObserver ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let initiated = false;

    const init = (px: number) => {
      if (initiated) return;
      initiated = true;

      const dpr  = Math.min(window.devicePixelRatio, 2);
      const size = Math.round(px * dpr);

      // cobe needs explicit square pixel dimensions on the canvas element
      canvas.width  = size;
      canvas.height = size;

      const opts: COBEOptions = {
        devicePixelRatio: dpr,
        width:  size,
        height: size,
        phi:   phiRef.current,
        theta: thetaRef.current,
        dark:          1,
        diffuse:       0.45,
        mapSamples:    22000,
        mapBrightness: 1.6,
        baseColor:    [0.03, 0.09, 0.15],
        markerColor:  [1.0,  0.65, 0.0 ],
        glowColor:    [0.12, 0.35, 0.65],
        markers,
      };

      globeRef.current = createGlobe(canvas, opts);

      const tick = () => {
        if (!dragging.current) phiRef.current += 0.0018;
        globeRef.current?.update({ phi: phiRef.current, theta: thetaRef.current });
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    // Use ResizeObserver so we get the real layout width (handles SSR + Next hydration)
    const ro = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect?.width;
      if (w && w > 0) init(w);
    });
    ro.observe(canvas);

    // Also try immediately in case already laid out
    if (canvas.offsetWidth > 0) init(canvas.offsetWidth);

    return () => {
      ro.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      globeRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Drag ───────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current    = e.clientX;
    lastY.current    = e.clientY;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    const dy = e.clientY - lastY.current;
    phiRef.current   -= dx * 0.005;
    thetaRef.current  = Math.max(-0.75, Math.min(0.75, thetaRef.current + dy * 0.003));
    lastX.current = e.clientX;
    lastY.current = e.clientY;
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    setIsDragging(false);
  }, []);

  return (
    <div style={{
      width: '100%',
      maxWidth: 560,
      margin: '0 auto',
      aspectRatio: '1 / 1',   /* square container → round globe */
      position: 'relative',
      borderRadius: 16,
      overflow: 'hidden',
      background: 'var(--bg-panel)',
      border: '1px solid var(--border)',
    }}>
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          cursor: isDragging ? 'grabbing' : 'grab',
          display: 'block',
        }}
        aria-label="Interactive 3D globe showing places visited"
      />
      <div style={{
        position: 'absolute', top: 12, left: 14,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        color: 'rgba(255,255,255,0.18)',
        pointerEvents: 'none', userSelect: 'none',
      }}>
        drag to rotate
      </div>
    </div>
  );
}
