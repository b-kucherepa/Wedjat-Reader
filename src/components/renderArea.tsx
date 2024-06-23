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
  SWIPE_PERCENTAGE,
} from "@/common/constants";

import {
  getScreenPercentSize,
  loadStates,
  normalizeArrayIndex,
} from "@/common/utils";

import SwipeHandler, { Swipe } from "@/common/swipeHandler";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment as incrementImageIndex,
  decrement as decrementImageIndex,
  randomize as randomizeImageIndex,
  set as setImageIndex,
} from "@/store/bgIndexSlice";

export default function RenderArea() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadStates(dispatch);
  }, []);

  const text = useSelector((state: any) => state[NAME_TEXT_DATA].value);
  const textColor = useSelector((state: any) => state[NAME_TEXT_COLOR].value);
  const textSize = useSelector((state: any) => state[NAME_TEXT_SIZE].value);
  const textSpacing = useSelector(
    (state: any) => state[NAME_TEXT_SPACING].value
  );
  const textFont = useSelector((state: any) => state[NAME_TEXT_FONT].value);
  const textHMargin = useSelector(
    (state: any) => state[NAME_TEXT_MARGIN_H].value
  );
  const textVMargin = useSelector(
    (state: any) => state[NAME_TEXT_MARGIN_V].value
  );

  const bgImageFiles = useSelector((state: any) => state[NAME_BG_FILES].value);
  const bgImageIndex = useSelector((state: any) => state[NAME_BG_INDEX].value);
  const bgImageSize = useSelector((state: any) => state[NAME_BG_SIZE].value);
  const bgImageRepeat = useSelector(
    (state: any) => state[NAME_BG_REPEAT].value
  );

  const showIsEnabled = useSelector(
    (state: any) => state[NAME_SHOW_IS_ENABLED].value
  );
  const showIsRandom = useSelector(
    (state: any) => state[NAME_SHOW_IS_RANDOM].value
  );
  const showInterval = useSelector(
    (state: any) => state[NAME_SHOW_INTERVAL].value
  );

  const slideshowTimer = useRef(setInterval(() => {}, 0));
  const bgImageFilesLengthRef = useRef(bgImageFiles.length);
  bgImageFilesLengthRef.current = bgImageFiles.length;

  useEffect(() => {
    const swipeHandler = new SwipeHandler(document, SWIPE_PERCENTAGE);

    function handleSwipeEnd(e: CustomEvent): void {
      if (e.detail.swipe === Swipe.Right) {
        dispatch(decrementImageIndex(bgImageFilesLengthRef.current));
      } else if (e.detail.swipe === Swipe.Left) {
        dispatch(incrementImageIndex(bgImageFilesLengthRef.current));
      }
    }

    function handleClick(e: MouseEvent): void {
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
        paddingLeft: `${textHMargin}px`,
        paddingRight: `${textHMargin}px`,
        paddingTop: `${textVMargin}px`,
        paddingBottom: `${textVMargin}px`,
      }}
    >
      <div>{text}</div>
    </div>
  );
}
