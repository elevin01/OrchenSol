/* Generate the browser animation from the supplied source of truth.
   Development only: npm install --prefix /tmp/orchen-brand-tools typescript
   NODE_PATH=/tmp/orchen-brand-tools/node_modules node scripts/build-brand-motion.cjs
   The website itself stays buildless and has no React dependency. */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/orchen-brand-kit/OrchenMark.tsx'), 'utf8');
const geometry = source.slice(0, source.indexOf('/* React')).replace(/^import .*;\n/gm, '');
const compiled = ts.transpileModule(geometry, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 },
}).outputText;
const runtime = `
// Progressive enhancement: the supplied still image works without JavaScript.
for (const image of document.querySelectorAll('[data-brand-animation]')) {
  const template = document.createElement('template');
  template.innerHTML = orchenLockupSVG({ height: 80, color: ORCHEN_COLORS.mint, wordColor: ORCHEN_COLORS.cream });
  const svg = template.content.firstElementChild;
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', image.alt || 'Orchen');
  svg.setAttribute('data-brand-animation', '');
  const word = svg.lastElementChild;
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('fill', 'none');
  group.setAttribute('stroke', ORCHEN_COLORS.mint);
  group.setAttribute('stroke-linecap', 'round');
  group.setAttribute('stroke-linejoin', 'round');
  const weights = lockupWeights(80);
  const geo = { ...LOCKUP_O, outer: weights.outer, inner: weights.inner, line: weights.line };
  const initial = facetsFrame(0, 0, geo, 'woven');
  const paths = initial.map((slot) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    node.setAttribute('stroke-width', slot.w);
    if (slot.fill) {
      node.setAttribute('fill', ORCHEN_COLORS.mint);
      node.setAttribute('stroke', 'none');
    }
    group.append(node);
    return node;
  });
  svg.replaceChildren(group, word);
  image.replaceWith(svg);
  let elapsed = 0, motionTime = 0, last = 0, frame = 0;
  let visible = !('IntersectionObserver' in window);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const paint = (slots) => slots.forEach((slot, i) => {
    paths[i].setAttribute('d', slot.d);
    paths[i].setAttribute('opacity', slot.o);
  });
  paint(initial);
  function tick(now) {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    elapsed += dt;
    const progress = introProgress(elapsed);
    motionTime += dt * progress;
    paint(facetsFrame(motionTime, progress, geo, 'woven'));
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = last = 0;
    if (reduced.matches) {
      elapsed = motionTime = 0;
      paint(initial);
    }
    if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(svg);
  }
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
}
`;
fs.writeFileSync(path.join(root, 'assets/brand-motion.js'),
  '// Generated from orchen-brand-kit/OrchenMark.tsx; do not redraw the mark.\n' + compiled + runtime);
console.log('Generated assets/brand-motion.js from the brand kit.');
