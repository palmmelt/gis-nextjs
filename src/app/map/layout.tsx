"use client";
import MapLayoutMenu from "@/components/layout/MapLayoutMenu";
import { useRef, useState } from "react";
import SubMapMenuControl from "@/components/ui/layout_map/SubMapMenuControl";

import { GiPipes } from "react-icons/gi";
import { MdSensors } from "react-icons/md";
import { RiLineHeight } from "react-icons/ri";
import { GiFlowerTwirl } from "react-icons/gi";
import { GiRoughWound } from "react-icons/gi";
import { GiDam } from "react-icons/gi";
import { MdAmpStories } from "react-icons/md";
import { FaArrowUpFromGroundWater } from "react-icons/fa6";

import SubMapLayoutMenu from "@/components/layout/SubMapLayoutMenu";

// data
import pipelineChan from "@/data/chanthaburi/pipeline/PipelineCHAN";
import { MenuProvider, useMenu } from "@/contexts/MenuContext";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const mapFullScreenRef = useRef<HTMLDivElement>(null);

  const [activeLayer, setActiveLayer] = useState("OpenStreetMap");

  const [subMenuControl, setSubMenuControl] = useState();

  return (
    <MenuProvider>
      <div ref={mapFullScreenRef} className="flex flex-col h-screen">
        <MapLayoutMenu
          mapFullScreenRef={mapFullScreenRef}
          // controlMonitor={controlMonitor}
        />
        {children}
        <SubMapLayoutMenu
          mapFullScreenRef={mapFullScreenRef}
        />
      </div>
    </MenuProvider>
  );
}
