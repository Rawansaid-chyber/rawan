'use client';
import { motion } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import { Map, Smartphone, Layers, Copy, Check, ArrowLeftRight, Navigation } from 'lucide-react';
import { interests } from '@/content.config';
import { useLanguage } from '@/components/LanguageProvider';

/* ── Icon map ────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ReactNode> = {
  Map:        <Map size={22} />,
  Smartphone: <Smartphone size={22} />,
  Layers:     <Layers size={22} />,
};

/* ── GIS projection ──────────────────────────────────────── */
const LAT_MIN = 15.5, LAT_MAX = 27.5;
const LNG_MIN = 51.0, LNG_MAX = 61.0;
const SVG_W   = 500,  SVG_H   = 500;

function latlngToXY(lat: number, lng: number): [number, number] {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * SVG_W;
  const y = (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * SVG_H;
  return [x, y];
}

function xyToLatlng(svgX: number, svgY: number): [number, number] {
  const lng = LNG_MIN + (svgX / SVG_W) * (LNG_MAX - LNG_MIN);
  const lat = LAT_MIN + (1 - svgY / SVG_H) * (LAT_MAX - LAT_MIN);
  return [lat, lng];
}

function toDMS(dd: number, isLat: boolean): string {
  const dir = isLat ? (dd >= 0 ? 'N' : 'S') : (dd >= 0 ? 'E' : 'W');
  const abs = Math.abs(dd);
  const deg = Math.floor(abs);
  const mf  = (abs - deg) * 60;
  const min = Math.floor(mf);
  const sec = ((mf - min) * 60).toFixed(1);
  return `${deg}°${min}'${sec}"${dir}`;
}

function toDD(dms: string): number | null {
  const m = dms.trim().match(/^(\d+)[°\s]+(\d+)['′\s]+(\d+\.?\d*)["″\s]*([NSEW]?)$/i);
  if (!m) return null;
  const [, d, mn, s, dir] = m;
  const dd = +d + +mn / 60 + +s / 3600;
  return ['S', 'W'].includes(dir.toUpperCase()) ? -dd : dd;
}

function getRegion(lat: number, lng: number): string {
  if (lat > 25.8)                                                  return 'Musandam';
  if (lat >= 22.5 && lat <= 24.5 && lng >= 57.5 && lng <= 59.5)  return 'Muscat Governorate';
  if (lat >= 16.5 && lat <= 18.5 && lng >= 52.0 && lng <= 56.0)  return 'Dhofar — Salalah';
  if (lat >= 23.8 && lat <= 24.8 && lng >= 55.8 && lng <= 57.5)  return 'North Al Batinah';
  if (lat >= 22.0 && lat <= 24.0 && lng >= 55.5 && lng <= 57.5)  return 'Al Batinah';
  if (lat >= 21.0 && lat <= 23.5 && lng >= 57.5 && lng <= 60.0)  return 'Al Sharqiyah — Sur';
  if (lat >= 18.0 && lat <= 22.0 && lng >= 55.0 && lng <= 58.5)  return 'Al Wusta';
  return 'Oman';
}

/* ── Oman SVG paths (real coordinate-derived) ────────────── */
const OMAN_MAIN =
  'M 242,143 L 228,161 L 210,191 L 206,229 L 199,292 ' +
  'L 135,354 L 87,400 L 54,419 L 50,438 ' +
  'L 70,439 L 110,445 L 155,437 L 175,434 ' +
  'L 210,417 L 250,396 L 270,371 L 300,346 ' +
  'L 350,313 L 375,288 L 405,259 L 425,242 ' +
  'L 440,226 L 438,214 L 430,204 L 420,192 ' +
  'L 400,175 L 395,163 L 375,159 L 350,150 ' +
  'L 325,138 L 300,127 L 280,123 L 260,121 ' +
  'L 245,125 L 242,143 Z';

const OMAN_MUSANDAM = 'M 255,47 L 268,46 L 278,54 L 273,63 L 260,58 Z';

const CITIES = [
  { name: 'Muscat',  lat: 23.5880, lng: 58.3829, home: true  },
  { name: 'Sohar',   lat: 24.3643, lng: 56.7076, home: false },
  { name: 'Sur',     lat: 22.5661, lng: 59.5290, home: false },
  { name: 'Salalah', lat: 17.0151, lng: 54.0924, home: false },
];

/* ── Live Map ────────────────────────────────────────────── */
interface Ghost { svgX: number; svgY: number; lat: number; lng: number }

function LiveCoordMap({ lat, lng, onPick }: {
  lat: number; lng: number;
  onPick: (lat: number, lng: number) => void;
}) {
  const [pinX, pinY] = useMemo(() => latlngToXY(lat, lng), [lat, lng]);
  const [ghost, setGhost] = useState<Ghost | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const sx   = ((e.clientX - rect.left)  / rect.width)  * SVG_W;
    const sy   = ((e.clientY - rect.top)   / rect.height) * SVG_H;
    const [gLat, gLng] = xyToLatlng(sx, sy);
    setGhost({ svgX: sx, svgY: sy, lat: gLat, lng: gLng });
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const sx   = ((e.clientX - rect.left)  / rect.width)  * SVG_W;
    const sy   = ((e.clientY - rect.top)   / rect.height) * SVG_H;
    const [cLat, cLng] = xyToLatlng(sx, sy);
    onPick(+cLat.toFixed(4), +cLng.toFixed(4));
  }, [onPick]);

  const inBounds = pinX >= 0 && pinX <= SVG_W && pinY >= 0 && pinY <= SVG_H;
  const region   = getRegion(lat, lng);

  const ttLeft = ghost ? ghost.svgX > 360 : false;
  const ttUp   = ghost ? ghost.svgY > 440 : false;
  const ttX    = ghost ? (ttLeft ? ghost.svgX - 132 : ghost.svgX + 8) : 0;
  const ttY    = ghost ? (ttUp   ? ghost.svgY - 38  : ghost.svgY + 6) : 0;

  return (
    <div className="gis-map-wrap" style={{
      background: 'var(--bg-panel)', border: '1px solid var(--border)',
      borderRadius: 12, padding: 16,
      display: 'flex', flexDirection: 'column', gap: 10,
      height: '100%', boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--text-muted)' }}>
        <Navigation size={12} style={{ color: 'var(--accent)' }} />
        <span style={{ color: 'var(--syn-comment)' }}>// click to pick coordinates</span>
        <span style={{ marginLeft: 'auto', color: inBounds ? '#3fb950' : 'var(--syn-property)' }}>
          ● {inBounds ? region : 'out of range'}
        </span>
      </div>

      {/* SVG Map */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="none"
        style={{ display: 'block', flex: 1, minHeight: 0, borderRadius: 8, background: 'linear-gradient(160deg,#040f1a 0%,#051320 60%,#030c14 100%)', cursor: 'crosshair' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setGhost(null)}
        onClick={handleClick}
        aria-label="Interactive Oman map"
        role="img"
      >
        <defs>
          <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="terrain-glow" cx="60%" cy="40%" r="55%">
            <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="ocean-depth" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor="transparent" />
            <stop offset="100%" stopColor="#010608" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        {[100,200,300,400].map(v => (
          <g key={v}>
            <line x1={0} y1={v} x2={SVG_W} y2={v} stroke="#081626" strokeWidth="1" />
            <line x1={v} y1={0} x2={v} y2={SVG_H} stroke="#081626" strokeWidth="1" />
          </g>
        ))}
        <path d={OMAN_MAIN}     fill="#0d2018" stroke="var(--accent)" strokeWidth="1.4" strokeLinejoin="round" />
        <path d={OMAN_MAIN}     fill="url(#terrain-glow)" style={{ pointerEvents: 'none' }} />
        <path d={OMAN_MUSANDAM} fill="#0d2018" stroke="var(--accent)" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="url(#ocean-depth)" style={{ pointerEvents: 'none' }} />

        {/* City markers */}
        {CITIES.map(city => {
          const [cx, cy] = latlngToXY(city.lat, city.lng);
          const right    = cx > 350;
          return (
            <g key={city.name} style={{ cursor: 'pointer' }}
              onClick={e => { e.stopPropagation(); onPick(city.lat, city.lng); }}>
              <circle cx={cx} cy={cy} r={city.home ? 12 : 9} fill="none"
                stroke={city.home ? 'var(--accent)' : '#4a9eff'} strokeWidth="0.6" opacity="0.25" />
              <circle cx={cx} cy={cy} r={city.home ? 4.5 : 3}
                fill={city.home ? 'var(--accent)' : '#4a9eff'} />
              <text x={cx + (right ? -7 : 7)} y={cy + 1} fontSize="9"
                fill={city.home ? 'var(--accent)' : '#7ab8ff'}
                fontFamily="JetBrains Mono, monospace"
                textAnchor={right ? 'end' : 'start'}
                style={{ pointerEvents: 'none', userSelect: 'none' }}>
                {city.home ? `★ ${city.name}` : city.name}
              </text>
            </g>
          );
        })}

        {/* Ghost hover */}
        {ghost && (
          <g style={{ pointerEvents: 'none' }}>
            <line x1={0} y1={ghost.svgY} x2={SVG_W} y2={ghost.svgY} stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            <line x1={ghost.svgX} y1={0} x2={ghost.svgX} y2={SVG_H} stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            <line x1={ghost.svgX-10} y1={ghost.svgY} x2={ghost.svgX+10} y2={ghost.svgY} stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
            <line x1={ghost.svgX} y1={ghost.svgY-10} x2={ghost.svgX} y2={ghost.svgY+10} stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
            <circle cx={ghost.svgX} cy={ghost.svgY} r={2} fill="white" opacity="0.5" />
            <rect x={ttX} y={ttY} width={126} height={32} rx={3} fill="#020810" stroke="#1e2530" strokeWidth="0.6" opacity="0.95" />
            <text x={ttX+6} y={ttY+13} fontSize="8.5" fill="var(--syn-string)" fontFamily="JetBrains Mono, monospace">
              {ghost.lat.toFixed(4)}°N  {ghost.lng.toFixed(4)}°E
            </text>
            <text x={ttX+6} y={ttY+25} fontSize="8" fill="var(--text-muted)" fontFamily="JetBrains Mono, monospace">
              click to pick
            </text>
          </g>
        )}

        {/* Live pin */}
        {inBounds && (
          <g style={{ pointerEvents: 'none' }} filter="url(#pin-glow)">
            <circle cx={pinX} cy={pinY} r={8} fill="none" stroke="var(--accent)" strokeWidth="0.8">
              <animate attributeName="r"       values="5;18;5"    dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={pinX} cy={pinY} r={5}   fill="var(--accent)" opacity="0.2" />
            <circle cx={pinX} cy={pinY} r={3.5} fill="var(--accent)" />
            <line x1={pinX-9} y1={pinY}     x2={pinX+9} y2={pinY}     stroke="var(--accent)" strokeWidth="1" opacity="0.75" />
            <line x1={pinX}   y1={pinY-9}   x2={pinX}   y2={pinY+9}   stroke="var(--accent)" strokeWidth="1" opacity="0.75" />
          </g>
        )}
      </svg>

      {/* Status bar */}
      <div style={{ flexShrink: 0, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <span><span style={{ color: 'var(--text-muted)' }}>⊕ </span><span style={{ color: 'var(--syn-string)' }}>{lat.toFixed(4)}°N  {lng.toFixed(4)}°E</span></span>
        <span style={{ color: 'var(--text-dim)' }}>|</span>
        <span><span style={{ color: 'var(--text-muted)' }}>dms </span><span style={{ color: 'var(--syn-type)', fontSize: 9 }}>{toDMS(lat, true)} {toDMS(lng, false)}</span></span>
        <span style={{ color: 'var(--text-dim)' }}>|</span>
        <span><span style={{ color: inBounds ? '#3fb950' : 'var(--syn-property)' }}>● </span><span style={{ color: 'var(--text-muted)' }}>{region}</span></span>
      </div>
    </div>
  );
}

/* ── GIS Widget ──────────────────────────────────────────── */
function GISWidget() {
  const [latDD, setLatDD]   = useState('23.5880');
  const [lngDD, setLngDD]   = useState('58.3829');
  const [latDMS, setLatDMS] = useState('');
  const [lngDMS, setLngDMS] = useState('');
  const [mode, setMode]     = useState<'dd2dms' | 'dms2dd'>('dd2dms');
  const [copied, setCopied] = useState(false);
  const [error, setError]   = useState('');

  const previewLat = useMemo(() => {
    if (mode === 'dd2dms') return parseFloat(latDD) || 23.588;
    const v = toDD(latDMS); return v ?? 23.588;
  }, [latDD, latDMS, mode]);

  const previewLng = useMemo(() => {
    if (mode === 'dd2dms') return parseFloat(lngDD) || 58.3829;
    const v = toDD(lngDMS); return v ?? 58.3829;
  }, [lngDD, lngDMS, mode]);

  const handlePick = useCallback((lat: number, lng: number) => {
    setLatDD(lat.toFixed(4)); setLngDD(lng.toFixed(4));
    setLatDMS(''); setLngDMS(''); setMode('dd2dms'); setError('');
  }, []);

  const convert = () => {
    setError('');
    if (mode === 'dd2dms') {
      const lat = parseFloat(latDD), lng = parseFloat(lngDD);
      if (isNaN(lat) || isNaN(lng)) { setError('Invalid decimal degrees.'); return; }
      setLatDMS(toDMS(lat, true)); setLngDMS(toDMS(lng, false));
    } else {
      const lat = toDD(latDMS), lng = toDD(lngDMS);
      if (lat === null || lng === null) { setError("Bad DMS — try: 23°35'17.0\"N"); return; }
      setLatDD(lat.toFixed(4)); setLngDD(lng.toFixed(4));
    }
  };

  const copyResult = () => {
    const text = mode === 'dd2dms'
      ? `Lat: ${latDMS}\nLng: ${lngDMS}` : `Lat: ${latDD}°\nLng: ${lngDD}°`;
    if (!latDMS && !lngDMS && mode === 'dd2dms') return;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };

  const inp: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '8px 10px',
    background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 6,
    outline: 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
    color: 'var(--text-primary)', marginBottom: 10, display: 'block',
  };
  const lbl: React.CSSProperties = {
    fontSize: 11, fontFamily: 'JetBrains Mono, monospace',
    color: 'var(--text-muted)', display: 'block', marginBottom: 4,
  };

  return (
    <div className="gis-widget-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 20, alignItems: 'stretch' }}>
      {/* Converter form */}
      <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexShrink: 0 }}>
          {(['dd2dms', 'dms2dd'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setLatDMS(''); setLngDMS(''); }}
              style={{ flex: 1, padding: '7px 0', background: mode === m ? 'var(--accent)' : 'var(--bg-secondary)', color: mode === m ? '#000' : 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, cursor: 'pointer', fontWeight: mode === m ? 700 : 400, transition: 'background 0.2s, color 0.2s' }}>
              {m === 'dd2dms' ? 'DD → DMS' : 'DMS → DD'}
            </button>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {mode === 'dd2dms' ? (<>
            <label style={lbl}>Latitude (°)</label>
            <input style={inp} value={latDD} onChange={e => setLatDD(e.target.value)} placeholder="23.5880" />
            <label style={lbl}>Longitude (°)</label>
            <input style={inp} value={lngDD} onChange={e => setLngDD(e.target.value)} placeholder="58.3829" />
          </>) : (<>
            <label style={lbl}>Latitude DMS</label>
            <input style={inp} value={latDMS} onChange={e => setLatDMS(e.target.value)} placeholder="23°35'17.0&quot;N" />
            <label style={lbl}>Longitude DMS</label>
            <input style={inp} value={lngDMS} onChange={e => setLngDMS(e.target.value)} placeholder="58°22'58.0&quot;E" />
          </>)}
        </div>
        <button className="btn-primary" onClick={convert} style={{ width: '100%', justifyContent: 'center', marginBottom: 12, flexShrink: 0 }}>
          <ArrowLeftRight size={14} /> Convert
        </button>
        {error && <p style={{ color: 'var(--syn-property)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', marginBottom: 8, flexShrink: 0 }}>{error}</p>}
        {(mode === 'dd2dms' ? !!latDMS : true) && (
          <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 6, padding: '12px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, position: 'relative', flexShrink: 0 }}>
            {mode === 'dd2dms'
              ? latDMS
                ? <><div><span style={{ color: 'var(--text-muted)' }}>Lat: </span><span style={{ color: 'var(--syn-string)' }}>{latDMS}</span></div><div><span style={{ color: 'var(--text-muted)' }}>Lng: </span><span style={{ color: 'var(--syn-string)' }}>{lngDMS}</span></div></>
                : <span style={{ color: 'var(--text-dim)' }}>Output will appear here…</span>
              : <><div><span style={{ color: 'var(--text-muted)' }}>Lat: </span><span style={{ color: 'var(--syn-string)' }}>{latDD}°</span></div><div><span style={{ color: 'var(--text-muted)' }}>Lng: </span><span style={{ color: 'var(--syn-string)' }}>{lngDD}°</span></div></>
            }
            <button onClick={copyResult} title="Copy" style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#3fb950' : 'var(--text-muted)' }} aria-label="Copy coordinates">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        )}
        <p style={{ marginTop: 'auto', paddingTop: 12, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-dim)', flexShrink: 0 }}>
          Default: Muscat, Oman — home base
        </p>
      </div>

      {/* Live Oman map */}
      <LiveCoordMap lat={previewLat} lng={previewLng} onPick={handlePick} />
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function Offline({ sectionRef }: { sectionRef?: React.RefObject<HTMLElement> }) {
  const { t } = useLanguage();
  return (
    <section id="offline" ref={sectionRef} aria-label="Off-hours" className="section">
      <p className="section-file-comment">{t('offline_file')}</p>
      <h2 className="section-h2" style={{ marginBottom: 40 }}>
        <span className="glow-accent">{t('offline_accent')}</span> {t('offline_heading')}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
        {interests.map((item, i) => (
          <motion.div key={item.namespace} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
            style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
            <div style={{ color: 'var(--accent)', marginBottom: 10 }}>{ICON_MAP[item.icon]}</div>
            <p style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: 'var(--syn-comment)', marginBottom: 4 }}>{item.namespace}</p>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>{item.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <p style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--syn-comment)', marginBottom: 16 }}>
          {'// gis.coordinate_converter() — a tool I actually use'}
        </p>
        <GISWidget />
      </motion.div>
    </section>
  );
}
