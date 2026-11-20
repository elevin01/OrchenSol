"""Prepare lossless website captures from the November 2026 feature evidence.

Requires Pillow and Poppler's pdfimages. Run with --guide /path/to/guide.pdf,
or --extracted-guide /path/to/pdfimages-output (prefix: feature).
The PDF is reference material and is not copied into the public website.
"""
import argparse
from pathlib import Path
import subprocess
import tempfile

from PIL import Image

ASSETS = Path(__file__).resolve().parents[1] / 'assets'


def prepare(source, name):
    with Image.open(source) as capture:
        image = capture.convert('RGB')
        full = ASSETS / f'{name}.webp'
        image.save(full, 'WEBP', lossless=True, method=6)
        with Image.open(full) as decoded:
            assert decoded.convert('RGB').tobytes() == image.tobytes()
        if image.width > 1600:
            preview = image.resize((1600, round(image.height * 1600 / image.width)), Image.Resampling.LANCZOS)
            preview.save(ASSETS / f'{name}-1600.webp', 'WEBP', lossless=True, method=6)
        print(f'{name}: {image.width}×{image.height}; full-size {full.stat().st_size:,} bytes', flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--guide', type=Path)
    group.add_argument('--extracted-guide', type=Path)
    args = parser.parse_args()
    for stamp, name in [('12.20.07', 'admin-today'), ('12.21.15', 'admin-overview'),
                        ('12.22.40', 'admin-frameworks'), ('12.23.40', 'admin-standards')]:
        sources = list(ASSETS.glob(f'Screenshot 2026-11-20 at {stamp}*AM.png'))
        if len(sources) != 1:
            raise ValueError(f'Expected one supplied admin capture for {stamp}, found {len(sources)}')
        prepare(sources[0], name)
    with tempfile.TemporaryDirectory(prefix='orchen-guide-') as temporary:
        directory = args.extracted_guide
        if args.guide:
            directory = Path(temporary)
            subprocess.run(['pdfimages', '-png', str(args.guide), str(directory / 'feature')], check=True)
        # Guide pages 3, 4, 5, and 7; use actual captures without redrawing the UI.
        for index, name in [('001', 'voice-consent'), ('002', 'voice-hands-free'),
                            ('003', 'voice-playback'), ('005', 'voice-mobile')]:
            prepare(directory / f'feature-{index}.png', name)


if __name__ == '__main__':
    main()
