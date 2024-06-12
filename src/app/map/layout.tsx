"use client";
import MapLayoutMenu from "@/components/layout/MapLayoutMenu";
import { useRef } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  const mapFullScreenRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mapFullScreenRef} className="flex flex-col h-screen">
      <MapLayoutMenu mapFullScreenRef={mapFullScreenRef}/>
      {children}
    </div>
  );
}
