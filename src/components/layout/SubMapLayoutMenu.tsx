import React, { RefObject } from "react";
import SubMapMenuControl from "../ui/layout_map/SubMapMenuControl";

function SubMapLayoutMenu({mapFullScreenRef}: {mapFullScreenRef:RefObject<HTMLDivElement>;}) {
  return (
    <div className="sm:ml-64 bg-gray-200 relative z-10">
        <SubMapMenuControl mapFullScreenRef={mapFullScreenRef} />
    </div>
  );
}

export default SubMapLayoutMenu;
