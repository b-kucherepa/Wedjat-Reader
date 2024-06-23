"use client";

import { CLICK_MARGIN_PERCENTAGE, NAME_MENU_STATE } from "@/common/constants";
import { getScreenPercentSize, saveStates } from "@/common/utils";

import { Swipe } from "@/common/swipeHandler";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { App } from "@capacitor/app";

import { MenuState, open, close, hint } from "@/store/menuStateSlice";

export default function Curtain(props: any) {
  const EXPANDED_HEIGHT_PERCENTAGE: number = 100;
  const COLLAPSED_HEIGHT_PERCENTAGE: number = 0;
  const menuState = useSelector((state: any) => state[NAME_MENU_STATE].value);

  const dispatch = useDispatch();

  function getCurtainHeight(): number {
    switch (menuState) {
      case MenuState.Open:
        return EXPANDED_HEIGHT_PERCENTAGE;
      case MenuState.Close:
        return COLLAPSED_HEIGHT_PERCENTAGE;
      case MenuState.Hint:
        return CLICK_MARGIN_PERCENTAGE;
      default:
        throw TypeError(
          "No such menu state exists" + menuState + MenuState.Open
        );
    }
  }

  useEffect(() => {
    function handleStop(e?: Event) {
      if (e) {
        e.preventDefault();
      }
      saveStates();
    }

    App.addListener("pause", () => handleStop());
    window.addEventListener("beforeunload", handleStop);
    window.addEventListener("visibilitychange", handleStop);
  }, []);

  useEffect(() => {
    function handleSwipeEnd(e: CustomEvent): void {
      if (e.detail.swipe === Swipe.Down) {
        dispatch(open());
      } else if (e.detail.swipe === Swipe.Up) {
        dispatch(close());
      }
    }

    function handleClick(e: MouseEvent): void {
      const isUpperSideTouch: boolean =
        e.clientY <= getScreenPercentSize(CLICK_MARGIN_PERCENTAGE, true);

      const isCurtainCollapsed: boolean =
        menuState === (MenuState.Close || MenuState.Hint);
      console.log(isCurtainCollapsed);

      if (isUpperSideTouch && isCurtainCollapsed) {
        dispatch(open());
      }
    }

    function handleMouseMove(e: MouseEvent): void {
      const isUpperSideHover: boolean =
        e.clientY <= getScreenPercentSize(CLICK_MARGIN_PERCENTAGE, true);

      const isCurtainCollapsed: boolean =
        menuState === (MenuState.Close || MenuState.Hint);
      console.log(isCurtainCollapsed);

      if (isCurtainCollapsed) {
        isUpperSideHover ? dispatch(hint()) : dispatch(close());
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
      {props.children}
    </div>
  );
}
