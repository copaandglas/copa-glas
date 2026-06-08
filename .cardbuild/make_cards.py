#!/usr/bin/env python3
"""Generate print-ready business card PDFs for Copa + Glas.

Each person gets one PDF with two pages:
  page 1 = FRONT  (centred monogram)
  page 2 = BACK   (contact details, all text in black)

Spec: 85 mm x 55 mm trim, 3 mm bleed, crop marks, embedded fonts.
"""
import os
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.colors import CMYKColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, ".cardfonts")
BUILD = os.path.join(ROOT, ".cardbuild")
OUT = os.path.expanduser("~/Desktop")
os.makedirs(OUT, exist_ok=True)

MM = 72.0 / 25.4  # mm -> pt

# ---- geometry -------------------------------------------------------------
TRIM_W, TRIM_H = 85.0, 55.0
BLEED = 3.0
MARK_MARGIN = 4.0
MARK_LEN = 3.5
OFF = BLEED + MARK_MARGIN            # trim origin offset inside media box
MEDIA_W = TRIM_W + 2 * OFF
MEDIA_H = TRIM_H + 2 * OFF

# ---- colours --------------------------------------------------------------
BLACK = CMYKColor(0, 0, 0, 1)                 # pure K black for all text
STOCK = CMYKColor(0, 0, 0, 0)                 # white card stock
MARKCOL = CMYKColor(0, 0, 0, 1)

# ---- fonts ----------------------------------------------------------------
pdfmetrics.registerFont(TTFont("Garamond-Med", os.path.join(FONTS, "CormorantGaramond-Medium.ttf")))
pdfmetrics.registerFont(TTFont("Garamond-Reg", os.path.join(FONTS, "CormorantGaramond-Regular.ttf")))
pdfmetrics.registerFont(TTFont("Garamond-Light", os.path.join(FONTS, "CormorantGaramond-Light.ttf")))
pdfmetrics.registerFont(TTFont("Sans", os.path.join(FONTS, "Questrial-Regular.ttf")))

SERIF_NAME = "Garamond-Med"
SERIF_BRAND = "Garamond-Reg"
SANS = "Sans"

# ---- monogram prep --------------------------------------------------------
def build_monogram():
    """Trim the monogram to its bbox and output a black-on-transparent PNG."""
    src = os.path.join(ROOT, "copa monogram logo black.png")
    img = Image.open(src).convert("RGBA")
    px = img.load()
    w, h = img.size
    # build alpha from darkness; near-white -> transparent
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = (r + g + b) / 3.0
            if lum < 245 and a > 0:
                alpha = int(255 * (1.0 - lum / 245.0))
                op[x, y] = (0, 0, 0, max(alpha, 0))
    bbox = out.getbbox()
    out = out.crop(bbox)
    path = os.path.join(BUILD, "monogram_black.png")
    out.save(path)
    return path

MONO = build_monogram()
MONO_IMG = Image.open(MONO)
MONO_RATIO = MONO_IMG.width / MONO_IMG.height

# ---- helpers --------------------------------------------------------------
def tx(mm):  # trim x in mm -> media pt
    return (OFF + mm) * MM

def ty(mm):
    return (OFF + mm) * MM

def tracked_width(text, font, size, tracking):
    return pdfmetrics.stringWidth(text, font, size) + tracking * max(len(text) - 1, 0)

def draw_text(c, x_mm, y_mm, text, font, size, tracking=0.0, align="left", color=BLACK):
    x = tx(x_mm)
    if align in ("right", "center"):
        w = tracked_width(text, font, size, tracking)
        x = x - w if align == "right" else x - w / 2.0
    to = c.beginText()
    to.setTextOrigin(x, ty(y_mm))
    to.setFont(font, size)
    to.setFillColor(color)
    to.setCharSpace(tracking)   # always set so spacing never leaks between blocks
    to.textOut(text)
    c.drawText(to)

def draw_monogram(c, cx_mm, cy_mm, h_mm, right_edge_mm=None):
    """Draw monogram centred at (cx,cy); if right_edge_mm given, align its right edge."""
    w_mm = h_mm * MONO_RATIO
    if right_edge_mm is not None:
        x_left = right_edge_mm - w_mm
    else:
        x_left = cx_mm - w_mm / 2.0
    c.drawImage(MONO, tx(x_left), ty(cy_mm - h_mm / 2.0),
                width=w_mm * MM, height=h_mm * MM, mask="auto")

def set_boxes(c):
    """Tag the page with the proper PDF boxes so the RIP knows trim/bleed."""
    bleed = [(OFF - BLEED) * MM, (OFF - BLEED) * MM,
             (OFF + TRIM_W + BLEED) * MM, (OFF + TRIM_H + BLEED) * MM]
    trim = [OFF * MM, OFF * MM, (OFF + TRIM_W) * MM, (OFF + TRIM_H) * MM]
    try:
        c.setTrimBox(trim)
        c.setBleedBox(bleed)
        c.setArtBox(trim)
    except Exception:
        pass

def crop_marks(c):
    c.setStrokeColor(MARKCOL)
    c.setLineWidth(0.25)
    corners = [
        (OFF, OFF, -1, -1),
        (OFF + TRIM_W, OFF, 1, -1),
        (OFF, OFF + TRIM_H, -1, 1),
        (OFF + TRIM_W, OFF + TRIM_H, 1, 1),
    ]
    for x, y, sx, sy in corners:
        # horizontal mark (offset vertically at trim edge), extends outward
        x0 = x + sx * BLEED
        c.line((x0) * MM, y * MM, (x0 + sx * MARK_LEN) * MM, y * MM)
        # vertical mark
        y0 = y + sy * BLEED
        c.line(x * MM, (y0) * MM, x * MM, (y0 + sy * MARK_LEN) * MM)

def background(c):
    c.setFillColor(STOCK)
    # fill the full bleed area
    c.rect((OFF - BLEED) * MM, (OFF - BLEED) * MM,
           (TRIM_W + 2 * BLEED) * MM, (TRIM_H + 2 * BLEED) * MM, stroke=0, fill=1)

# ---- pages ----------------------------------------------------------------
def front_page(c):
    set_boxes(c)
    background(c)
    draw_monogram(c, TRIM_W / 2.0, TRIM_H / 2.0, 24.0)
    crop_marks(c)
    c.showPage()

def back_page(c, name, title, email):
    set_boxes(c)
    background(c)

    LM = 9.0                 # symmetric left margin
    RM = TRIM_W - LM         # = 76mm, symmetric right margin

    # ---- name + role (upper-left) ----
    name_base = 41.0
    draw_text(c, LM, name_base, name, SERIF_NAME, 15)
    draw_text(c, LM, name_base - 4.4, title, SANS, 6.3, tracking=1.5)

    # ---- monogram (upper-right) — vertically centred on the name/role block,
    #      right edge flush with the right margin ----
    block_top = name_base + 3.7          # approx cap height of the name
    block_bot = name_base - 4.4          # role baseline
    mono_cy = (block_top + block_bot) / 2.0
    draw_monogram(c, 0, mono_cy, 11.0, right_edge_mm=RM)

    # ---- contact block (lower-left) ----
    draw_text(c, LM, 22.0, email, SANS, 7.3)
    draw_text(c, LM, 17.8, "studio@copaandglas.com", SANS, 7.3)
    draw_text(c, LM, 13.6, "copaandglas.com", SANS, 7.3)

    # ---- brand lock-up (lower-right), right edge flush with right margin ----
    draw_text(c, RM, 17.8, "Copa + Glas", SERIF_BRAND, 11, align="right")
    draw_text(c, RM, 13.4, "EAST LONDON", SANS, 6.0, tracking=1.6, align="right")

    crop_marks(c)
    c.showPage()

def make_card(filename, name, title, email):
    path = os.path.join(OUT, filename)
    c = canvas.Canvas(path, pagesize=(MEDIA_W * MM, MEDIA_H * MM))
    c.setTitle(f"Copa + Glas business card - {name}")
    c.setAuthor("Copa + Glas")
    front_page(c)
    back_page(c, name, title, email)
    c.save()
    print("wrote", path)

if __name__ == "__main__":
    make_card("copa-glas-business-card-bradley.pdf",
              "Bradley McWhinney", "CREATIVE DIRECTOR", "bradley@copaandglas.com")
    make_card("copa-glas-business-card-anthony.pdf",
              "Anthony McCarty", "MASTER CRAFTSMAN", "anthony@copaandglas.com")
