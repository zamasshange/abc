"""Re-crop clean card images from home screen captures (no nav bleed)."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SCREENS = ROOT / "public" / "assets" / "screens"
CARDS = ROOT / "public" / "assets" / "cards"
ART = ROOT / "public" / "assets" / "art"

CARD_XS = [0.028, 0.255, 0.482, 0.709]
CARD_W = 0.228
# Nav ends at ~21.5%; cards fill to bottom bar
CARD_Y1 = 0.215
CARD_Y2 = 0.965

CATEGORIES = ["colors", "connect", "mazes", "lines", "alphabets", "numbers", "shapes"]

MAPPING = {
    "colors": ["colors-worksheets", "colors-matching", "colors-fill", "colors-pixel", "colors-how-to-draw", "colors-create", "colors-pair"],
    "connect": ["connect-practice", "connect-easy", "connect-hard", "connect-learn"],
    "mazes": ["mazes-practice", "mazes-easy", "mazes-hard", "mazes-worksheets", "mazes-numbers", "mazes-match", "mazes-shapes"],
    "lines": ["lines-dots", "lines-line", "lines-curve", "lines-practice"],
    "alphabets": ["alpha-cursive", "alpha-letter-match", "alpha-match", "alpha-jigsaw"],
    "numbers": ["num-spelling", "num-worksheets", "num-match", "num-jigsaw"],
    "shapes": ["shapes-learn", "shapes-practice", "shapes-drawings", "shapes-worksheets"],
}


def crop_cards_from_screen(category: str) -> int:
    src = SCREENS / f"home-{category}.jpg"
    if not src.exists():
        print("missing", src)
        return 0
    im = Image.open(src).convert("RGB")
    w, h = im.size
    y1, y2 = int(h * CARD_Y1), int(h * CARD_Y2)
    count = 0
    names = MAPPING.get(category, [])
    for i, x in enumerate(CARD_XS):
        x1, x2 = int(w * x), int(w * (x + CARD_W))
        card = im.crop((x1, y1, x2, y2))
        slot = CARDS / f"{category}-{i}.jpg"
        card.save(slot, quality=96)
        if i < len(names):
            card.save(CARDS / f"{names[i]}.jpg", quality=96)
        count += 1
        print("card", slot.name, card.size)
    return count


def extract_art_from_card(card_path: Path, art_path: Path) -> bool:
    im = Image.open(card_path).convert("RGB")
    arr = im.load()
    w, h = im.size

    footer_y = h
    for y in range(h - 1, int(h * 0.45), -1):
        row = [arr[x, y] for x in range(w // 6, 5 * w // 6, max(1, w // 40))]
        bright = sum(1 for r, g, b in row if r > 160 and g < 140 and b > 120) / len(row)
        green = sum(1 for r, g, b in row if g > 140 and r < 180 and b < 160) / len(row)
        purple = sum(1 for r, g, b in row if r > 130 and b > 130 and g < 200) / len(row)
        yellow = sum(1 for r, g, b in row if r > 200 and g > 180 and b < 120) / len(row)
        if bright > 0.4 or green > 0.4 or purple > 0.4 or yellow > 0.4:
            footer_y = y
            break

    art = im.crop((int(w * 0.08), int(h * 0.04), int(w * 0.92), footer_y))
    if art.height < 30:
        return False
    art.save(art_path, quality=94)
    return True


def main():
    CARDS.mkdir(parents=True, exist_ok=True)
    ART.mkdir(parents=True, exist_ok=True)
    total = 0
    for cat in CATEGORIES:
        total += crop_cards_from_screen(cat)
        names = MAPPING.get(cat, [])
        for i, name in enumerate(names):
            slot = CARDS / f"{cat}-{i}.jpg"
            if slot.exists():
                extract_art_from_card(slot, ART / f"{name}.jpg")
    print("done", total)


if __name__ == "__main__":
    main()
