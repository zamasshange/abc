import cv2, os
VIDEO = r"c:\Users\Lenovo\Downloads\abc_preschool\app\game_video2.mp4"
OUT = r"c:\Users\Lenovo\Downloads\abc_preschool\app\scan"
os.makedirs(OUT, exist_ok=True)

def crop_game(frame):
    import numpy as np
    row_std = np.std(frame, axis=(1,2))
    active = np.where(row_std > 15)[0]
    if len(active)==0: return frame
    y1,y2 = int(active[0]), int(active[-1])+1
    band = frame[y1:y2]
    col_std = np.std(band, axis=(0,2))
    ac = np.where(col_std > 10)[0]
    if len(ac)==0: return band
    return band[:, int(ac[0]):int(ac[-1])+1]

cap = cv2.VideoCapture(VIDEO)
for t in range(6, 106):
    cap.set(cv2.CAP_PROP_POS_MSEC, t*1000)
    ret, f = cap.read()
    if ret:
        g = crop_game(f)
        cv2.imwrite(os.path.join(OUT, f"t{t:03d}.jpg"), g)
cap.release()
print('scan done')
