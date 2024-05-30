import { useEffect, useRef, useState } from "react";

function MenuCurtain(props: any) {
  const [curtainWidth, setCurtainWidth] = useState(0);
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

    function handleClick(e: any): void {
      const isLeftSideTouch: boolean = e.clientX < getScreenFractionSize(0.2);
      console.log(
        e.clientX,
        getScreenFractionSize(0.2),
        isLeftSideTouch,
        curtainWidthRef.current
      );
      if (isLeftSideTouch) {
        setCurtainWidth(100);
      }
    }

    function handleTouchEnd(e: any): void {
      const isLeftSwipe = getTouchDistance() > getScreenFractionSize(0.4);
      const isRightSwipe = getTouchDistance() < -getScreenFractionSize(0.4);

      if (isRightSwipe) {
        setCurtainWidth(100);
      } else if (isLeftSwipe) {
        setCurtainWidth(0);
      } else {
        setCurtainWidth(touchStartWidth);
      }
    }

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div
        id={props.id}
        className="overlay"
        style={{ width: `${curtainWidth}%` }}
      >
        <button className="closebtn" onClick={() => setCurtainWidth(0)}>
          &times;
        </button>

        <div className="overlay-content">{props.children}</div>
      </div>

      <button onClick={() => setCurtainWidth(100)}>EXPAND MENU</button>
    </>
  );
}

export default MenuCurtain;
