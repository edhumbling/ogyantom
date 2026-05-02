"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const desktopHeroVideos = [
  "https://ik.imagekit.io/humbling/hero%20video.mp4",
  "https://ik.imagekit.io/humbling/hero%20wide%20desktop.mp4",
];

export function HeroDesktopVideoPlaylist() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [shouldPlay, setShouldPlay] = useState(false);

  const playActiveVideo = useCallback(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.play().catch(() => {
      // Muted autoplay can still be blocked by browser or user settings.
    });
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePlaybackEligibility = () => {
      setShouldPlay(desktopQuery.matches && !reducedMotionQuery.matches);
    };

    updatePlaybackEligibility();
    desktopQuery.addEventListener("change", updatePlaybackEligibility);
    reducedMotionQuery.addEventListener("change", updatePlaybackEligibility);

    return () => {
      desktopQuery.removeEventListener("change", updatePlaybackEligibility);
      reducedMotionQuery.removeEventListener("change", updatePlaybackEligibility);
    };
  }, []);

  useEffect(() => {
    if (!shouldPlay) {
      videoRef.current?.pause();
      return;
    }

    playActiveVideo();
  }, [activeVideo, playActiveVideo, shouldPlay]);

  return (
    <video
      ref={videoRef}
      className="home-hero-video home-hero-video-desktop"
      autoPlay
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      src={shouldPlay ? desktopHeroVideos[activeVideo] : undefined}
      onEnded={() => {
        setActiveVideo((current) => (current + 1) % desktopHeroVideos.length);
      }}
      onLoadedMetadata={playActiveVideo}
    />
  );
}
