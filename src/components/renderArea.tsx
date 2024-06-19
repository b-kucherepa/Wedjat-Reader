import { useEffect, useRef } from "react";
import { Swipe } from "@/common/customClasses";
import {
  generateRandomBetween,
  getScreenPercentSize,
  shiftArrayIndexInLoop,
} from "@/common/utils";
import { CLICK_MARGIN_PERCENTAGE, DEFAULT_BG_IMAGE } from "@/common/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  increment as incrementImageIndex,
  decrement as decrementImageIndex,
  randomize as randomizeImageIndex,
  set as setImageIndex,
} from "@/store/bgImageIndexSlice";

function RenderArea() {
  const dispatch = useDispatch();

  const text = useSelector((state: any) => state.text.value);
  const textColor = useSelector((state: any) => state.textColor.value);
  const textSize = useSelector((state: any) => state.textSize.value);
  const textHMargin = useSelector((state: any) => state.textHMargin.value);
  const textVMargin = useSelector((state: any) => state.textVMargin.value);

  const bgImageFiles = useSelector((state: any) => state.bgImageFiles.value);
  const bgImageIndex = useSelector((state: any) => state.bgImageIndex.value);
  const bgImageSize = useSelector((state: any) => state.bgImageSize.value);
  const bgImageRepeat = useSelector((state: any) => state.bgImageRepeat.value);

  const showIsEnabled = useSelector((state: any) => state.showIsEnabled.value);
  const showIsRandom = useSelector((state: any) => state.showIsRandom.value);
  const showInterval = useSelector((state: any) => state.showInterval.value);

  const slideshowTimer = useRef(setTimeout(() => {}, 0));

  useEffect(() => {
    function handleSwipeEnd(e: CustomEvent): void {
      if (e.detail.swipe === Swipe.Right) {
        dispatch(decrementImageIndex(bgImageFiles.length));
      } else if (e.detail.swipe === Swipe.Left) {
        dispatch(incrementImageIndex(bgImageFiles.length));
      }
    }

    function handleClick(e: MouseEvent): void {
      const isLeftSideTouch: boolean =
        e.clientX <= getScreenPercentSize(CLICK_MARGIN_PERCENTAGE, false);
      const isRightSideTouch: boolean =
        e.clientX >= getScreenPercentSize(-CLICK_MARGIN_PERCENTAGE, false);

      if (isLeftSideTouch) {
        dispatch(decrementImageIndex(bgImageFiles.length));
      }

      if (isRightSideTouch) {
        dispatch(incrementImageIndex(bgImageFiles.length));
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
      slideshowTimer.current = setTimeout(() => {
        if (showIsRandom) {
          dispatch(randomizeImageIndex(bgImageFiles.length));
        } else {
          dispatch(incrementImageIndex(bgImageFiles.length));
        }
      }, showInterval);
    }
  }, [showInterval, showIsEnabled, showIsRandom, bgImageFiles, bgImageIndex]);

  return (
    <div
      id="renderArea"
      className="render-area"
      style={{
        backgroundImage: `url(${
          bgImageFiles.length > 0
            ? bgImageFiles[bgImageIndex].file
            : DEFAULT_BG_IMAGE.file
        })`,
        backgroundSize: bgImageSize,
        backgroundRepeat: bgImageRepeat,

        color: textColor,
        fontSize: textSize,
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

export default RenderArea;
