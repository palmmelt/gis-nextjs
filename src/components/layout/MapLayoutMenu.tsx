import React, { RefObject } from "react";
import MapSideBarMenuList from "../ui/layout_map/MapSideBarToolsList";

function MapLayoutMenu({mapFullScreenRef}: {mapFullScreenRef:RefObject<HTMLDivElement>}) {
  return (
    <div className="sm:ml-64 bg-gray-200 relative z-10">
        <MapSideBarMenuList mapFullScreenRef={mapFullScreenRef}/>
    </div>
  );
}

export default MapLayoutMenu;
