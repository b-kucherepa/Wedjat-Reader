"use client";
import { CLICK_MARGIN_PERCENTAGE, DEFAULT_BG_IMAGE } from "@/common/constants";
import {
  getScreenPercentSize,
  loadStates,
  normalizeArrayIndex,
} from "@/common/utils";
import { Swipe } from "@/common/swipeHandler";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment as incrementImageIndex,
  decrement as decrementImageIndex,
  randomize as randomizeImageIndex,
  set as setImageIndex,
} from "@/store/bgImageIndexSlice";

export default function RenderArea() {
  const OPTION_NAME_INDEX = "bgImageIndex";

  const dispatch = useDispatch();

  useEffect(() => {
    loadStates(dispatch);
  }, []);

  const text = useSelector((state: any) => state.text.value);
  const textColor = useSelector((state: any) => state.textColor.value);
  const textSize = useSelector((state: any) => state.textSize.value);
  const textSpacing = useSelector((state: any) => state.textSpacing.value);
  const textFont = useSelector((state: any) => state.textFont.value);
  const textHMargin = useSelector((state: any) => state.textHMargin.value);
  const textVMargin = useSelector((state: any) => state.textVMargin.value);

  const bgImageFiles = useSelector((state: any) => state.bgImageFiles.value);
  const bgImageIndex = useSelector((state: any) => state.bgImageIndex.value);
  const bgImageSize = useSelector((state: any) => state.bgImageSize.value);
  const bgImageRepeat = useSelector((state: any) => state.bgImageRepeat.value);

  const showIsEnabled = useSelector((state: any) => state.showIsEnabled.value);
  const showIsRandom = useSelector((state: any) => state.showIsRandom.value);
  const showInterval = useSelector((state: any) => state.showInterval.value);

  const slideshowTimer = useRef(setInterval(() => {}, 0));
  const bgImageFilesLengthRef = useRef(bgImageFiles.length);
  bgImageFilesLengthRef.current = bgImageFiles.length;

  useEffect(() => {
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
  }, [showInterval, showIsEnabled, showIsRandom, bgImageFiles]);

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
