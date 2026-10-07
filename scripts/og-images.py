"""Make the 1200x630 link-preview copies (static/img/og) that the built pages point to.

Run after `npm run build`: it reads each prerendered page's og:image, and for every
/img/og/<path with / as __> that is missing, crops the original photo to 1200x630.
"""

import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PAGES = ROOT / '.svelte-kit' / 'output' / 'prerendered' / 'pages'
STATIC = ROOT / 'static'
OUT = STATIC / 'img' / 'og'
SIZE = (1200, 630)

if not PAGES.exists():
    sys.exit('No prerendered pages — run `npm run build` first.')

wanted = set()
for html in PAGES.rglob('*.html'):
    for m in re.finditer(r'property="og:image" content="[^"]*/img/og/([^"]+)"', html.read_text('utf-8')):
        wanted.add(m.group(1))

OUT.mkdir(parents=True, exist_ok=True)
for name in sorted(wanted):
    dest = OUT / name
    if dest.exists():
        continue
    src = STATIC / name.replace('__', '/')
    if not src.exists():
        print(f'missing source: {src}')
        continue
    img = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
    ImageOps.fit(img, SIZE, Image.LANCZOS).save(dest, 'JPEG', quality=72, optimize=True, progressive=True)
    print(f'{dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB')

for stale in sorted(set(p.name for p in OUT.glob('*.jpg')) - wanted):
    print(f'unused: {stale}')
