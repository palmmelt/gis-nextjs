"use client";
import { icon } from "leaflet";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { GoMoveToTop } from "react-icons/go";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import GeocodingComponent from "./sub_list_menu_map/GeocodingComponent";
import ToolsList from "./sub_list_menu_map/ToolsList";
import MenuGoMoveToTop from "./sub_list_menu_map/MenuGoMoveToTop";
import ListMapControls from "./sub_list_menu_map/ListMapControls";

function MapSideBarToolsList({
  mapFullScreenRef,
}: {
  mapFullScreenRef: RefObject<HTMLDivElement>;
}) {
  const menubarRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(true);

  const layerControls = (
    <ul className="space-y-2 font-medium max-h-[80vh] ">
      <div
        className={`flex items-center p-2 mx-2 my-2 text-gray-900 bg:[rgb(0,0,0,0)] `}
      >
        <div className="p-1 ">+</div>
        <span className={`ms-3 ${openMenu ? "flex" : "hidden"}`}>TOOLS</span>
      </div>
    </ul>
  );

  return (
    <aside
      id="default-sidebar"
      className={`fixed sm:top-0 sm:left-0 z-2 
      ${openMenu ? "w-72 " : "w-20"}
      h-full -translate-x-full sm:translate-x-0 border-e-2 border-main-blue transition-all duration-500 durations-auto`}
      aria-label="Sidebar"
    >
      <div className="h-[100%] px-2 py-4 bg-[rgb(255,255,255,0.8)] relative">
        <div className="absolute sm:-right-3 ">
          <div className="relative">
            {/* TOGGLE MENU */}
            <button onClick={() => setOpenMenu(!openMenu)}>
              <IoChevronBackOutline className={`bg-[white] text-main-blue text-3xl rounded-full border-2 border-main-blue absolute sm:-right-1 top-12 cursor-pointer ${openMenu ? '':'rotate-180'} `} />
            </button>

            {/* Seach Bar*/}
            <GeocodingComponent toggleMenu={openMenu} />
          </div>
        </div>

        {/* LOGO AND HEADER MAP */}
        <div
          className="flex justify-center	items-center gap-5 text-black cursor-pointer bg-[rgb(255,255,255,0.0)] rounded-sm"
          style={{ width: "100%", height: "80px" }}
        >
          <img
            src="area-tech.png"
            alt="Girl in a jacket"
            style={{ width: "100px", height: "auto" }}
          />
          <p className={`text-md truncate ${openMenu ? "flex" : "hidden"}`}>
            <b>MAP SERVER</b>
          </p>
        </div>

        {/* List Menu And Tools */}
        <div
          ref={menubarRef}
          className="mt-4 bg-[rgba(27,50,94,0.4)] rounded-sm overflow-y-auto max-h-[80vh]"
        >
          {/* Component menu */}
          <div className="max-w-[95%] truncate">
            <ToolsList
              mapFullScreenRef={mapFullScreenRef}
              toggleMenu={openMenu}
            />

            <ListMapControls/>

            <MenuGoMoveToTop menubarRef={menubarRef} />
            
          </div>
        </div>

        <div className="w-[100%] truncate">
          <p
            className={`text-xs	text-gray-500 absolute bottom-1 w-[80%] truncate`}
          >
            © Copyright Area Technology. <br />
            All Rights Reserved
          </p>
        </div>
      </div>
    </aside>
  );
}

export default MapSideBarToolsList;
