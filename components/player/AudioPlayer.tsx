"use client";

import { ChangeEvent, useRef, useState } from "react";
import {
  FiPause,
  FiPlay,
  FiRotateCcw,
  FiRotateCw,
} from "react-icons/fi";

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
  const [playbackRate, setPlaybackRate] = useState(1);

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

function handleSkip(seconds: number) {
  const audio = audioRef.current;

  if (!audio || !Number.isFinite(audio.duration)) return;

  const newTime = Math.min(
    Math.max(audio.currentTime + seconds, 0),
    audio.duration
  );

  audio.currentTime = newTime;
  setCurrentTime(newTime);
}

function handlePlaybackRateChange(
  event: ChangeEvent<HTMLSelectElement>
) {
  const audio = audioRef.current;
  const newRate = Number(event.target.value);

  if (!audio) return;

  audio.playbackRate = newRate;
  setPlaybackRate(newRate);
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

      <div className="audio-player__controls">
  <button
    className="audio-player__skip"
    type="button"
    onClick={() => handleSkip(-10)}
    aria-label="Go back 10 seconds"
  >
    <FiRotateCcw />
    <span>10</span>
  </button>

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

  <button
    className="audio-player__skip"
    type="button"
    onClick={() => handleSkip(10)}
    aria-label="Go forward 10 seconds"
  >
    <FiRotateCw />
    <span>10</span>
    </button>
    </div>

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

      <label className="audio-player__speed">
  <span className="sr-only">Playback speed</span>

  <select
    value={playbackRate}
    onChange={handlePlaybackRateChange}
    aria-label="Playback speed"
  >
    <option value={0.75}>0.75×</option>
    <option value={1}>1×</option>
    <option value={1.25}>1.25×</option>
    <option value={1.5}>1.5×</option>
    <option value={2}>2×</option>
  </select>
</label>
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