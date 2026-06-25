/** Child-friendly audio feedback — Web Speech + simple tones */

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function tone(freq: number, duration: number, type: OscillatorType = "sine", gain = 0.08) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.stop(ctx.currentTime + duration);
}

export function playTapSound() {
  tone(520, 0.06, "triangle", 0.06);
}

export function playSuccessSound() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  [523, 659, 784].forEach((f, i) => {
    setTimeout(() => tone(f, 0.18, "sine", 0.1), i * 120);
  });
}

export function playCheerSound() {
  playSuccessSound();
  setTimeout(() => tone(988, 0.25, "triangle", 0.09), 360);
}

export function speak(text: string, rate = 0.82): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = 1.05;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

export async function speakLetter(char: string) {
  await speak(char.length === 1 ? char : char);
}

export async function speakPhonicsLesson(letter: string) {
  const upper = letter.toUpperCase();
  const entry = await import("./phonics").then((m) => m.getPhonics(upper));
  await speak(upper);
  if (entry) {
    await new Promise((r) => setTimeout(r, 350));
    await speak(`${upper} is for ${entry.word}`);
  }
}

export async function speakNumberLesson(num: string) {
  const data = await import("./phonics").then((m) => m.getNumberPhonics(num));
  await speak(num);
  await new Promise((r) => setTimeout(r, 300));
  await speak(data.word);
}

export const ENCOURAGEMENTS = [
  "Great Job!",
  "Awesome!",
  "Well Done!",
  "Excellent!",
  "Super Star!",
  "Amazing!",
] as const;

export function randomEncouragement() {
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}
