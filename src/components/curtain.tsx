"use client";

import {
  CLICK_MARGIN_PERCENTAGE,
  NAME_MENU_STATE,
  SWIPE_PERCENTAGE,
} from "@/common/constants";
import { getScreenPercentSize } from "@/common/utils";

import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MenuState, open, close, hint } from "@/store/menuStateSlice";
import { Swipe } from "@/hooks/useSwipes";

export default function Curtain(props: any) {
  const EXPANDED_HEIGHT_PERCENTAGE: number = 100;
  const COLLAPSED_HEIGHT_PERCENTAGE: number = 0;
  const menuState = useSelector((state: any) => state[NAME_MENU_STATE].value);

  const dispatch = useDispatch();

  const menuStateRef = useRef(menuState);
  menuStateRef.current = menuState;

  const getCurtainHeight = useCallback(() => {
    switch (menuStateRef.current) {
      case MenuState.Open:
        return EXPANDED_HEIGHT_PERCENTAGE;
      case MenuState.Close:
        return COLLAPSED_HEIGHT_PERCENTAGE;
      case MenuState.Hint:
        return CLICK_MARGIN_PERCENTAGE;
      default:
        throw TypeError("No such menu state exists");
    }
  }, []);

  const getIsCollapsed = useCallback(() => {
    return (
      menuStateRef.current === MenuState.Close ||
      menuStateRef.current === MenuState.Hint
    );
  }, []);

  const getIfInHintZone = useCallback((y: number) => {
    return y <= getScreenPercentSize(CLICK_MARGIN_PERCENTAGE, true);
  }, []);

  useEffect(() => {
    function handleSwipeEnd(e: CustomEvent): void {
      console.log("Points");

      if (e.detail.swipe === Swipe.Down) {
        dispatch(open());
      } else if (e.detail.swipe === Swipe.Up) {
        dispatch(close());
      }
    }

    function handleClick(e: MouseEvent): void {
      if (getIfInHintZone(e.clientY) && getIsCollapsed()) {
        dispatch(open());
      }
    }

    function handleMouseMove(e: MouseEvent): void {
      if (getIsCollapsed()) {
        getIfInHintZone(e.clientY) ? dispatch(hint()) : dispatch(close());
      }
    }

    document.addEventListener("swipeend", (e) =>
      handleSwipeEnd(e as CustomEvent)
    );
    document.addEventListener("click", handleClick);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("swipeend", (e) =>
        handleSwipeEnd(e as CustomEvent)
      );
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="curtain"
      style={{
        height: `${getCurtainHeight()}%`,
        overflowY: menuState === MenuState.Open ? "auto" : "hidden",
      }}
    >
      <div
        style={{
          transition: "inherit",
          scale: menuState === MenuState.Open ? 1 : 0,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
