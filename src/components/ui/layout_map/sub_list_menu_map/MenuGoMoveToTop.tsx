import React, { RefObject, useEffect, useState } from "react";
import { GoMoveToTop } from "react-icons/go";

type Props = {};

function MenuGoMoveToTop({
  menubarRef,
}: {
  menubarRef: RefObject<HTMLDivElement>;
}) {
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

  if (!isOverflow) {
    return " ";
  }

  return (
    <div>
      <div className="flex justify-center items-center w-full h-10 text-black">
        <button onClick={moveToTop}>
          <GoMoveToTop className="flex justify-center items-center animate-bounce w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default MenuGoMoveToTop;
