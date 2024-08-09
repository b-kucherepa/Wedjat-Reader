"use client";

import {
  CLICK_MARGIN_PERCENTAGE,
  StateName,
  StoreActions,
} from "@/common/constants";

import { getScreenPercentSize } from "@/common/utils";

import { MenuState } from "@/store/menuStateSlice";
import { Swipe } from "@/hooks/useSwipes";

import { useCallback, useEffect, useRef } from "react";

import useSelectorValuesManager from "@/hooks/useSelectorValuesRouter";
import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function Curtain(props: any) {
  const EXPANDED_HEIGHT_PERCENTAGE: number = 100;
  const COLLAPSED_HEIGHT_PERCENTAGE: number = 0;
  const storeValues = useSelectorValuesManager(StateName.MENU_STATE);
  const dispatch = useDispatchRouter();
  const menuStateRef = useRef(storeValues[StateName.MENU_STATE]);
  menuStateRef.current = storeValues[StateName.MENU_STATE];

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
      if (e.detail.swipe === Swipe.Down) {
        dispatch(StateName.MENU_STATE, StoreActions.OPEN);
      } else if (e.detail.swipe === Swipe.Up) {
        dispatch(StateName.MENU_STATE, StoreActions.CLOSE);
      }
    }

    function handleClick(e: MouseEvent): void {
      if (getIfInHintZone(e.clientY) && getIsCollapsed()) {
        dispatch(StateName.MENU_STATE, StoreActions.OPEN);
      }
    }

    function handleMouseMove(e: MouseEvent): void {
      if (getIsCollapsed()) {
        const action = getIfInHintZone(e.clientY) ? "hint" : StoreActions.CLOSE;
        dispatch(StateName.MENU_STATE, action);
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
        overflowY:
          storeValues[StateName.MENU_STATE] === MenuState.Open
            ? "auto"
            : "hidden",
      }}
    >
      <div
        style={{
          transition: "inherit",
          scale: storeValues[StateName.MENU_STATE] === MenuState.Open ? 1 : 0,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
