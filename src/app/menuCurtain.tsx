import { useEffect, useRef, useState } from "react";
import TextLoadBtn from "./textLoadBtn";
import BgLoadBtn from "./bgLoadBtn";
import BgSelect from "./bgSelect";
import SlideshowOption from "./slideshowOption";

function MenuCurtain(props: any) {
  const EXPANDED_WIDTH = 100;
  const COLLAPSED_WIDTH = 0;

  const [curtainWidth, setCurtainWidth] = useState(COLLAPSED_WIDTH);
  const curtainWidthRef = useRef(curtainWidth);
  curtainWidthRef.current = curtainWidth;

  useEffect(() => {
    let touchStart: number | null = null;
    let touchEnd: number | null = null;
    let touchStartWidth: number = curtainWidthRef.current;

    function getTouchDistance(): number {
      return touchStart && touchEnd ? touchStart - touchEnd : 0;
    }

    function getScreenFractionSize(fraction: number): number {
      return window.innerWidth * fraction;
    }

    function handleTouchStart(e: any): void {
      touchEnd = null;
      touchStart = e.touches[0].clientX;
      touchStartWidth = curtainWidthRef.current;
    }

    function handleTouchMove(e: any): void {
      touchEnd = e.touches[0].clientX;
      setCurtainWidth(
        touchStartWidth - (100 * getTouchDistance()) / window.innerWidth
      );
    }

    function handleTouchEnd(e: any): void {
      const isLeftSwipe = getTouchDistance() > getScreenFractionSize(0.4);
      const isRightSwipe = getTouchDistance() < -getScreenFractionSize(0.4);

      if (isRightSwipe) {
        setCurtainWidth(EXPANDED_WIDTH);
      } else if (isLeftSwipe) {
        setCurtainWidth(COLLAPSED_WIDTH);
      } else {
        setCurtainWidth(touchStartWidth);
      }
    }

    function handleClick(e: any): void {
      const isLeftSideTouch: boolean = e.clientX < getScreenFractionSize(0.2);
      if (isLeftSideTouch) {
        setCurtainWidth(EXPANDED_WIDTH);
        touchStartWidth = EXPANDED_WIDTH;
      }
    }

    function handleMouseMove(e: any): void {
      const isLeftSideHover: boolean = e.clientX < getScreenFractionSize(0.2);

      if (curtainWidthRef.current < EXPANDED_WIDTH*0.2) {
        setCurtainWidth(isLeftSideHover ? COLLAPSED_WIDTH + 10 : COLLAPSED_WIDTH);
      } 
    }

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        id={props.id}
        className="overlay"
        style={{ width: `${curtainWidth}%` }}
      >
        <button className="closebtn" onClick={() => setCurtainWidth(COLLAPSED_WIDTH)}>
          &times;
        </button>

        <div className="overlay-content">
          <TextLoadBtn />
          <BgLoadBtn />
          <BgSelect />
        </div>
      </div>
    </>
  );
}

export default MenuCurtain;
