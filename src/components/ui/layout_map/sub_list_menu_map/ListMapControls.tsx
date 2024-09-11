import { AiOutlineControl } from "react-icons/ai";
import React, { RefObject, useEffect, useState } from "react";
import { GoMoveToTop } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";
import { FaTools } from "react-icons/fa";
import { useMenu } from "@/contexts/MenuContext";


type Props = {};

function ListMapControls() {

  const { controlMonitor, handleControlChange } = useMenu();


  return (
    <ul className="space-y-2 font-medium ">
      <div
        className={`flex items-center p-2 mx-2 my-2 text-gray-900 rounded-sm bg:[rgb(0,0,0,0)] `}
      >
        <div className="p-1">
          <AiOutlineControl className="w-5 h-5" />
        </div>
        <span className={`ms-3 truncate`}>MONITOR</span>
      </div>
      {controlMonitor.map((menu, index) => {
        return (
          <li className="" key={uuidv4()}> 
            <a
              href="#"
              onClick={() => handleControlChange(index)}
              className={`flex items-center p-2 mx-2 my-2 text-gray-900 rounded-sm dark:text-[black] bg-[rgb(205,205,205,0.8)] dark:hover:text-[white] hover:bg-[rgba(249,164,26,255)] dark:hover:bg-[rgba(249,164,26,255)] group
              ${
                menu.status
                  ? "bg-[rgb(249,164,26,0.5)]"
                  : "bg-[rgb(205,205,205,0.8)]"
              }
              `}
            >
              <div
                className={`border rounded-full p-1 bg-white text-main-blue`}
              >
                {menu.icon}
              </div>
              <span className={`ms-3 truncate`}>{menu.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default ListMapControls;
