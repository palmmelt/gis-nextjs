import React, { RefObject, useEffect, useState } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { GoMoveToTop } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";
import { VscTools } from "react-icons/vsc";

type Props = {};

function ToolsList({
  mapFullScreenRef,
  toggleMenu,
}: {
  mapFullScreenRef: RefObject<HTMLDivElement>;
  toggleMenu: boolean;
}) {
  const [fullScreen, setFullScreen] = useState(
    document.fullscreenElement !== null
  );

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (mapFullScreenRef.current) {
        const element = mapFullScreenRef.current as any;
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
        setFullScreen(true);
      }
    } else {
      const element = mapFullScreenRef.current as any;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (element.webkitExitFullscreen) {
        /* Chrome, Safari & Opera */
        element.webkitExitFullscreen();
      } else if (element.msExitFullscreen) {
        /* IE/Edge */
        element.msExitFullscreen();
      }
      setFullScreen(false);
    }
  };

  const toolMenuList = [
    {
      name: "Full Screen",
      icon: fullScreen ? (
        <AiOutlineFullscreenExit className="w-5 h-5" />
      ) : (
        <AiOutlineFullscreen className="w-5 h-5" />
      ),
      onclick: toggleFullscreen,
    },
  ];

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <ul className="space-y-2 font-medium ">
      <div
        className={`flex items-center p-2 mx-2 my-2 text-gray-900 rounded-sm bg:[rgb(0,0,0,0)] `}
      >
        <div
          className='p-1 '
        >
          <VscTools className="w-5 h-5 text-main-blue"/>
        </div>
        <span className={`ms-3 truncate`}>
        TOOLS
        </span>
      </div>
      {toolMenuList.map((menu) => {
        return (
          <li className="" key={uuidv4()}>
            <a
              href="#"
              onClick={() => menu.onclick()}
              className={`flex items-center p-2 mx-2 my-2 text-gray-900 rounded-sm dark:text-[black] dark:hover:text-[white] hover:bg-[rgba(249,164,26,255)] dark:hover:bg-[rgba(249,164,26,255)] ${
                fullScreen
                  ? "bg-[rgb(249,164,26,0.5)]"
                  : "bg-[rgb(205,205,205,0.8)]"
              } group`}
            >
              <div
                className={`${
                  fullScreen ? "dark:text-red-500" : "dark:text-green-500"
                } border rounded-full p-1 bg-white`}
              >
                {menu.icon}
              </div>
              <span className={`ms-3 truncate `}>
                {menu.name}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default ToolsList;
