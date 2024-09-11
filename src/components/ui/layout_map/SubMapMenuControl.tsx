"use client";
import { icon } from "leaflet";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { IoLogoBuffer } from "react-icons/io5";
import { GoMoveToTop } from "react-icons/go";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import GeocodingComponent from "./sub_list_menu_map/GeocodingComponent";
import ToolsList from "./sub_list_menu_map/ToolsList";
import { useMenu } from "@/contexts/MenuContext";


function SubMapMenuControl({
  mapFullScreenRef,
}: {
  mapFullScreenRef: RefObject<HTMLDivElement>;
}) {
  const menubarRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(true);

  const { controlMonitor,  toggleDataStatus } = useMenu();

  const listSubmenu = controlMonitor.filter(
    (listControl) => listControl.status === true
  );

  // const openSubmenu = () => {
  //   if (listSubmenu.length !== 0) {
  //     setOpenMenu(!openMenu);
  //   }
  // };

  useEffect(()=>{
    if(openMenu){
      setOpenMenu(false);
    }
  },[listSubmenu[0]?.name])

  return (
    <aside
      id="default-sidebar"
      className={`fixed sm:top-2 sm:right-2 z-2 rounded-xl overflow-hidden
      ${
        openMenu ? "h-10 w-10 " : "h-auto w-60 border-[rgba(27,50,94,255)]"
      } border-2 max-h-[80vh] -translate-x-full sm:translate-x-0`}
      aria-label="Sidebar"
    >
      <div
        className={`h-[100%] px-2 py-4 ${
          openMenu ? "bg-[black]" : " bg-[white] "
        } relative`}
      >
        <div className="absolute sm:right-2 sm:-top-11 ">
          <div className="relative">
            {/* TOGGLE MENU */}
            <button onClick={() => setOpenMenu(!openMenu)}>
              <IoLogoBuffer
                className={` text-main-blue text-3xl rounded-full border border-main-blue absolute sm:-right-1 top-12 cursor-pointer ${
                  openMenu
                    ? "rotate-180 text-white bg-[rgba(27,50,94)]"
                    : " bg-[white] text-[rgba(27,50,94)] "
                } `}
              />
            </button>
          </div>
        </div>
        {/* {controlMonitor.filter((listControl)=>{
          if(listControl.status === true){}
        })} */}

        {listSubmenu.length === 0 && (
          <div
            className={`flex justify-center	items-center gap-5 text-black cursor-pointer bg-[rgb(255,255,255,0.0)] rounded-sm ${
              openMenu ? "" : "whitespace-nowrap overflow-hidden"
            }`}
          >
            Monitor
          </div>
        )}

        {listSubmenu.map((listControl, indexSubMenuListControl) => (
          <div key={uuidv4()}>
            <div
              className={`flex justify-center	items-center gap-5 text-black cursor-pointer bg-[rgb(255,255,255,0.0)] rounded-sm ${
                openMenu ? "" : "whitespace-nowrap overflow-hidden"
              }`}
              style={{ width: "100%", height: "50px" }}
            >
              {listControl.name}
            </div>

            {/* List Menu And Tools */}
            <div
              ref={menubarRef}
              className="mt-4 rounded-sm overflow-y-auto max-h-[80vh]"
            >
              <div className="max-w-[95%] truncate text-[rgba(27,50,94)]">
                {listControl.data?.map((x, indexListControl) => {
                  return (
                    <div className="flex justify-start items-center gap-4 w-full" key={uuidv4()}>
                      <input
                        type="checkbox"
                        onChange={toggleDataStatus(
                          listControl.id,
                          indexListControl
                        )}
                        checked={x.status}
                        style={{
                          accentColor: x.status ? "rgb(249,164,26,0.5)" : "",
                        }}
                      />{" "}
                      {x.name}{" "} 
                    </div>
                  );
                })}
                {/* <ListMapControls /> */}

                {/* <ToolsList
              mapFullScreenRef={mapFullScreenRef}
              toggleMenu={openMenu}
            />

            <MenuGoMoveToTop menubarRef={menubarRef} /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default SubMapMenuControl;
