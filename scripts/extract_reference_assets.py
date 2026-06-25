"""Extract pixel-perfect card images from abc_preschool1 reference photos."""
from __future__ import annotations

from pathlib import Path
from PIL import Image
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
REF = ROOT / "app" / "abc_preschool1"
OUT_CARDS = ROOT / "public" / "assets" / "cards"
OUT_SCREENS = ROOT / "public" / "assets" / "screens"
OUT_NAV = ROOT / "public" / "assets" / "nav"

# Nav strip height on reference 1600×720 screenshots
NAV_BOTTOM_RATIO = 153 / 720

NAV_SOURCES: dict[str, str] = {
    "lines": "WhatsApp Image 2026-06-24 at 15.33.11 (2).jpeg",
    "shapes": "WhatsApp Image 2026-06-24 at 15.33.03 (2).jpeg",
    "connect": "WhatsApp Image 2026-06-24 at 15.33.02 (1).jpeg",
    "mazes": "WhatsApp Image 2026-06-24 at 15.33.01 (3).jpeg",
    "alphabets": "WhatsApp Image 2026-06-24 at 15.33.05.jpeg",
    "numbers": "WhatsApp Image 2026-06-24 at 15.33.03 (3).jpeg",
    "colors": "WhatsApp Image 2026-06-24 at 15.33.02 (2).jpeg",
}

# Normalized [x1, y1, x2, y2] for 1600×720 reference screenshots
CARD_SLOTS = [
    (0.049, 0.219, 0.260, 0.979),
    (0.290, 0.219, 0.501, 0.979),
    (0.531, 0.219, 0.741, 0.979),
    (0.771, 0.219, 0.982, 0.979),
]

HOME_BATCHES: dict[str, list[tuple[str, list[tuple[int, int]]]]] = {
    "lines": [("WhatsApp Image 2026-06-24 at 15.33.11 (2).jpeg", [(0, 0), (1, 1), (2, 2), (3, 3)])],
    "shapes": [("WhatsApp Image 2026-06-24 at 15.33.03 (2).jpeg", [(0, 0), (1, 1), (2, 2), (3, 3)])],
    "connect": [
        ("WhatsApp Image 2026-06-24 at 15.33.02 (1).jpeg", [(0, 0), (1, 1), (2, 2), (3, 3)]),
        ("WhatsApp Image 2026-06-24 at 15.33.02.jpeg", [(4, 2), (5, 3)]),
    ],
    "mazes": [
        ("WhatsApp Image 2026-06-24 at 15.33.01 (3).jpeg", [(0, 0), (1, 1), (2, 2), (3, 3)]),
        ("WhatsApp Image 2026-06-24 at 15.33.01 (2).jpeg", [(4, 0), (5, 1), (6, 2)]),
    ],
    "alphabets": [("WhatsApp Image 2026-06-24 at 15.33.05.jpeg", [(0, 0), (1, 1), (2, 2), (3, 3)])],
    "numbers": [("WhatsApp Image 2026-06-24 at 15.33.03 (3).jpeg", [(0, 0), (1, 1), (2, 2), (3, 3)])],
    "colors": [
        ("WhatsApp Image 2026-06-24 at 15.33.02 (2).jpeg", [(4, 0), (5, 1), (6, 2)]),
    ],
}

ABCDOC_COLORS_HOME = ROOT / "app" / "abcdoc_pages" / "page_02.png"

# Activity card only — strip column header above each card in the slot crop
CARD_ART_TOP = 0.367


# Display size at 1600×720 reference canvas
TARGET_CARD_W = 338
TARGET_CARD_H = 526
FOOTER_RATIO = 0.22
TARGET_ART_H = TARGET_CARD_H - round(TARGET_CARD_W * FOOTER_RATIO)


def crop_card_raw(slot_im: Image.Image) -> Image.Image:
    w, h = slot_im.size
    top = int(h * CARD_ART_TOP)
    return slot_im.crop((0, top, w, h))


def crop_card_art(slot_im: Image.Image) -> Image.Image:
    raw = crop_card_raw(slot_im)
    return raw.resize((TARGET_CARD_W, TARGET_CARD_H), Image.LANCZOS)


def extract_art_only(raw: Image.Image) -> Image.Image:
    w, h = raw.size
    footer_h = max(1, int(h * FOOTER_RATIO))
    art = raw.crop((0, 0, w, h - footer_h))
    return art.resize((TARGET_CARD_W, TARGET_ART_H), Image.LANCZOS)


def save_card(card: Image.Image, dest: Path) -> None:
    card.save(dest, quality=96)
    w2, h2 = card.size[0] * 2, card.size[1] * 2
    card.resize((w2, h2), Image.LANCZOS).save(
        dest.with_name(f"{dest.stem}@2x{dest.suffix}"),
        quality=94,
    )


def save_card_bundle(raw: Image.Image, category: str, idx: int) -> None:
    full = raw.resize((TARGET_CARD_W, TARGET_CARD_H), Image.LANCZOS)
    art = extract_art_only(raw)
    save_card(full, OUT_CARDS / f"{category}-{idx}.jpg")
    save_card(art, OUT_CARDS / f"{category}-{idx}-art.jpg")


def normalize_card(im: Image.Image) -> Image.Image:
    return crop_card_art(im)


BORDER_DETECTORS = {
    "lines": lambda p: p[0] > 200 and p[1] < 140 and p[2] > 150,
    "shapes": lambda p: p[1] > 150 and p[0] < 120 and p[2] < 120,
    "connect": lambda p: p[0] > 200 and p[1] > 160 and p[2] < 140,
    "mazes": lambda p: p[0] > 200 and p[1] < 130 and p[2] < 130,
    "alphabets": lambda p: p[0] > 150 and p[1] < 130 and p[2] < 110,
    "numbers": lambda p: p[2] > 180 and p[0] < 150 and p[1] > 150,
    "colors": lambda p: p[0] > 130 and p[2] > 130 and p[1] < 200,
}


def trim_to_card_chrome(im: Image.Image, border_fn) -> Image.Image:
    arr = np.array(im)
    h, w = arr.shape[:2]

    def row_border_ratio(y: int) -> float:
        row = arr[y]
        return sum(1 for p in row if border_fn(tuple(int(v) for v in p))) / w

    def is_card_top(y: int) -> bool:
        left = arr[y, : max(4, w // 20)]
        right = arr[y, w - max(4, w // 20) :]
        left_hit = sum(1 for p in left if border_fn(tuple(int(v) for v in p))) / len(left)
        right_hit = sum(1 for p in right if border_fn(tuple(int(v) for v in p))) / len(right)
        return left_hit > 0.3 and right_hit > 0.3

    top = 0
    for y in range(h):
        if is_card_top(y):
            top = y
            break
        if row_border_ratio(y) > 0.2:
            top = y
            break

    bottom = h - 1
    for y in range(h - 1, top, -1):
        if row_border_ratio(y) > 0.12:
            bottom = y
            break

    if bottom - top < h * 0.35:
        return im
    return im.crop((0, top, w, bottom + 1))


def crop_slot(im: Image.Image, slot: int) -> Image.Image:
    w, h = im.size
    x1, y1, x2, y2 = CARD_SLOTS[slot]
    return im.crop((int(w * x1), int(h * y1), int(w * x2), int(h * y2)))


def crop_from_video_screen(category: str, indices: list[int]) -> int:
    src = OUT_SCREENS / f"home-{category}.jpg"
    if not src.exists():
        return 0
    im = Image.open(src).convert("RGB")
    border_fn = BORDER_DETECTORS[category]
    saved = 0
    for out_idx, slot in enumerate(indices):
        if slot >= len(CARD_SLOTS):
            break
        raw = crop_card_raw(crop_slot(im, slot))
        save_card_bundle(raw, category, out_idx)
        saved += 1
    return saved


def extract_nav_strips() -> None:
    OUT_NAV.mkdir(parents=True, exist_ok=True)
    for category, fname in NAV_SOURCES.items():
        src = REF / fname
        if not src.exists():
            print("MISSING nav", fname)
            continue
        im = Image.open(src).convert("RGB")
        w, h = im.size
        nav_h = int(h * NAV_BOTTOM_RATIO)
        nav = im.crop((0, 0, w, nav_h))
        dest = OUT_NAV / f"nav-full-{category}.jpg"
        nav.save(dest, quality=96)
        nav.resize((w * 2, nav_h * 2), Image.LANCZOS).save(
            dest.with_name(f"nav-full-{category}@2x.jpg"),
            quality=94,
        )
        print("saved nav", dest.name, nav.size)


def main() -> None:
    OUT_CARDS.mkdir(parents=True, exist_ok=True)
    OUT_SCREENS.mkdir(parents=True, exist_ok=True)
    extract_nav_strips()

    for category, batches in HOME_BATCHES.items():
        border_fn = BORDER_DETECTORS[category]
        for fname, mappings in batches:
            src = REF / fname
            if not src.exists():
                print("MISSING", fname)
                continue
            im = Image.open(src).convert("RGB")
            if mappings[0][0] == 0:
                im.save(OUT_SCREENS / f"home-{category}.jpg", quality=92)

            for out_idx, slot in mappings:
                if slot >= len(CARD_SLOTS):
                    continue
                raw = crop_card_raw(crop_slot(im, slot))
                save_card_bundle(raw, category, out_idx)
                print("saved", dest.name, card.size)

        if category == "colors":
            extract_colors_first_batch(border_fn)


def extract_colors_first_batch(border_fn) -> None:
    """Colors home row 1: Worksheets, Matching, Fill, Pixel Art."""
    panel = None
    if ABCDOC_COLORS_HOME.exists():
        page = Image.open(ABCDOC_COLORS_HOME).convert("RGB")
        arr = np.array(page)
        h, w = arr.shape[:2]
        # Embedded 1600×720 screenshot inside the doc collage (not the full page crop)
        nav_y = next(
            (y for y in range(h) if arr[y, w // 2][0] > 150 and arr[y, w // 2][1] < 130 and arr[y, w // 2][2] > 180),
            147,
        )
        panel_bottom = next(
            (
                y
                for y in range(nav_y + 40, min(h, nav_y + 500))
                if arr[y, w // 2][0] > 240 and arr[y, w // 2][1] > 240 and arr[y, w // 2][2] > 240
            ),
            nav_y + 407,
        )
        row = arr[nav_y]
        xs = [x for x in range(w) if not (row[x][0] > 250 and row[x][1] > 250 and row[x][2] > 250)]
        if xs:
            panel = page.crop((min(xs), nav_y, max(xs) + 1, panel_bottom))
            panel = panel.resize((1600, 720), Image.LANCZOS)

    if panel is None:
        crop_from_video_screen("colors", [0, 1, 2, 3])
        return

    panel.save(OUT_SCREENS / "home-colors.jpg", quality=92)
    for out_idx, slot in enumerate(range(4)):
        raw = crop_card_raw(crop_slot(panel, slot))
        save_card_bundle(raw, "colors", out_idx)
        print("saved colors-", out_idx, card.size, "from abcdoc panel")


if __name__ == "__main__":
    main()
