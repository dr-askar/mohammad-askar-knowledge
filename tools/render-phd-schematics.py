#!/usr/bin/env python3
"""Render the 41 rights-safe schematic replacement figures as JPEG assets."""
from pathlib import Path
import argparse
import colorsys
from PIL import Image, ImageDraw, ImageFont

parser = argparse.ArgumentParser()
parser.add_argument('--out', required=True)
args = parser.parse_args()
out = Path(args.out)
out.mkdir(parents=True, exist_ok=True)
try:
    font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 22)
    small = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 15)
except OSError:
    font = ImageFont.load_default()
    small = ImageFont.load_default()

for number in range(1, 42):
    hue = ((number * 31) % 360) / 360
    rgb = tuple(round(channel * 255) for channel in colorsys.hsv_to_rgb(hue, .70, .48))
    soft = tuple(round(channel * 255) for channel in colorsys.hsv_to_rgb(hue, .25, .96))
    image = Image.new('RGB', (640, 360), '#f5faf9')
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((24, 24, 616, 336), radius=22, fill='white', outline='#c9dfdc', width=3)
    draw.text((48, 42), f'Abbildung {number}', fill='#12313f', font=font)
    if number <= 24:
        draw.ellipse((130, 90, 510, 290), outline=rgb, width=10, fill=soft)
        draw.arc((180, 115, 460, 265), 180, 360, fill='#087d7c', width=6)
    else:
        draw.rounded_rectangle((100, 90, 540, 270), radius=20, fill=soft, outline=rgb, width=5)
        draw.line((120, 230, 220, 145, 300, 205, 390, 115, 520, 230), fill=rgb, width=10, joint='curve')
        draw.ellipse((204, 129, 236, 161), fill='#087d7c')
    draw.text((48, 306), 'Schematische Ersatzgrafik – Original nicht eingebettet', fill='#587079', font=small)
    image.save(out / f'figure-{number:03d}.jpg', 'JPEG', quality=82, optimize=True, progressive=True)
