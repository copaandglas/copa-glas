"use client";

import { useEffect, useRef } from "react";

type AutoplayVideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "autoPlay"> & {
  children?: React.ReactNode;
};

/**
 * Drop-in replacement for <video autoPlay muted playsInline>.
 *
 * Safari desktop ignores the autoPlay attribute for off-screen elements and
 * can show a play button overlay while the video is buffering. This component
 * handles three scenarios:
 *   1. Video is visible on mount and already has data → play immediately.
 *   2. Video scrolls into view before it has buffered → flag it as visible;
 *      the `canplay` listener fires play() once data arrives.
 *   3. Video has buffered before scrolling into view → observer fires play().
 */
export default function AutoplayVideo({ className, children, ...props }: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let visible = false;

    const tryPlay = () => {
      if (video.paused) video.play().catch(() => {});
    };

    // Once the browser has enough data, play if already in view.
    const onCanPlay = () => { if (visible) tryPlay(); };
    video.addEventListener("canplay", onCanPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          // If the video already has data (readyState HAVE_FUTURE_DATA or higher)
          // play right away; otherwise wait for canplay.
          if (video.readyState >= 3) tryPlay();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    // Also attempt an immediate play on mount — catches videos that are
    // already visible when the component first renders.
    tryPlay();

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={className}
      {...props}
    >
      {children}
    </video>
  );
}
