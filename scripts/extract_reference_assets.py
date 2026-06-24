from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parents[1]
ref = root / "app" / "abc_preschool1"
layout = json.loads((root / "public/assets/layout.json").read_text())
out_cards = root / "public" / "assets" / "cards"
out_screens = root / "public" / "assets" / "screens"
out_gallery = root / "public" / "assets" / "gallery"
out_activity = root / "public" / "assets" / "activities"
for d in (out_cards, out_screens, out_gallery, out_activity):
    d.mkdir(parents=True, exist_ok=True)

# category -> list of (filename, [card indices to save in order])
HOME_BATCHES = {
    "lines": [("WhatsApp Image 2026-06-24 at 14.16.13.jpeg", [0, 1, 2, 3])],
    "mazes": [
        ("WhatsApp Image 2026-06-24 at 14.15.54 (2).jpeg", [0, 1, 2, 3]),
        ("WhatsApp Image 2026-06-24 at 14.15.54.jpeg", [4, 5, 6, 3]),
    ],
    "shapes": [("WhatsApp Image 2026-06-24 at 14.16.06.jpeg", [0, 1, 2, 3])],
    "colors": [
        ("WhatsApp Image 2026-06-24 at 14.16.02 (2).jpeg", [0, 1, 2, 3]),
        ("WhatsApp Image 2026-06-24 at 14.16.02.jpeg", [4, 5, 6]),
    ],
    "connect": [("WhatsApp Image 2026-06-24 at 14.15.57.jpeg", [0, 1, 2, 3])],
    "alphabets": [("WhatsApp Image 2026-06-24 at 14.16.11.jpeg", [0, 1, 2, 3])],
    "numbers": [("WhatsApp Image 2026-06-24 at 14.16.08.jpeg", [0, 1, 2, 3])],
}

GALLERY_REFS = {
    "alphabet-worksheets": "WhatsApp Image 2026-06-24 at 14.16.10.jpeg",
    "connect-worksheets": "WhatsApp Image 2026-06-24 at 14.15.55 (1).jpeg",
    "pixel-art-pick": "WhatsApp Image 2026-06-24 at 14.16.01.jpeg",
    "shapes-worksheets": "WhatsApp Image 2026-06-24 at 14.15.59.jpeg",
    "printables": "WhatsApp Image 2026-06-24 at 14.16.00.jpeg",
    "lines-worksheets": "WhatsApp Image 2026-06-24 at 14.16.03.jpeg",
    "colors-worksheets": "WhatsApp Image 2026-06-24 at 14.16.02 (3).jpeg",
    "mazes-worksheets": "WhatsApp Image 2026-06-24 at 14.16.02 (4).jpeg",
    "numbers-worksheets": "WhatsApp Image 2026-06-24 at 14.16.07.jpeg",
}

ACTIVITY_REFS = {
    "line-tracing": "WhatsApp Image 2026-06-24 at 14.15.37.jpeg",
    "maze": "WhatsApp Image 2026-06-24 at 14.15.37 (1).jpeg",
    "learn-to-draw": "WhatsApp Image 2026-06-24 at 14.15.57 (2).jpeg",
    "letter-tracing": "WhatsApp Image 2026-06-24 at 14.15.38.jpeg",
    "connect-dots": "WhatsApp Image 2026-06-24 at 14.15.54 (3).jpeg",
    "letter-match": "WhatsApp Image 2026-06-24 at 14.16.09.jpeg",
    "matching": "WhatsApp Image 2026-06-24 at 14.16.02 (3).jpeg",
}


def crop_card(im: Image.Image, slot: int) -> Image.Image:
    w, h = im.size
    card = layout["categories"]["lines"]["cards"][slot]
    x0 = int(card["x"] * w)
    y0 = int(card["y"] * h)
    x1 = int((card["x"] + card["w"]) * w)
    y1 = int((card["y"] + card["h"]) * h)
    return im.crop((x0, y0, x1, y1))


def main() -> None:
    for cat, batches in HOME_BATCHES.items():
        home_src = ref / batches[0][0]
        if home_src.exists():
            Image.open(home_src).convert("RGB").save(out_screens / f"home-{cat}.jpg", quality=92)

        for fname, indices in batches:
            src = ref / fname
            if not src.exists():
                print("MISSING", fname)
                continue
            im = Image.open(src).convert("RGB")
            for slot, out_idx in enumerate(indices):
                crop = crop_card(im, slot)
                crop.save(out_cards / f"{cat}-{out_idx}.jpg", quality=92)
                print(f"saved {cat}-{out_idx}.jpg from {fname} slot {slot}")

    for gid, fname in GALLERY_REFS.items():
        src = ref / fname
        if src.exists():
            Image.open(src).convert("RGB").save(out_gallery / f"{gid}.jpg", quality=92)
            print("gallery", gid)

    for aid, fname in ACTIVITY_REFS.items():
        src = ref / fname
        if src.exists():
            Image.open(src).convert("RGB").save(out_activity / f"{aid}.jpg", quality=92)
            print("activity", aid)


if __name__ == "__main__":
    main()
