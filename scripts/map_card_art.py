"""Map category card slots to illustration art filenames."""
from pathlib import Path
import shutil
import json

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "public" / "assets" / "art"
CARDS = ROOT / "public" / "assets" / "cards"

# From lib/categories.ts — illustration id per category index
MAPPING = {
    "colors": ["colors-worksheets", "colors-matching", "colors-fill", "colors-pixel", "colors-how-to-draw", "colors-create", "colors-pair"],
    "connect": ["connect-practice", "connect-easy", "connect-hard", "connect-learn"],
    "mazes": ["mazes-practice", "mazes-easy", "mazes-hard", "mazes-worksheets", "mazes-numbers", "mazes-match", "mazes-shapes"],
    "lines": ["lines-dots", "lines-line", "lines-curve", "lines-practice"],
    "alphabets": ["alpha-cursive", "alpha-letter-match", "alpha-match", "alpha-jigsaw"],
    "numbers": ["num-spelling", "num-worksheets", "num-match", "num-jigsaw"],
    "shapes": ["shapes-learn", "shapes-practice", "shapes-drawings", "shapes-worksheets"],
}

def main():
    ART.mkdir(parents=True, exist_ok=True)
    for cat, illustrations in MAPPING.items():
        for i, ill in enumerate(illustrations):
            slot = CARDS / f"{cat}-{i}.jpg"
            named = CARDS / f"{ill}.jpg"
            art_slot = ART / f"{cat}-{i}.jpg"
            art_named = ART / f"{ill}.jpg"
            src = None
            if art_slot.exists():
                src = art_slot
            elif slot.exists():
                # run inline extract
                from extract_card_art import extract_illustration
                if extract_illustration(slot, art_named):
                    src = art_named
            elif named.exists():
                from extract_card_art import extract_illustration
                extract_illustration(named, art_named)
                src = art_named
            if src and src.exists():
                shutil.copy2(src, art_named)
                print("mapped", ill)

if __name__ == "__main__":
    main()
