import { useEffect, useRef, useState } from "react";
import TextLoadBtn from "./textLoadBtn";
import BgLoadBtn from "./bgLoadBtn";
import BgSelect from "./bgSelect";
import SlideshowStart from "./slideshowStart";

function MenuCurtain(props: any) {
  const EXPANDED_WIDTH = 100;
  const SWIPE_WIDTH = 20;
  const HINT_WIDTH = 15;
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

    function getScreenPercentSize(percent: number): number {
      return (window.innerWidth * percent) / 100;
    }

    function handleTouchStart(e: any): void {
      touchEnd = null;
      touchStartWidth = curtainWidthRef.current;

      const isPressedNearTheEdge =
        getScreenPercentSize(curtainWidthRef.current - HINT_WIDTH) <
          e.touches[0].clientX &&
        e.touches[0].clientX <
          getScreenPercentSize(curtainWidthRef.current + HINT_WIDTH);

      if (isPressedNearTheEdge) {
        touchStart = e.touches[0].clientX;
      }
    }

    function handleTouchMove(e: any): void {
      touchEnd = e.touches[0].clientX;
      setCurtainWidth(
        touchStartWidth - (100 * getTouchDistance()) / window.innerWidth
      );
    }

    function handleTouchEnd(e: any): void {
      const isLeftSwipe =
        getTouchDistance() > getScreenPercentSize(SWIPE_WIDTH);
      const isRightSwipe =
        getTouchDistance() < -getScreenPercentSize(SWIPE_WIDTH);

      if (isRightSwipe) {
        setCurtainWidth(EXPANDED_WIDTH);
      } else if (isLeftSwipe) {
        setCurtainWidth(COLLAPSED_WIDTH);
      } else {
        setCurtainWidth(touchStartWidth);
      }

      touchStart = null;
    }

    function handleClick(e: any): void {
      const isLeftSideTouch: boolean =
        e.clientX <= getScreenPercentSize(HINT_WIDTH);
      if (isLeftSideTouch) {
        setCurtainWidth(EXPANDED_WIDTH);
        touchStartWidth = EXPANDED_WIDTH;
      }
    }

    function handleMouseMove(e: any): void {
      const isLeftSideHover: boolean =
        e.clientX <= getScreenPercentSize(HINT_WIDTH);

      if (curtainWidthRef.current <= HINT_WIDTH) {
        setCurtainWidth(
          isLeftSideHover ? COLLAPSED_WIDTH + HINT_WIDTH : COLLAPSED_WIDTH
        );
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
        style={{
          width: `${curtainWidth}%`,
        }}
      >
        <button
          className="closebtn"
          onClick={() => setCurtainWidth(COLLAPSED_WIDTH)}
        >
          &times;
        </button>

        <div
          className="overlay-content"
          style={{
            scale: curtainWidth > HINT_WIDTH ? curtainWidth / 100 : 0,
          }}
        >
          <TextLoadBtn />
          <BgLoadBtn />
          <BgSelect />
          <SlideshowStart onClick={() => setCurtainWidth(COLLAPSED_WIDTH)}/>
        </div>
      </div>
    </>
  );
}

export default MenuCurtain;
