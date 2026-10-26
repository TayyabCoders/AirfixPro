from PIL import Image
from pathlib import Path

src = Path("public/brand/airfixpro-logo-source.jpg")
img = Image.open(src).convert("RGBA")
pixels = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if r >= 235 and g >= 235 and b >= 235:
            pixels[x, y] = (r, g, b, 0)
        elif r >= 220 and g >= 225 and b >= 230 and abs(r - g) < 20 and abs(g - b) < 20:
            brightness = (r + g + b) / 3
            alpha = int(max(0, min(255, (245 - brightness) * 8)))
            pixels[x, y] = (r, g, b, alpha)

bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

out = Path("public/brand/airfixpro-logo.png")
img.save(out, "PNG", optimize=True)
print(f"saved {out} size={img.size} bytes={out.stat().st_size}")
img.save("public/brand/logo.png", "PNG", optimize=True)
print("also wrote public/brand/logo.png")
