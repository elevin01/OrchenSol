"""Generate homepage delivery assets with Pillow; retain original source files."""
from pathlib import Path
from PIL import Image

ASSETS = Path(__file__).resolve().parents[1] / "assets"


def save_variant(source, stem, width=None, lossless=False):
    with Image.open(ASSETS / source) as original:
        image = original.copy()
        if width:
            image = image.resize(
                (width, round(image.height * width / image.width)),
                Image.Resampling.LANCZOS,
            )
        output = ASSETS / f"{stem}.webp"
        image.save(output, "WEBP", lossless=lossless, quality=90, method=6, exact=True)
        if lossless:
            with Image.open(output) as decoded:
                assert decoded.convert("RGBA").tobytes() == image.convert("RGBA").tobytes()
        print(f"{output.name}: {output.stat().st_size:,} bytes")


for width in (480, 768, 1254):
    save_variant(
        "orchen-dashboard-montage.png", f"montage-lossless-{width}",
        width if width != 1254 else None, lossless=True,
    )

# Only mobile sources use resized hero images. Desktop retains the original files.
for source, stem in (
    ("mit-brain-scan.webp", "hero-mit-mobile"),
    ("npr-brookings.webp", "hero-npr-mobile"),
):
    for width in (640, 960):
        save_variant(source, f"{stem}-{width}", width)
