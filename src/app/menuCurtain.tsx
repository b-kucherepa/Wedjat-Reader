import { useEffect, useRef, useState } from "react";
import TextLoadBtn from "./textLoadBtn";
import BgLoadBtn from "./bgLoadBtn";
import BgSelect from "./bgSelect";
import ShowStart from "./showStart";
import RandomShowOption from "./randomShowOption";
import BgSort from "./bgSort";
import IntervalShowOption from "./intervalShowOption";

function MenuCurtain() {
  const EXPANDED_WIDTH: number = 100;
  const SWIPE_WIDTH: number = 20;
  const HINT_WIDTH: number = 15;
  const COLLAPSED_WIDTH: number = 0;

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

    function handleTouchStart(e: TouchEvent): void {
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

    function handleTouchMove(e: TouchEvent): void {
      touchEnd = e.touches[0].clientX;
      setCurtainWidth(
        touchStartWidth - (100 * getTouchDistance()) / window.innerWidth
      );
    }

    function handleTouchEnd(): void {
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

    function handleClick(e: MouseEvent): void {
      const isLeftSideTouch: boolean =
        e.clientX <= getScreenPercentSize(HINT_WIDTH);
      if (isLeftSideTouch) {
        setCurtainWidth(EXPANDED_WIDTH);
        touchStartWidth = EXPANDED_WIDTH;
      }
    }

    function handleMouseMove(e: MouseEvent): void {
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
    <div
      id="navCurtain"
      className="h-full w-0 fixed order-1 top-0 left-0 bg-black overflow-x-hidden duration-500"
      style={{
        width: `${curtainWidth}%`,
      }}
    >
      <button
        className="absolute top-2 right-8 text-6xl text-center"
        onClick={() => setCurtainWidth(COLLAPSED_WIDTH)}
      >
        &times;
      </button>

      <div
        className="flex flex-col align-evenly basis-full gap-2 relative text-left w-full h-full px-16 py-16 duration-500"
        style={{
          scale: curtainWidth > HINT_WIDTH ? curtainWidth / 100 : 0,
        }}
      >
        <div className="flex flex-row h-content w-full items-start content-start gap-4">
          <label className="place-content-center w-1/4 shrink-0">
            Select files for:
          </label>
          <label className="place-content-center">
            text: <TextLoadBtn />
          </label>
          <label className="place-content-center">
            background images: <BgLoadBtn />
          </label>
        </div>
        <hr />
        <div className="flex flex-row h-full w-full items-start content-start gap-4">
          <label className="place-content-center w-1/4 shrink-0">
            Background:
          </label>
          <label className="h-full flex flex-col">
            select: <BgSelect />
          </label>
          <label className="w-28 h-full shrink-0">
            sort by: <BgSort />
          </label>
        </div>
        <hr />
        <div className="flex flex-row h-content items-center w-full items-start content-start gap-4">
          <label className="place-content-center w-1/4 shrink-0">
            Slideshow:
          </label>
          <label className="place-content-center">
            interval (s): <IntervalShowOption />
          </label>
          <label className="place-content-center">
            randomize: <RandomShowOption />
          </label>
          <div className="place-content-center">
            <ShowStart onClick={() => setCurtainWidth(COLLAPSED_WIDTH)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCurtain;
