"""Extract illustration-only crops from card images (no footer, no ads)."""
from pathlib import Path
from PIL import Image
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
CARDS = ROOT / "public" / "assets" / "cards"
ART = ROOT / "public" / "assets" / "art"
ART.mkdir(parents=True, exist_ok=True)


def is_white(rgb: tuple[int, int, int]) -> bool:
    r, g, b = rgb
    return r > 230 and g > 230 and b > 230


def is_border(rgb: tuple[int, int, int]) -> bool:
    r, g, b = rgb
    if is_pink(rgb):
        return True
    if r > 140 and b > 140 and g < 200:
        return True
    if r > 200 and g > 170 and b < 120:
        return True
    if g > 150 and r < 180 and b < 150:
        return True
    return False


def trim_border_columns(art: np.ndarray) -> np.ndarray:
    h, w = art.shape[:2]
    left, right = 0, w - 1
    for x in range(w):
        col = art[:, x]
        white_ratio = sum(is_white(tuple(px)) for px in col[::4]) / max(len(col[::4]), 1)
        if white_ratio > 0.35:
            left = x
            break
    for x in range(w - 1, -1, -1):
        col = art[:, x]
        white_ratio = sum(is_white(tuple(px)) for px in col[::4]) / max(len(col[::4]), 1)
        if white_ratio > 0.35:
            right = x
            break
    if right > left + 10:
        return art[:, left : right + 1]
    return art


def extract_illustration(src: Path, dest: Path) -> bool:
    im = Image.open(src).convert("RGB")
    arr = np.array(im)
    h, w = arr.shape[:2]

    footer_start = h
    for y in range(h - 1, int(h * 0.4), -1):
        row = arr[y, w // 4 : 3 * w // 4]
        pink_ratio = sum(is_pink(tuple(px)) for px in row[::4]) / max(len(row[::4]), 1)
        if pink_ratio > 0.35:
            footer_start = y
            break

    body = arr[:footer_start]
    bh = body.shape[0]

    header_end = 0
    for y in range(min(int(bh * 0.35), bh)):
        row = body[y]
        green_ratio = sum(px[1] > px[0] and px[1] > px[2] and px[1] > 120 for px in row[::6]) / max(
            len(row[::6]), 1
        )
        purple_ratio = sum(px[0] > 140 and px[2] > 140 for px in row[::6]) / max(len(row[::6]), 1)
        if green_ratio > 0.25 or purple_ratio > 0.2:
            header_end = y + 1
        elif header_end > 0 and green_ratio < 0.1:
            break

    art = body[header_end:footer_start]
    art = trim_border_columns(art)
    if art.shape[0] < 20 or art.shape[1] < 20:
        return False

    out = Image.fromarray(art)
    out.save(dest, quality=92)
    return True


def main() -> None:
    count = 0
    for src in sorted(CARDS.glob("*.jpg")):
        dest = ART / src.name
        if extract_illustration(src, dest):
            count += 1
            print("art", dest.name)
    print("extracted", count)


if __name__ == "__main__":
    main()
