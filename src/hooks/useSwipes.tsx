import { getScreenPercentSize } from "@/common/utils";
import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number } | null;

export enum Swipe {
  None,
  Up,
  Down,
  Left,
  Right,
}

export default function useSwipes(swipeLengthScreenPercentage: number) {
  const [startPoint, setStartPoint] = useState(null as Point);
  const startPointRef = useRef(startPoint);
  startPointRef.current = startPoint;

  const [endPoint, setEndPoint] = useState(null as Point);
  const endPointRef = useRef(endPoint);
  endPointRef.current = endPoint;

  function getSwipe(): Swipe {
    if (!startPointRef.current || !endPointRef.current) {
      return Swipe.None;
    }

    const xDistance: number = endPointRef.current.x - startPointRef.current.x;
    const yDistance: number = endPointRef.current.y - startPointRef.current.y;

    const isLongEnough: boolean =
      Math.abs(xDistance) >
        getScreenPercentSize(swipeLengthScreenPercentage, false) ||
      Math.abs(yDistance) >
        getScreenPercentSize(swipeLengthScreenPercentage, true);

    if (!isLongEnough) {
      return Swipe.None;
    }

    if (Math.abs(xDistance) > Math.abs(yDistance)) {
      if (xDistance > 0) {
        return Swipe.Right;
      } else {
        return Swipe.Left;
      }
    } else {
      if (yDistance > 0) {
        return Swipe.Down;
      } else {
        return Swipe.Up;
      }
    }
  }

  function handleTouchStart(e: TouchEvent): void {
    setStartPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setEndPoint(null);
  }

  function handleTouchMove(e: TouchEvent): void {
    setEndPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    if (!startPointRef.current || !endPointRef.current) {
      return;
    }

    document.dispatchEvent(
      new CustomEvent("swipe", {
        detail: {
          startPoint: startPointRef.current,
          currentPoint: endPointRef.current,
          xDistance: endPointRef.current.x - startPointRef.current.x,
          yDistance: endPointRef.current.y - startPointRef.current.y,
          swipe: getSwipe(),
        },
      })
    );
  }

  function handleTouchEnd(e: TouchEvent): void {
    if (!startPointRef.current || !endPointRef.current) {
      return;
    }
    document.dispatchEvent(
      new CustomEvent("swipeend", {
        detail: {
          startPoint: startPointRef.current,
          endPoint: endPointRef.current,
          xDistance: endPointRef.current.x - startPointRef.current.x,
          yDistance: endPointRef.current.y - startPointRef.current.y,
          swipe: getSwipe(),
        },
      })
    );
  }

  useEffect(() => {
    window.addEventListener("touchstart", (e: TouchEvent) =>
      handleTouchStart(e)
    );
    window.addEventListener("touchmove", (e: TouchEvent) => handleTouchMove(e));
    window.addEventListener("touchend", (e: TouchEvent) => handleTouchEnd(e));

    return () => {
      window.removeEventListener("touchstart", (e: TouchEvent) =>
        handleTouchStart(e)
      );
      window.removeEventListener("touchmove", (e: TouchEvent) =>
        handleTouchMove(e)
      );
      window.removeEventListener("touchend", (e: TouchEvent) =>
        handleTouchEnd(e)
      );
    };
  }, []);

  return;
}
