"use client";

import {
  CLICK_MARGIN_PERCENTAGE,
  DEFAULT_BG_IMAGE,
  StateName,
  StoreActions,
} from "@/common/constants";

import {
  getScreenPercentSize,
  loadStates,
  normalizeArrayIndex,
  saveStates,
} from "@/common/utils";

import { App } from "@capacitor/app";
import { MenuState } from "@/store/menuStateSlice";
import { Swipe } from "@/hooks/useSwipes";

import { useEffect, useRef } from "react";

import useSelectorValuesRouter from "@/hooks/useSelectorValuesRouter";
import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function RenderArea() {
  const dispatch = useDispatchRouter();

  const storeValues = useSelectorValuesRouter(
    StateName.BG_FILES,
    StateName.BG_INDEX,
    StateName.BG_REPEAT,
    StateName.BG_SIZE,
    StateName.MENU_STATE,
    StateName.SHOW_INTERVAL,
    StateName.SHOW_IS_ENABLED,
    StateName.SHOW_IS_RANDOM,
    StateName.TEXT_COLOR,
    StateName.TEXT_DATA,
    StateName.TEXT_FONT,
    StateName.TEXT_MARGIN_H,
    StateName.TEXT_MARGIN_V,
    StateName.TEXT_SIZE,
    StateName.TEXT_SPACING
  );

  const slideshowTimer = useRef(setInterval(() => {}, 0));
  const bgImageFilesLengthRef = useRef(storeValues[StateName.BG_FILES].length);
  bgImageFilesLengthRef.current = storeValues[StateName.BG_FILES].length;
  const menuStateRef = useRef(storeValues[StateName.MENU_STATE]);
  menuStateRef.current = storeValues[StateName.MENU_STATE];

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
          dispatch(
            StateName.BG_INDEX,
            StoreActions.DECREMENT,
            bgImageFilesLengthRef.current
          );
        } else if (e.detail.swipe === Swipe.Left) {
          dispatch(
            StateName.BG_INDEX,
            StoreActions.INCREMENT,
            bgImageFilesLengthRef.current
          );
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
          dispatch(
            StateName.BG_INDEX,
            StoreActions.DECREMENT,
            bgImageFilesLengthRef.current
          );
        }

        if (isRightSideTouch) {
          dispatch(
            StateName.BG_INDEX,
            StoreActions.INCREMENT,
            bgImageFilesLengthRef.current
          );
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

    if (storeValues[StateName.SHOW_IS_ENABLED]) {
      slideshowTimer.current = setInterval(() => {
        if (storeValues[StateName.SHOW_IS_RANDOM]) {
          dispatch(
            StateName.BG_INDEX,
            StoreActions.RANDOMIZE,
            bgImageFilesLengthRef.current
          );
        } else {
          dispatch(
            StateName.BG_INDEX,
            StoreActions.INCREMENT,
            bgImageFilesLengthRef.current
          );
        }
      }, storeValues[StateName.SHOW_INTERVAL]);
    }
  }, [
    storeValues[StateName.SHOW_INTERVAL],
    storeValues[StateName.SHOW_IS_ENABLED],
  ]);

  const normalizedIndex: number = normalizeArrayIndex(
    storeValues[StateName.BG_INDEX],
    storeValues[StateName.BG_FILES].length
  );
  dispatch(
    StateName.BG_INDEX,
    StoreActions.SET,
    normalizedIndex >= 0 ? normalizedIndex : 0
  );

  return (
    <div
      className="render-area"
      style={{
        backgroundImage: `url(${
          storeValues[StateName.BG_FILES].length > 0
            ? storeValues[StateName.BG_FILES][normalizedIndex].file
            : DEFAULT_BG_IMAGE.file
        })`,
        backgroundSize: storeValues[StateName.BG_SIZE],
        backgroundRepeat: storeValues[StateName.BG_REPEAT],

        color: storeValues[StateName.TEXT_COLOR],
        fontSize: storeValues[StateName.TEXT_SIZE],
        lineHeight: storeValues[StateName.TEXT_SPACING],
        fontFamily: storeValues[StateName.TEXT_FONT],
        paddingLeft: `${storeValues[StateName.TEXT_MARGIN_H]}px`,
        paddingRight: `${storeValues[StateName.TEXT_MARGIN_H]}px`,
        paddingTop: `${storeValues[StateName.TEXT_MARGIN_V]}px`,
        paddingBottom: `${storeValues[StateName.TEXT_MARGIN_V]}px`,
      }}
    >
      <div>{storeValues[StateName.TEXT_DATA]}</div>
    </div>
  );
}
