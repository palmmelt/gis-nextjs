"use client";
import MapLayoutMenu from "@/components/layout/MapLayoutMenu";
import type { Metadata } from "next";
import { useRef } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (appRef.current) {
        const element = appRef.current as any;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          /* Firefox */
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          /* Chrome, Safari & Opera */
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          /* IE/Edge */
          element.msRequestFullscreen();
        }
      }
    } else {
      const element = appRef.current as any;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (element.webkitExitFullscreen) {
        /* Chrome, Safari & Opera */
        element.webkitExitFullscreen();
      } else if (element.msExitFullscreen) {
        /* IE/Edge */
        element.msExitFullscreen();
      }
    }
  };

  return (
    <div ref={appRef} className="flex flex-col h-screen">
      <MapLayoutMenu fullScreenAction={toggleFullscreen} />
      {children}
    </div>
  );
}
