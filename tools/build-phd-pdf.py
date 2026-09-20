#!/usr/bin/env python3
"""Build the German PhD release PDF from the reviewed translation markdown.

The source PDF is appended unchanged as a separately labelled Arabic facsimile
so figures, tables, maps and source-page context remain fully inspectable.
"""
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "content/phd/translation-de.md"
TEXT_OUT = ROOT / "tmp/pdfs/phd-kc-ai/german-text.pdf"
FINAL_OUT = ROOT / "output/pdf/phd-kc-ai-askar-de.pdf"
ORIGINAL = Path("/Users/test/Downloads/phd_KC_AI_dr_askar.pdf")
TEXT_OUT.parent.mkdir(parents=True, exist_ok=True)
FINAL_OUT.parent.mkdir(parents=True, exist_ok=True)

# Minimal dependency-free PDF writer. The built-in WinAnsi Helvetica encoding
# covers German diacritics and keeps this build reproducible offline.
PAGE_W, PAGE_H = 595, 842
def pdf_text(text):
    text = re.sub(r"\*\*|`", "", text)
    # WinAnsi/Helvetica does not contain Greek or a few Central-European
    # characters occurring in citations. Map those explicitly so the offline
    # release PDF never emits a misleading '?' glyph during QA.
    text = text.translate(str.maketrans({
        "α": "alpha", "β": "beta", "θ": "theta",
        "Ș": "S", "ș": "s", "Ć": "C", "ć": "c",
        "Ł": "L", "ł": "l",
    }))
    # WinAnsi supports en/em dashes and the German diacritics; retain them in
    # the rendered text. Greek comparison symbols are mapped for Helvetica.
    text = text.replace("≥", ">=").replace("≤", "<=")
    return text.encode("cp1252", "replace").replace(b"\\", b"\\\\").replace(b"(", b"\\(").replace(b")", b"\\)").decode("latin1")

def segment_start(path):
    match = re.search(r"translation-s(\d+)", path.name)
    return int(match.group(1)) if match else 10**9

segment_files = [SOURCE] + sorted(
    (ROOT / "content/phd").glob("translation-s*.md"), key=segment_start
)
lines = []
for source_file in segment_files:
    lines.extend(source_file.read_text(encoding="utf-8").splitlines())
render = ["DEUTSCHE ÜBERSETZUNG DER DISSERTATION", "", lines[0].lstrip("# "), "", "Mohammad Askar | Universität Damaskus | Augenheilkunde und Augenchirurgie", "", "HINWEIS: Deutsche Übersetzung mit arabischem Originalfaksimile.", "Nicht amtliche Übersetzung. Wissenschaftliche Arbeit; keine individuelle medizinische Beratung.", ""]
for raw in lines[1:]:
    line = raw.strip()
    if not line:
        render.append("")
    elif line.startswith("#### "):
        render.extend(["", line[5:].upper(), ""])
    elif line.startswith("### "):
        render.extend(["", line[4:].upper(), ""])
    elif line.startswith("## "):
        # Keep the transferred original title page together as a distinct
        # closing page instead of leaving its final study-year line orphaned.
        if line.lower().startswith("## übertragene titelseite"):
            render.extend(["\f", "", line[3:].upper(), ""])
        else:
            render.extend(["", line[3:].upper(), ""])
    elif line.startswith("# "):
        render.extend(["", line[2:].upper(), ""])
    elif line.startswith("```"):
        continue
    else:
        render.append(line)

# The original pages are appended unchanged by qpdf after a clear separator
# page, so every map, diagram, table and Arabic source page remains inspectable.
render.extend(["\f", "", "ANHANG: UNVERÄNDERTES ARABISCHES ORIGINALFAKSIMILE", "", "Die folgenden 196 Seiten sind das unveränderte arabische Originalfaksimile der Dissertation.", "Originalseiten 1–196; zur Gegenprüfung der deutschen Übersetzung.", ""])

pages = []
per_page, max_chars = 46, 92
current = []
for line in render:
    if line == "\f":
        if current and any(item.strip() for item in current):
            pages.append(current)
        current = []
        continue
    # Section headings are rendered at 12 pt; use a shorter line width so
    # long German headings (especially the translated title page) stay inside
    # the A4 text box.
    line_limit = 68 if line.isupper() else max_chars
    while len(line) > line_limit:
        cut = line.rfind(" ", 0, line_limit)
        cut = cut if cut > 20 else line_limit
        current.append(line[:cut]); line = line[cut:].lstrip()
        if len(current) >= per_page:
            pages.append(current); current = []
    current.append(line)
    if len(current) >= per_page:
        pages.append(current); current = []
if current: pages.append(current)

objects = []
def obj(data): objects.append(data); return len(objects)
catalog = obj(None); pages_obj = obj(None); font = obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>")
info = obj(f"<< /Title ({pdf_text('Deutsche Übersetzung der Dissertation von Mohammad Askar')}) /Author ({pdf_text('Mohammad Askar')}) /Subject ({pdf_text('Nicht amtliche Übersetzung mit arabischem Originalfaksimile')}) >>".encode("latin1"))
page_ids = []
for pno, page in enumerate(pages, 1):
    stream = ["BT", "/F1 10 Tf", "54 790 Td", "14 TL"]
    if pno == 1: stream += ["/F1 18 Tf", "0 -28 Td"]
    for i, line in enumerate(page):
        if line.isupper() and len(line) < 100: stream += ["/F1 12 Tf"]
        stream += [f"({pdf_text(line)}) Tj", "0 -14 Td"]
        if line.isupper() and len(line) < 100: stream += ["/F1 10 Tf"]
    stream += ["ET", "BT", "/F1 9 Tf", "280 24 Td", f"({pdf_text(str(pno))}) Tj", "ET"]
    stream_data = "\n".join(stream).encode("latin1")
    sid = obj((f"<< /Length {len(stream_data)} >>\nstream\n".encode() + stream_data + b"\nendstream"))
    pid = obj(None); page_ids.append((pid, sid))
for pid, sid in page_ids:
    objects[pid-1] = f"<< /Type /Page /Parent {pages_obj} 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] /Resources << /Font << /F1 {font} 0 R >> >> /Contents {sid} 0 R >>".encode()
objects[pages_obj-1] = (f"<< /Type /Pages /Kids [{' '.join(f'{pid} 0 R' for pid, _ in page_ids)}] /Count {len(page_ids)} >>").encode()
objects[catalog-1] = f"<< /Type /Catalog /Pages {pages_obj} 0 R >>".encode()
buf = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"); offsets = [0]
for i, data in enumerate(objects, 1):
    offsets.append(len(buf)); buf.extend(f"{i} 0 obj\n".encode()); buf.extend(data); buf.extend(b"\nendobj\n")
xref = len(buf); buf.extend(f"xref\n0 {len(objects)+1}\n0000000000 65535 f \n".encode())
for off in offsets[1:]: buf.extend(f"{off:010d} 00000 n \n".encode())
buf.extend(f"trailer\n<< /Size {len(objects)+1} /Root {catalog} 0 R /Info {info} 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode())
TEXT_OUT.write_bytes(buf)
subprocess.run(["qpdf", "--empty", "--pages", str(TEXT_OUT), str(ORIGINAL), "--", str(FINAL_OUT)], check=True)
print(FINAL_OUT)
