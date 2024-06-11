"use client";
import { icon } from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { GoMoveToTop } from "react-icons/go";
import { AiOutlineFullscreen,AiOutlineFullscreenExit } from "react-icons/ai";


function MapSideBarToolsList({fullScreenAction,fullScreen}: {fullScreenAction: ()=>void,fullScreen:HTMLDivElement|null}) {
  const menubarRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (menubarRef.current) {
        const hasOverflow =
          menubarRef.current.scrollHeight > menubarRef.current.clientHeight ||
          menubarRef.current.scrollWidth > menubarRef.current.clientWidth;
        setIsOverflow(hasOverflow);
      }
    };

    checkOverflow();

    // Re-check on window resize to ensure we capture overflow changes
    window.addEventListener("resize", checkOverflow);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const moveToTop = () => {
    if (menubarRef.current) {
      menubarRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const menuList = [
    {
      name: "Full Screen",
      icon: fullScreen ? <AiOutlineFullscreen className="w-5 h-5"/>:<AiOutlineFullscreenExit className="w-5 h-5"/>,
      onclick: fullScreenAction,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
    {
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-[black] group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      onclick: () => console.log("hi")
      ,
    },
  ];

  const toolsList = (
    <ul className="space-y-2 font-medium max-h-[80vh] ">
      {menuList.map((menu, index) => {
        return (
          <li className="" key={index}>
            <a
              href="#"
              onClick={()=>menu.onclick()}
              className="flex items-center p-2 mx-2 my-2 text-gray-900 rounded-sm dark:text-[black] dark:hover:text-[white] hover:bg-[rgba(249,164,26,255)] dark:hover:bg-[rgba(249,164,26,255)] bg-[rgb(205,205,205,0.8)] group"
            >
              {menu.icon}
              <span className="ms-3">{menu.name}</span>
            </a>
          </li>
        );
      })}
      {/* <div className="flex justify-center items-center" onClick={moveToTop}>END</div> */}
      {isOverflow ? (
        <div className="flex justify-center items-center w-full h-10">
          <button onClick={moveToTop}>
            <GoMoveToTop className="flex justify-center items-center animate-bounce w-5 h-5" />
          </button>{" "}
        </div>
      ) : (
        ""
      )}{" "}
    </ul>
  );
  return (
    <aside
      id="default-sidebar"
      className="fixed sm:top-0 sm:left-0 z-2 w-72 h-full transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-[100%] px-2 py-4 bg-[rgb(155,155,155,0.8)] relative">
        <IoChevronBackOutline className="bg-[white] text-main-blue text-3xl rounded-full border-2 border-main-blue absolute -right-3 top-10 cursor-pointer " />
        <div
          className="flex justify-start	items-center gap-5 text-black cursor-pointer bg-[rgb(255,255,255,0.0)] rounded-sm"
          style={{ width: "100%", height: "80px" }}
        >
          <img
            src="area-tech.png"
            alt="Girl in a jacket"
            style={{ width: "30%", height: "auto", marginLeft: "14px" }}
          />
          <p className="text-md">
            <b>MAP SERVER</b>
          </p>
        </div>
        <div
          ref={menubarRef}
          className="mt-4 bg-[rgba(27,50,94,0.4)] rounded-sm overflow-y-auto"
        >
          <div className="w-[95%]">{toolsList}</div>
        </div>
        <p className="text-xs	 text-gray-500 absolute bottom-1">
          © Copyright Area Technology. <br />
          All Rights Reserved
        </p>
      </div>
    </aside>
  );
}

export default MapSideBarToolsList;
function fullScreenAction() {
  throw new Error("Function not implemented.");
}

