import { SyntheticEvent, useEffect, useState } from "react";

function MenuCurtain(props: any) {
  const [visualCurtainWidth, setVisualCurtainWidth] = useState(0);

  useEffect(() => {
    let touchStart: number | null = null;
    let touchEnd: number | null = null;
    let curtainWidth: number = 0;
    let touchStartWidth: number = curtainWidth;

    function getTouchDistance(): number {
      return touchStart && touchEnd ? touchStart - touchEnd : 0;
    }

    function getMinSwipeDistance(screenFraction: number): number {
      return window.innerWidth * screenFraction;
    }

    function onTouchStart(e: any): void {
      touchEnd = null;
      touchStart = e.touches[0].clientX;
      touchStartWidth = curtainWidth;
    }

    function onTouchMove(e: any): void {
      touchEnd = e.touches[0].clientX;
      curtainWidth =
        touchStartWidth - (100 * getTouchDistance()) / window.innerWidth;
      setVisualCurtainWidth(curtainWidth);
    }

    function onTouchEnd(e: any): void {
      const isLeftSwipe = getTouchDistance() > getMinSwipeDistance(0.4);
      const isRightSwipe = getTouchDistance() < -getMinSwipeDistance(0.4);

      if (isRightSwipe) {
        curtainWidth = 100;
      } else if (isLeftSwipe) {
        curtainWidth = 0;
      } else {
        curtainWidth = touchStartWidth;
      }

      setVisualCurtainWidth(curtainWidth);
    }

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <>
      <div
        id={props.id}
        className="overlay"
        style={{ width: `${visualCurtainWidth}%` }}
      >
        <button className="closebtn" onClick={() => setVisualCurtainWidth(0)}>
          &times;
        </button>

        <div className="overlay-content">{props.children}</div>
      </div>

      <button onClick={() => setVisualCurtainWidth(100)}>EXPAND MENU</button>
    </>
  );
}

export default MenuCurtain;
