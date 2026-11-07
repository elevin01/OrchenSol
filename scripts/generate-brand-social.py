"""Generate page-specific vector social cards using the supplied Orchen artwork.

Development dependency: fonttools[woff]. Export the generated 1200x630 SVGs to
PNG with an SVG renderer (for example sharp). Commit both; no production build.
"""
from html import unescape
from pathlib import Path
import re
from xml.sax.saxutils import escape

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'assets/social'
OUTPUT.mkdir(exist_ok=True)
headline_font = instantiateVariableFont(TTFont(ROOT / 'assets/fonts/inter-variable.woff2'), {'wght': 650, 'opsz': 32})
tagline_font = TTFont(ROOT / 'assets/fonts/lora-italic.woff2')
lockup = (ROOT / 'assets/orchen-brand-kit/svg/orchen-lockup-dark.svg').read_text()
lockup = re.sub(r'<svg[^>]*>', '<svg x="72" y="58" width="300" height="78" viewBox="-2 -82 757.57 196">', lockup, count=1)


def text_width(text, font, size):
    cmap = font.getBestCmap()
    return sum(font['hmtx'][cmap[ord(c)]][0] for c in text) * size / font['head'].unitsPerEm


def text_path(text, font, size, x, y, color):
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    advance = 0
    parts = []
    for char in text:
        glyph = cmap[ord(char)]
        pen = SVGPathPen(glyphs)
        glyphs[glyph].draw(pen)
        parts.append(f'<path transform="translate({advance} 0)" d="{pen.getCommands()}"/>')
        advance += font['hmtx'][glyph][0]
    scale = size / font['head'].unitsPerEm
    return f'<g fill="{color}" transform="translate({x} {y}) scale({scale} {-scale})">' + ''.join(parts) + '</g>'


def wrap(text, size):
    lines = ['']
    for word in text.split():
        candidate = (lines[-1] + ' ' + word).strip()
        if text_width(candidate, headline_font, size) > 1056 and lines[-1]:
            lines.append(word)
        else:
            lines[-1] = candidate
    return lines


titles = {
    'home': 'Every student, understood.',
    'compare': 'Find the right AI for your school.',
    'compare-orchen-vs-chatgpt': 'Orchen vs. ChatGPT',
    'compare-orchen-vs-schoolai': 'Orchen vs. SchoolAI',
    'compare-orchen-vs-khanmigo': 'Orchen vs. Khanmigo',
    'compare-orchen-vs-magicschool': 'Orchen vs. MagicSchool',
}
for page in sorted(ROOT.rglob('*.html')):
    if page.name == '404.html':
        continue
    relative = page.relative_to(ROOT)
    slug = 'home' if str(relative) == 'index.html' else str(relative.with_suffix('')).removesuffix('/index').replace('/', '-')
    title = unescape(re.search(r'<title>(.*?)</title>', page.read_text())[1])
    title = titles.get(slug, re.split(r'\s*[|—]\s*', title)[0])
    title = re.sub(r',? Orchen$', '', title)
    size = 68
    lines = wrap(title, size)
    while len(lines) > 3:
        size -= 2
        lines = wrap(title, size)
    heading = ''.join(text_path(line, headline_font, size, 72, 258 + i * (size + 13), '#F5F2EE') for i, line in enumerate(lines))
    tagline = 'Guided AI for students. Lasting insight for schools.' if slug == 'home' else 'Every student, understood.'
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="{escape(title, {chr(34): '&quot;'})}">
<rect width="1200" height="630" fill="#0F1A14"/>
{lockup}
<path d="M72 178H1128" stroke="#8FBF9F" stroke-opacity="0.35"/>
{heading}
{text_path(tagline, tagline_font, 29, 72, 552, '#8FBF9F')}
</svg>'''
    (OUTPUT / f'{slug}.svg').write_text(svg)
print(f'Generated {len(list(OUTPUT.glob("*.svg")))} branded social cards.')
