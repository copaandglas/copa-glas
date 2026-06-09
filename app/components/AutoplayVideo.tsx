"use client";

import { useEffect, useRef } from "react";

type AutoplayVideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "autoPlay"> & {
  children?: React.ReactNode;
};

/**
 * Drop-in replacement for <video autoPlay muted playsInline>.
 * Uses an IntersectionObserver to call .play() when the element enters
 * the viewport — fixes Safari desktop which ignores autoPlay for
 * off-screen elements.
 */
export default function AutoplayVideo({ className, children, ...props }: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) video.play().catch(() => {}); },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
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
