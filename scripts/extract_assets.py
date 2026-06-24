"""Extract UI assets from game_video2.mp4 for pixel-perfect clone."""
import cv2
import os
import json
import numpy as np

VIDEO = r"c:\Users\Lenovo\Downloads\abc_preschool\app\game_video2.mp4"
OUT = r"c:\Users\Lenovo\Downloads\abc_preschool\public\assets"

# Verified timestamps from frame-by-frame scan
HOME_CAPTURES = {
    "lines": 20,
    "alphabets": 96,
    "numbers": 100,
    "shapes": 104,
    "mazes": 92,
    "connect": 90,
    "colors": 86,
}

CARD_XS = [0.028, 0.255, 0.482, 0.709]
CARD_W = 0.228
CARD_Y1 = 0.215
CARD_Y2 = 0.96


def ensure_dirs():
    for sub in ["cards", "screens", "nav", "ui"]:
        os.makedirs(os.path.join(OUT, sub), exist_ok=True)


def find_game_region(frame):
    row_std = np.std(frame, axis=(1, 2))
    active = row_std > 15
    indices = np.where(active)[0]
    if len(indices) == 0:
        return frame
    y1, y2 = int(indices[0]), int(indices[-1]) + 1
    band = frame[y1:y2]
    col_std = np.std(band, axis=(0, 2))
    active_c = np.where(col_std > 10)[0]
    if len(active_c) == 0:
        return band
    return band[:, int(active_c[0]) : int(active_c[-1]) + 1]


def extract_home(cap, category: str, t: int):
    cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000)
    ret, frame = cap.read()
    if not ret:
        return None
    game = find_game_region(frame)
    h, w = game.shape[:2]

    screen_path = os.path.join(OUT, "screens", f"home-{category}.jpg")
    cv2.imwrite(screen_path, game, [cv2.IMWRITE_JPEG_QUALITY, 97])

    y1, y2 = int(h * CARD_Y1), int(h * CARD_Y2)
    cards = []
    for i, x in enumerate(CARD_XS):
        x1, x2 = int(w * x), int(w * (x + CARD_W))
        card = game[y1:y2, x1:x2]
        rel = f"cards/{category}-{i}.jpg"
        cv2.imwrite(os.path.join(OUT, rel), card, [cv2.IMWRITE_JPEG_QUALITY, 97])
        cards.append({
            "index": i,
            "x": x,
            "y": CARD_Y1,
            "w": CARD_W,
            "h": CARD_Y2 - CARD_Y1,
            "file": f"/assets/{rel}",
        })

    return {"category": category, "t": t, "w": w, "h": h, "cards": cards}


def extract_screen(cap, t: int, name: str):
    cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000)
    ret, frame = cap.read()
    if ret:
        game = find_game_region(frame)
        cv2.imwrite(os.path.join(OUT, "screens", f"{name}.jpg"), game, [cv2.IMWRITE_JPEG_QUALITY, 97])


def main():
    ensure_dirs()
    cap = cv2.VideoCapture(VIDEO)
    meta = {
        "aspect": "landscape",
        "gameAspect": 864 / 388,
        "nav": {
            "row1": {"y": 0, "h": 0.112, "tabs": [
                {"id": "lang", "x": 0, "w": 0.118, "action": "language"},
                {"id": "colors", "x": 0.118, "w": 0.196},
                {"id": "connect", "x": 0.314, "w": 0.196},
                {"id": "mazes", "x": 0.51, "w": 0.196},
                {"id": "shop", "x": 0.882, "w": 0.118, "action": "shop"},
            ]},
            "row2": {"y": 0.112, "h": 0.103, "tabs": [
                {"id": "lines", "x": 0, "w": 0.25},
                {"id": "alphabets", "x": 0.25, "w": 0.25},
                {"id": "numbers", "x": 0.5, "w": 0.25},
                {"id": "shapes", "x": 0.75, "w": 0.25},
            ]},
        },
        "categories": {},
    }

    for cat, t in HOME_CAPTURES.items():
        m = extract_home(cap, cat, t)
        if m:
            meta["categories"][cat] = m
            print(f"OK {cat} @ {t}s")

    extract_screen(cap, 0, "splash-loading")
    extract_screen(cap, 5, "splash-panda")
    extract_screen(cap, 30, "worksheets")
    extract_screen(cap, 40, "drawing")
    extract_screen(cap, 65, "exit-dialog")

    # toolbar slices from drawing frame
    cap.set(cv2.CAP_PROP_POS_MSEC, 40000)
    ret, frame = cap.read()
    if ret:
        game = find_game_region(frame)
        h, w = game.shape[:2]
        lw = int(w * 0.14)
        cv2.imwrite(os.path.join(OUT, "ui", "toolbar-left.jpg"), game[:, :lw], [cv2.IMWRITE_JPEG_QUALITY, 97])
        cv2.imwrite(os.path.join(OUT, "ui", "toolbar-right.jpg"), game[:, w - lw :], [cv2.IMWRITE_JPEG_QUALITY, 97])
        cv2.imwrite(os.path.join(OUT, "ui", "canvas-bg.jpg"), game[:, lw : w - lw], [cv2.IMWRITE_JPEG_QUALITY, 97])

    cap.release()
    with open(os.path.join(OUT, "layout.json"), "w") as f:
        json.dump(meta, f, indent=2)
    print("done")


if __name__ == "__main__":
    main()
