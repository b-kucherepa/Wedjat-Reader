"use client";

import {
  CLICK_MARGIN_PERCENTAGE,
  DEFAULT_BG_IMAGE,
  NAME_BG_FILES,
  NAME_BG_INDEX,
  NAME_BG_REPEAT,
  NAME_BG_SIZE,
  NAME_SHOW_IS_ENABLED,
  NAME_SHOW_INTERVAL,
  NAME_SHOW_IS_RANDOM,
  NAME_TEXT_DATA,
  NAME_TEXT_COLOR,
  NAME_TEXT_FONT,
  NAME_TEXT_MARGIN_H,
  NAME_TEXT_SIZE,
  NAME_TEXT_SPACING,
  NAME_TEXT_MARGIN_V,
  NAME_MENU_STATE,
  SWIPE_PERCENTAGE,
} from "@/common/constants";

import {
  getScreenPercentSize,
  loadStates,
  normalizeArrayIndex,
  saveStates,
} from "@/common/utils";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment as incrementImageIndex,
  decrement as decrementImageIndex,
  randomize as randomizeImageIndex,
  set as setImageIndex,
} from "@/store/bgIndexSlice";

import { App } from "@capacitor/app";
import { MenuState } from "@/store/menuStateSlice";
import { Swipe } from "@/hooks/useSwipes";

export default function RenderArea() {
  const [
    bgImageFiles,
    bgImageIndex,
    bgImageRepeat,
    bgImageSize,
    menuState,
    showInterval,
    showIsEnabled,
    showIsRandom,
    textColor,
    textData,
    textFont,
    textMarginH,
    textMarginV,
    textSize,
    textSpacing,
  ] = useSelector((state: any) => [
    state[NAME_BG_FILES].value,
    state[NAME_BG_INDEX].value,
    state[NAME_BG_REPEAT].value,
    state[NAME_BG_SIZE].value,
    state[NAME_MENU_STATE].value,
    state[NAME_SHOW_INTERVAL].value,
    state[NAME_SHOW_IS_ENABLED].value,
    state[NAME_SHOW_IS_RANDOM].value,
    state[NAME_TEXT_COLOR].value,
    state[NAME_TEXT_DATA].value,
    state[NAME_TEXT_FONT].value,
    state[NAME_TEXT_MARGIN_H].value,
    state[NAME_TEXT_MARGIN_V].value,
    state[NAME_TEXT_SIZE].value,
    state[NAME_TEXT_SPACING].value,
  ]);

  const dispatch = useDispatch();

  const slideshowTimer = useRef(setInterval(() => {}, 0));
  const bgImageFilesLengthRef = useRef(bgImageFiles.length);
  bgImageFilesLengthRef.current = bgImageFiles.length;
  const menuStateRef = useRef(menuState);
  menuStateRef.current = menuState;

  useEffect(() => {
    loadStates(dispatch);

    App.addListener("pause", () => saveStates());
    document.addEventListener("beforeunload", saveStates);
    document.addEventListener("visibilitychange", saveStates);

    return () => {
      document.removeEventListener("beforeunload", saveStates);
      document.removeEventListener("visibilitychange", saveStates);
    };
  }, []);

  useEffect(() => {
    function handleSwipeEnd(e: CustomEvent): void {
      if (menuStateRef.current === MenuState.Close) {
        if (e.detail.swipe === Swipe.Right) {
          dispatch(decrementImageIndex(bgImageFilesLengthRef.current));
        } else if (e.detail.swipe === Swipe.Left) {
          dispatch(incrementImageIndex(bgImageFilesLengthRef.current));
        }
      }
    }

    function handleClick(e: MouseEvent): void {
      if (menuStateRef.current === MenuState.Close) {
        const isLeftSideTouch: boolean =
          e.clientX <= getScreenPercentSize(CLICK_MARGIN_PERCENTAGE, false);
        const isRightSideTouch: boolean =
          e.clientX >= getScreenPercentSize(-CLICK_MARGIN_PERCENTAGE, false);

        if (isLeftSideTouch) {
          dispatch(decrementImageIndex(bgImageFilesLengthRef.current));
        }

        if (isRightSideTouch) {
          dispatch(incrementImageIndex(bgImageFilesLengthRef.current));
        }
      }
    }

    document.addEventListener("swipeend", (e) =>
      handleSwipeEnd(e as CustomEvent)
    );
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("swipeend", (e) =>
        handleSwipeEnd(e as CustomEvent)
      );
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    clearInterval(slideshowTimer.current);

    if (showIsEnabled) {
      slideshowTimer.current = setInterval(() => {
        if (showIsRandom) {
          dispatch(randomizeImageIndex(bgImageFilesLengthRef.current));
        } else {
          dispatch(incrementImageIndex(bgImageFilesLengthRef.current));
        }
      }, showInterval);
    }
  }, [showInterval, showIsEnabled]);

  const normalizedIndex: number = normalizeArrayIndex(
    bgImageIndex,
    bgImageFiles.length
  );
  dispatch(setImageIndex(normalizedIndex >= 0 ? normalizedIndex : 0));

  return (
    <div
      className="render-area"
      style={{
        backgroundImage: `url(${
          bgImageFiles.length > 0
            ? bgImageFiles[normalizedIndex].file
            : DEFAULT_BG_IMAGE.file
        })`,
        backgroundSize: bgImageSize,
        backgroundRepeat: bgImageRepeat,

        color: textColor,
        fontSize: textSize,
        lineHeight: textSpacing,
        fontFamily: textFont,
        paddingLeft: `${textMarginH}px`,
        paddingRight: `${textMarginH}px`,
        paddingTop: `${textMarginV}px`,
        paddingBottom: `${textMarginV}px`,
      }}
    >
      <div>{textData}</div>
    </div>
  );
}
