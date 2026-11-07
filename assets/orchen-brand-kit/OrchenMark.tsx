/**
 * OrchenMark — the Orchen logo, its living animation (Facets Breath · Woven),
 * and the "Orchen" lockup where the mark is the capital O.
 *
 * Source of truth for geometry and motion. React 18+, no dependencies.
 *
 *   <OrchenMark size={360} />                     animated mark, opens on the still logo
 *   <OrchenMark size={72} intro={false} />        loader
 *   <OrchenMark size={32} animated={false} />     still mark (icons, avatars)
 *   <OrchenLockup height={28} />                  "Orchen" wordmark, still O (headers)
 *   <OrchenLockup height={120} animated />        hero wordmark, the O keeps breathing
 *
 * Colors come from CSS `color` (currentColor) or the `color` / `wordColor` props.
 */
import { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */

export const ORCHEN_COLORS = {
  forest: '#2C5F3F', // mark on light grounds; icon tile
  pine: '#1A3527', // wordmark letters on light grounds
  cream: '#F5F2EE', // light ground; mark/letters on forest
  night: '#0F1A14', // dark ground
  mint: '#8FBF9F', // mark on dark grounds
} as const;

/** Motion timing in seconds. */
export const TIMING = {
  breath: 5, // facets: hexagon <-> circle; outer and inner rings in opposite phase
  outerTurn: 22, // outer facet ring, clockwise
  innerTurn: 16, // inner facet ring, counter-clockwise
  coreTurn: 36, // solid core, clockwise
  introHold: 0.9, // still logo before motion starts
  introRamp: 2.6, // ease from still to full motion
};

export type Lattice = 'woven' | 'silk' | 'none';
export type Tier = 'hero' | 'regular' | 'loader' | 'compact';

/** Stroke weights in a 200-unit box (outer ring radius 80), by rendered size. */
export const TIERS: Record<Tier, { outer: number; inner: number; line: number; lattice: boolean }> = {
  hero: { outer: 9, inner: 5.5, line: 1.4, lattice: true }, //  >= 200px
  regular: { outer: 11, inner: 7, line: 2, lattice: true }, //  96–199px
  loader: { outer: 13, inner: 8.5, line: 2.8, lattice: true }, //  56–95px
  compact: { outer: 16, inner: 0, line: 0, lattice: false }, //  < 56px: outer facets + core, breath only
};
export function tierFor(size: number): Tier {
  if (size >= 200) return 'hero';
  if (size >= 96) return 'regular';
  if (size >= 56) return 'loader';
  return 'compact';
}

/* ------------------------------------------------------------------ */
/* Geometry engine (pure)                                              */
/* ------------------------------------------------------------------ */

const D = Math.PI / 180;
const C30 = Math.cos(30 * D);
type Pt = [number, number];
const f2 = (n: number) => n.toFixed(2);
const smoother = (x: number) => {
  const t = Math.min(1, Math.max(0, x));
  return t * t * t * (t * (6 * t - 15) + 10);
};
/** Intro progress (0 = still logo, 1 = full motion) for elapsed seconds. */
export const introProgress = (tau: number) => smoother((tau - TIMING.introHold) / TIMING.introRamp);

/** Radius factor of a six-sided shape morphing hexagon (m=0) → circle (m=1, at cs × r). */
function fac(th: number, rot: number, m: number, cs: number) {
  const u = ((((th - rot + 90) % 60) + 60) % 60) - 30;
  return (1 - m) * (C30 / Math.cos(u * D)) + m * cs;
}

/** Slow, independent line fades: each of 18 groups dissolves and returns on its own clock. */
function fade(q: number, mt: number) {
  const g = ((q + 1) * 0.6180339887) % 1;
  return smoother(0.5 + 0.5 * Math.sin(mt * (0.1 + 0.18 * g) + q * 2.39));
}

export type FacetsGeometry = { cx: number; cy: number; R: number; outer: number; inner: number; line: number };
export type Slot = { d: string; o: number; w: number; fill?: boolean };
export const LATTICE_SLOTS = 18;
export const SLOT_COUNT = LATTICE_SLOTS + 3; // + outer ring, inner ring, core

/**
 * One frame of the Facets mark.
 * mt = motion time (s), e = intro progress 0..1, lattice = line style.
 * Returns 21 slots in paint order: 18 lattice groups, outer ring, inner ring, core (filled).
 */
export function facetsFrame(mt: number, e: number, geo: FacetsGeometry, lattice: Lattice = 'woven'): Slot[] {
  const { cx, cy, R } = geo;
  const Ri = (R * 46) / 80;
  const Rc = (R * 20) / 80;
  const at = (r: number, rot: number, m: number, cs: number, th: number): Pt => {
    const rho = r * fac(th, rot, m, cs);
    return [cx + rho * Math.cos(th * D), cy + rho * Math.sin(th * D)];
  };
  const arc = (r: number, rot: number, m: number, cs: number, a0: number, a1: number) => {
    const n = Math.max(2, Math.ceil((a1 - a0) / 1.5));
    let s = '';
    for (let i = 0; i <= n; i++) {
      const p = at(r, rot, m, cs, a0 + ((a1 - a0) * i) / n);
      s += (i ? 'L' : 'M') + f2(p[0]) + ' ' + f2(p[1]);
    }
    return s;
  };
  const seg = (p: Pt, q: Pt) => `M${f2(p[0])} ${f2(p[1])}L${f2(q[0])} ${f2(q[1])}`;

  const br = 0.5 - 0.5 * Math.cos((2 * Math.PI * mt) / TIMING.breath);
  const ro = (360 * mt) / TIMING.outerTurn;
  const ri = 30 - (360 * mt) / TIMING.innerTurn;
  const rc = (360 * mt) / TIMING.coreTurn;
  const mo = br;
  const mi = 1 - br;
  const mc = 0.8 * br * e;
  const go = 6 + 5 * br * e; // facet gaps (degrees) breathe in opposition
  const gi = 6 + 5 * (1 - br) * e;

  let outerD = '';
  let innerD = '';
  const Mo: Pt[] = [];
  const Mi: Pt[] = [];
  const Vc: Pt[] = [];
  for (let v = 0; v < 6; v++) {
    const a0 = ro - 90 + 60 * v;
    outerD += arc(R, ro, mo, 0.9, a0 + go, a0 + 60 - go);
    Mo.push(at(R, ro, mo, 0.9, a0 + 30));
    const b0 = ri - 90 + 60 * v;
    innerD += arc(Ri, ri, mi, 0.9, b0 + gi, b0 + 60 - gi);
    Mi.push(at(Ri, ri, mi, 0.9, b0 + 30));
    Vc.push(at(Rc, rc, mc, 0.92, rc - 90 + 60 * v));
  }
  let coreD = '';
  for (let i = 0; i < 120; i++) {
    const p = at(Rc, rc, mc, 0.92, rc - 90 + 3 * i);
    coreD += (i ? 'L' : 'M') + f2(p[0]) + ' ' + f2(p[1]);
  }
  coreD += 'Z';

  const A = Array<string>(9).fill('');
  const B = Array<string>(9).fill('');
  if (lattice !== 'none' && geo.line > 0 && e > 0) {
    for (let w = 0; w < 6; w++) {
      A[(w * 7 + 2) % 9] += seg(Mo[w], Mi[w]); // outer facet → inner facet
      A[(w * 7 + 6) % 9] += seg(Mi[w], Vc[w]); // inner facet → core corner
      if (lattice === 'woven') {
        B[(w * 5 + 1) % 9] += seg(Mo[w], Mi[(w + 1) % 6]);
        B[(w * 5 + 4) % 9] += seg(Mo[w], Mi[(w + 5) % 6]);
        B[(w * 5 + 7) % 9] += seg(Mi[w], Vc[(w + 1) % 6]);
      }
    }
  }
  const oa = lattice === 'woven' ? 0.5 : 0.62;
  const slots: Slot[] = [];
  for (let q = 0; q < 9; q++) {
    const o = +(oa * fade(q, mt) * e).toFixed(3);
    slots.push({ d: A[q] && o > 0.002 ? A[q] : '', o, w: geo.line });
  }
  for (let q = 0; q < 9; q++) {
    const o = +(0.3 * fade(q + 9, mt) * e).toFixed(3);
    slots.push({ d: B[q] && o > 0.002 ? B[q] : '', o, w: geo.line * 0.85 });
  }
  slots.push({ d: outerD, o: 1, w: geo.outer });
  slots.push({ d: geo.inner > 0 ? innerD : '', o: +(0.85 * e).toFixed(3), w: geo.inner });
  slots.push({ d: coreD, o: 1, w: 0, fill: true });
  return slots;
}

/* ------------------------------------------------------------------ */
/* Lockup geometry: the mark is the capital O of "Orchen"              */
/* ------------------------------------------------------------------ */

/* Letter grid: x-height 0..100 (y down), ascender -64, baseline 100, stroke 12.
   Monoline geometric lowercase: every bowl is a circle of radius 50. */
const LOCK = (() => {
  const R = 88; // optical capital: a touch taller than the h
  const cy = 16;
  const cx = Math.round(R * C30) + 6;
  const S = 0.70710678 * 50;
  const A = 50 + S;
  type Cmd = (string | number)[];
  const L: Record<string, { w: number; adv?: number; d: Cmd[] }> = {
    r: { w: 50, adv: 40, d: [['M', 0, 0], ['L', 0, 100], ['M', 0, 50], ['A', 50, 50, 0, 0, 1, 50, 0]] },
    c: { w: A, d: [['M', A, 50 - S], ['A', 50, 50, 0, 1, 0, A, 50 + S]] },
    h: { w: 100, d: [['M', 0, -64], ['L', 0, 100], ['M', 0, 50], ['A', 50, 50, 0, 0, 1, 100, 50], ['L', 100, 100]] },
    e: { w: 100, d: [['M', 0, 50], ['L', 100, 50], ['A', 50, 50, 0, 1, 0, A, 50 + S]] },
    n: { w: 100, d: [['M', 0, 0], ['L', 0, 100], ['M', 0, 50], ['A', 50, 50, 0, 0, 1, 100, 50], ['L', 100, 100]] },
  };
  let x = cx + R * C30 + 40;
  let word = '';
  const letters = 'rchen'.split('');
  letters.forEach((ch, i) => {
    const g = L[ch];
    g.d.forEach((s) => {
      const n = s.slice(1) as number[];
      if (s[0] === 'A') word += 'A' + [n[0], n[1], n[2], n[3], n[4], f2(n[5] + x), f2(n[6])].join(' ');
      else word += s[0] + f2(n[0] + x) + ' ' + f2(n[1]);
    });
    x += (i === letters.length - 1 ? g.w : g.adv ?? g.w) + 30;
  });
  const right = x - 30 + 10;
  const top = cy - R - 10;
  const bottom = Math.max(108, cy + R + 10);
  return { R, cx, cy, word, vb: { x: -2, y: top, w: right + 4, h: bottom - top } };
})();
export const LOCKUP_VIEWBOX = `${LOCK.vb.x} ${LOCK.vb.y} ${f2(LOCK.vb.w)} ${LOCK.vb.h}`;
export const LOCKUP_ASPECT = LOCK.vb.w / LOCK.vb.h;
export const LOCKUP_WORD_PATH = LOCK.word;
/** Center and outer radius of the O inside the lockup's letter grid. */
export const LOCKUP_O = { cx: LOCK.cx, cy: LOCK.cy, R: LOCK.R };

/** Stroke weights for the lockup's O and letters (letter units) by rendered lockup height. */
function lockupWeights(heightPx: number) {
  if (heightPx >= 60) return { outer: 12, inner: 6.5, line: 2.2, word: 12 };
  if (heightPx >= 32) return { outer: 13, inner: 7, line: 0, word: 13 };
  return { outer: 16, inner: 8, line: 0, word: 15 };
}

/* ------------------------------------------------------------------ */
/* SVG string exporters (favicons, emails, server rendering)           */
/* ------------------------------------------------------------------ */

const slotsToSVG = (slots: Slot[], color: string) =>
  slots
    .filter((s) => s.d && s.o > 0)
    .map((s) =>
      s.fill
        ? `<path d="${s.d}" fill="${color}"/>`
        : `<path d="${s.d}" fill="none" stroke="${color}" stroke-width="${s.w}" stroke-linecap="round" stroke-linejoin="round"${s.o < 1 ? ` opacity="${s.o}"` : ''}/>`,
    )
    .join('');

/** The still mark. With `background`, it sits on a rounded tile (app icon / favicon). */
export function orchenMarkSVG(opts: { size?: number; color?: string; tier?: Tier; background?: string; radius?: number } = {}) {
  const size = opts.size ?? 200;
  const t = TIERS[opts.tier ?? tierFor(size)];
  const color = opts.color ?? ORCHEN_COLORS.forest;
  const slots = facetsFrame(0, 0, { cx: 100, cy: 100, R: 80, outer: t.outer, inner: t.inner, line: 0 }, 'none');
  const inner = opts.background
    ? `<rect width="200" height="200" rx="${opts.radius ?? 44}" fill="${opts.background}"/><g transform="translate(100 100) scale(0.74) translate(-100 -100)">${slotsToSVG(slots, color)}</g>`
    : slotsToSVG(slots, color);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${size}" height="${size}">${inner}</svg>`;
}

/** The still "Orchen" lockup. `height` in px picks the stroke weights. */
export function orchenLockupSVG(opts: { height?: number; color?: string; wordColor?: string; background?: string; pad?: number } = {}) {
  const h = opts.height ?? 120;
  const w8 = lockupWeights(h);
  const color = opts.color ?? ORCHEN_COLORS.forest;
  const wordColor = opts.wordColor ?? ORCHEN_COLORS.pine;
  const pad = opts.pad ?? 0;
  const { x, y, w, h: vh } = LOCK.vb;
  const slots = facetsFrame(0, 0, { cx: LOCK.cx, cy: LOCK.cy, R: LOCK.R, outer: w8.outer, inner: w8.inner, line: 0 }, 'none');
  const vb = `${f2(x - pad)} ${f2(y - pad)} ${f2(w + 2 * pad)} ${f2(vh + 2 * pad)}`;
  const width = Math.round((h * (w + 2 * pad)) / (vh + 2 * pad));
  const bg = opts.background ? `<rect x="${f2(x - pad)}" y="${f2(y - pad)}" width="${f2(w + 2 * pad)}" height="${f2(vh + 2 * pad)}" fill="${opts.background}"/>` : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${width}" height="${h}">` +
    bg +
    slotsToSVG(slots, color) +
    `<path d="${LOCK.word}" fill="none" stroke="${wordColor}" stroke-width="${w8.word}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `</svg>`
  );
}

/* ------------------------------------------------------------------ */
/* React                                                               */
/* ------------------------------------------------------------------ */

/** Paths for one Facets mark; animates itself when `animated`. */
function FacetsGroup({
  geo,
  lattice,
  animated,
  intro,
  speed,
}: {
  geo: FacetsGeometry;
  lattice: Lattice;
  animated: boolean;
  intro: boolean;
  speed: number;
}) {
  const startE = animated && !intro ? 1 : 0;
  const geoKey = `${geo.cx},${geo.cy},${geo.R},${geo.outer},${geo.inner},${geo.line}`;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initial = useMemo(() => facetsFrame(0, startE, geo, lattice), [geoKey, lattice, startE]);
  const groupRef = useRef<SVGGElement | null>(null);
  const refs = useRef<(SVGPathElement | null)[]>([]);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  useEffect(() => {
    if (!animated || typeof window === 'undefined') return;
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // the still logo stays
    } catch {
      /* ignore */
    }
    let tau = intro ? 0 : TIMING.introHold + TIMING.introRamp;
    let mt = 0;
    let last = 0;
    let raf = 0;
    let visible = true;
    const lastD: string[] = [];
    const io =
      'IntersectionObserver' in window && groupRef.current
        ? new IntersectionObserver((en) => {
            visible = en[0]?.isIntersecting ?? true;
          })
        : null;
    if (io && groupRef.current) io.observe(groupRef.current);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !last) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000) * speedRef.current;
      last = now;
      tau += dt;
      const e = introProgress(tau);
      mt += dt * e;
      const slots = facetsFrame(mt, e, geo, lattice);
      for (let i = 0; i < slots.length; i++) {
        const el = refs.current[i];
        if (!el) continue;
        if (lastD[i] !== slots[i].d) {
          el.setAttribute('d', slots[i].d);
          lastD[i] = slots[i].d;
        }
        el.setAttribute('opacity', String(slots[i].o));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated, intro, lattice, geoKey]);

  return (
    <g ref={groupRef} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {initial.map((s, i) => (
        <path
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          d={s.d}
          opacity={s.o}
          strokeWidth={s.fill ? undefined : s.w}
          fill={s.fill ? 'currentColor' : undefined}
          stroke={s.fill ? 'none' : undefined}
        />
      ))}
    </g>
  );
}

export type OrchenMarkProps = {
  /** Square size in px; picks the stroke tier. */
  size?: number;
  /** false = the still mark. Default true. */
  animated?: boolean;
  /** Open on the still mark, then ease into motion. Default true. */
  intro?: boolean;
  /** Lattice style. Default 'woven'. 'none' = facets only (calmest loader). */
  lattice?: Lattice;
  /** Mark color. Default currentColor. */
  color?: string;
  /** Motion speed multiplier. Default 1. */
  speed?: number;
  /** Force a stroke tier. */
  tier?: Tier;
  /** Accessible name; "" = decorative. Default "Orchen". */
  title?: string;
  className?: string;
  style?: CSSProperties;
};

export function OrchenMark({
  size = 240,
  animated = true,
  intro = true,
  lattice = 'woven',
  color,
  speed = 1,
  tier,
  title = 'Orchen',
  className,
  style,
}: OrchenMarkProps) {
  const t = TIERS[tier ?? tierFor(size)];
  const geo = { cx: 100, cy: 100, R: 80, outer: t.outer, inner: t.inner, line: t.lattice ? t.line : 0 };
  const decorative = title === '';
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{ color, overflow: 'visible', ...style }}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
    >
      <FacetsGroup geo={geo} lattice={lattice} animated={animated} intro={intro} speed={speed} />
    </svg>
  );
}

export type OrchenLockupProps = {
  /** Rendered height in px. Width follows (about 3.9 × height). */
  height?: number;
  /** Animate the O (heroes and splash screens only). Default false. */
  animated?: boolean;
  intro?: boolean;
  /** O color. Default forest. */
  color?: string;
  /** Letter color. Default pine. */
  wordColor?: string;
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

export function OrchenLockup({
  height = 32,
  animated = false,
  intro = true,
  color = ORCHEN_COLORS.forest,
  wordColor = ORCHEN_COLORS.pine,
  speed = 1,
  className,
  style,
}: OrchenLockupProps) {
  const w8 = lockupWeights(height);
  const geo = { cx: LOCK.cx, cy: LOCK.cy, R: LOCK.R, outer: w8.outer, inner: w8.inner, line: animated ? w8.line : 0 };
  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      height={height}
      width={Math.round(height * LOCKUP_ASPECT)}
      className={className}
      style={{ color, overflow: 'visible', ...style }}
      role="img"
      aria-label="Orchen"
    >
      <FacetsGroup geo={geo} lattice="woven" animated={animated} intro={intro} speed={speed} />
      <path d={LOCK.word} fill="none" stroke={wordColor} strokeWidth={w8.word} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default OrchenMark;
