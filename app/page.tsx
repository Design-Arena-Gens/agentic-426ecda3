'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface Sound {
  id: string;
  name: string;
  emoji: string;
  frequency: number;
  type: OscillatorType;
  duration: number;
}

const sounds: Sound[] = [
  { id: 'beep', name: 'Beep', emoji: '🔊', frequency: 440, type: 'sine', duration: 200 },
  { id: 'boop', name: 'Boop', emoji: '🎵', frequency: 330, type: 'sine', duration: 150 },
  { id: 'buzz', name: 'Buzz', emoji: '🐝', frequency: 200, type: 'sawtooth', duration: 300 },
  { id: 'ding', name: 'Ding', emoji: '🔔', frequency: 800, type: 'sine', duration: 400 },
  { id: 'whoosh', name: 'Whoosh', emoji: '💨', frequency: 100, type: 'sine', duration: 500 },
  { id: 'zap', name: 'Zap', emoji: '⚡', frequency: 1000, type: 'square', duration: 100 },
  { id: 'blip', name: 'Blip', emoji: '✨', frequency: 600, type: 'triangle', duration: 80 },
  { id: 'horn', name: 'Horn', emoji: '📯', frequency: 220, type: 'square', duration: 400 },
  { id: 'alarm', name: 'Alarm', emoji: '🚨', frequency: 880, type: 'square', duration: 200 },
  { id: 'chime', name: 'Chime', emoji: '🎐', frequency: 523, type: 'sine', duration: 600 },
  { id: 'drum', name: 'Drum', emoji: '🥁', frequency: 100, type: 'sawtooth', duration: 150 },
  { id: 'laser', name: 'Laser', emoji: '🔫', frequency: 1500, type: 'sawtooth', duration: 250 },
];

export default function Home() {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const playSound = (sound: Sound) => {
    setActiveSound(sound.id);

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = sound.frequency;
    oscillator.type = sound.type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration / 1000);

    setTimeout(() => {
      setActiveSound(null);
      audioContext.close();
    }, sound.duration);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>🎧 Sound Board</h1>
      <p className={styles.subtitle}>Click any button to play a sound</p>

      <div className={styles.grid}>
        {sounds.map((sound) => (
          <button
            key={sound.id}
            className={`${styles.soundButton} ${activeSound === sound.id ? styles.active : ''}`}
            onClick={() => playSound(sound)}
            disabled={activeSound === sound.id}
          >
            <span className={styles.emoji}>{sound.emoji}</span>
            <span className={styles.name}>{sound.name}</span>
          </button>
        ))}
      </div>

      <footer className={styles.footer}>
        <p>Sounds generated using Web Audio API</p>
      </footer>
    </main>
  );
}
