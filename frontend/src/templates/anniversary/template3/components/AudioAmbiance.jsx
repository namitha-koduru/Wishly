import React, { useState, useEffect, useRef } from 'react';

/**
 * Procedural romantic harmonic ambiance using Web Audio API.
 * Plays a gentle, lush piano & warm pad harmony (Key of E-Major / B-Major romantic chords).
 */
export function AudioAmbiance() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  const startMusic = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Chords progression: E maj9 -> C#m7 -> A maj7 -> B sus4
      const chords = [
        [164.81, 246.94, 329.63, 392.00, 493.88], // E maj9
        [138.59, 207.65, 277.18, 329.63, 415.30], // C#m7
        [110.00, 164.81, 220.00, 277.18, 329.63], // A maj7
        [123.47, 185.00, 246.94, 329.63, 370.00]  // B sus4
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!ctx || ctx.state === 'closed') return;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          // Warm sine/triangle for piano-like bell harmonics
          osc.type = i === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

          // Envelope
          gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.06 / (i + 1), ctx.currentTime + i * 0.08 + 0.5);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(ctx.currentTime + i * 0.08);
          osc.stop(ctx.currentTime + 4.0);
        });
      };

      playChord();
      intervalRef.current = setInterval(playChord, 3800);
      setIsPlaying(true);
    } catch (err) {
      console.warn("Web Audio Ambiance:", err);
    }
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <button
      type="button"
      className={`romantic-music-toggle ${isPlaying ? 'playing' : ''}`}
      onClick={toggleMusic}
      aria-label={isPlaying ? 'Pause romantic ambiance music' : 'Play romantic ambiance music'}
      title={isPlaying ? 'Mute Music' : 'Play Romantic Music'}
    >
      <span className="music-icon">
        {isPlaying ? (
          <span className="equalizer-bars">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </span>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        )}
      </span>
      <span className="music-label">{isPlaying ? 'Playing Melody' : 'Music Ambiance'}</span>
    </button>
  );
}

export default AudioAmbiance;
