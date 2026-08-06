"use client";

import { ChangeEvent, useRef, useState } from "react";
import { FiPause, FiPlay } from "react-icons/fi";

interface AudioPlayerProps {
  audioLink: string;
  title: string;
}

export default function AudioPlayer({
  audioLink,
  title,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  async function handlePlayPause() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    } else {
      audio.pause();
    }
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(audio.duration)) return;

    setDuration(audio.duration);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  }

  function handleSeek(event: ChangeEvent<HTMLInputElement>) {
  const audio = audioRef.current;

  if (!audio) return;

  const newTime = Number(event.target.value);

  audio.currentTime = newTime;
  setCurrentTime(newTime);
}

  function handleEnded() {
    setIsPlaying(false);
    setCurrentTime(0);
  }

  function syncDuration() {
  const audio = audioRef.current;

  if (!audio) return;

  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    setDuration(audio.duration);
  }
}

  return (
    <footer className="audio-player">
      <audio
        ref={audioRef}
        src={audioLink}
        preload="metadata"
        onLoadedMetadata={syncDuration}
        onDurationChange={syncDuration}
        onCanPlay={syncDuration}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        />

      <div className="audio-player__book">
        <span className="audio-player__label">Now playing</span>
        <strong>{title}</strong>
      </div>

      <button
        className="audio-player__play"
        type="button"
        onClick={handlePlayPause}
        aria-label={
          isPlaying ? "Pause audiobook" : "Play audiobook"
        }
      >
        {isPlaying ? <FiPause /> : <FiPlay />}
      </button>

      <div className="audio-player__timeline">
        <span className="audio-player__time">
          {formatTime(currentTime)}
        </span>

        <input
        className="audio-player__progress"
        type="range"
        min={0}
        max={duration || 1}
        step={0.1}
        value={Math.min(currentTime, duration || 0)}
        onChange={handleSeek}
        aria-label="Audiobook progress"
        />

        <span className="audio-player__time">
          {formatTime(duration)}
        </span>
      </div>
    </footer>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}