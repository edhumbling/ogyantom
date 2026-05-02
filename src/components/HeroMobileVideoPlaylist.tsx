"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const mobileHeroVideos = [
  "https://ik.imagekit.io/humbling/hero%20vid%20mobile.mp4",
  "https://ik.imagekit.io/humbling/mobile%20hero%20extend",
];

export function HeroMobileVideoPlaylist() {
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
    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePlaybackEligibility = () => {
      setShouldPlay(mobileQuery.matches && !reducedMotionQuery.matches);
    };

    updatePlaybackEligibility();
    mobileQuery.addEventListener("change", updatePlaybackEligibility);
    reducedMotionQuery.addEventListener("change", updatePlaybackEligibility);

    return () => {
      mobileQuery.removeEventListener("change", updatePlaybackEligibility);
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
      className="home-hero-video home-hero-video-mobile"
      autoPlay
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      src={shouldPlay ? mobileHeroVideos[activeVideo] : undefined}
      onEnded={() => {
        setActiveVideo((current) => (current + 1) % mobileHeroVideos.length);
      }}
      onLoadedMetadata={playActiveVideo}
    />
  );
}