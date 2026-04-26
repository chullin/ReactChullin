/**
 * Tetris Audio Engine using Web Audio API
 * No external files needed - all sounds are synthesized
 */

let ctx: AudioContext | null = null;

const getCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!ctx || ctx.state === 'closed') {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  // Resume if suspended (browser policy)
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
};

const playTone = (
  freq: number,
  startTime: number,
  duration: number,
  type: OscillatorType = 'sine',
  gain: number = 0.15,
  c?: AudioContext
): void => {
  const context = c || getCtx();
  if (!context) return;

  const osc = context.createOscillator();
  const gainNode = context.createGain();
  osc.connect(gainNode);
  gainNode.connect(context.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
};

export const playLanding = () => {
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime;
  playTone(80, t, 0.12, 'square', 0.08, c);
};

export const playClear = (lines: number, combo: number = 0, isMuted: boolean = false) => {
  if (isMuted) return;
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime;

  // Scale pitch with combo
  const comboBoost = Math.min(combo * 0.06, 0.5);

  if (lines === 4) {
    // Tetris! Ascending arpeggio
    const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      playTone(freq * (1 + comboBoost), t + i * 0.06, 0.3, 'sine', 0.18, c);
    });
  } else if (lines === 3) {
    const notes = [523, 659, 784]; // C5 E5 G5
    notes.forEach((freq, i) => {
      playTone(freq * (1 + comboBoost), t + i * 0.07, 0.28, 'sine', 0.16, c);
    });
  } else if (lines === 2) {
    const notes = [523, 659]; // C5 E5
    notes.forEach((freq, i) => {
      playTone(freq * (1 + comboBoost), t + i * 0.08, 0.25, 'sine', 0.15, c);
    });
  } else {
    // Single line
    playTone(523 * (1 + comboBoost), t, 0.2, 'sine', 0.13, c);
  }
};

export const playTSpin = (isMuted: boolean = false) => {
  if (isMuted) return;
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime;
  // Special T-spin "whoosh" + high note
  playTone(200, t, 0.15, 'sawtooth', 0.1, c);
  playTone(800, t + 0.05, 0.25, 'sine', 0.18, c);
  playTone(1200, t + 0.12, 0.2, 'sine', 0.14, c);
};

export const playSpinBonus = (isMuted: boolean = false) => {
  if (isMuted) return;
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime;
  playTone(440, t, 0.1, 'triangle', 0.1, c);
  playTone(660, t + 0.08, 0.15, 'sine', 0.12, c);
};

export const playComboChime = (combo: number, isMuted: boolean = false) => {
  if (isMuted || combo <= 0) return;
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime;
  // Rising pitch with combo count
  const baseFreq = 660;
  const freq = baseFreq * Math.pow(1.1, Math.min(combo - 1, 8));
  playTone(freq, t, 0.12, 'sine', 0.1, c);
};

export const playGameOver = (isMuted: boolean = false) => {
  if (isMuted) return;
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime;
  const notes = [400, 320, 260, 200];
  notes.forEach((freq, i) => {
    playTone(freq, t + i * 0.15, 0.2, 'sawtooth', 0.12, c);
  });
};

export const playWin = (isMuted: boolean = false) => {
  if (isMuted) return;
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime;
  const notes = [523, 659, 784, 1047, 1319];
  notes.forEach((freq, i) => {
    playTone(freq, t + i * 0.08, 0.3, 'sine', 0.15, c);
  });
};

export const playGarbageWarning = (isMuted: boolean = false) => {
  if (isMuted) return;
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime;
  playTone(180, t, 0.08, 'square', 0.06, c);
  playTone(180, t + 0.12, 0.08, 'square', 0.06, c);
};
