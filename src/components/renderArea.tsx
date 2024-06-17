import { useContext, useEffect, useRef } from "react";
import { BgContext } from "../contexts/bgContext";
import { TextContext } from "../contexts/textContext";
import { Swipe } from "@/common/customClasses";
import { getScreenPercentSize, shiftArrayIndexInLoop } from "@/common/utils";
import { CLICK_MARGIN_PERCENTAGE } from "@/common/constants";

function RenderArea(props: any) {
  const textContext = useContext(TextContext);
  const bgContext = useContext(BgContext);
  const bgContextRef = useRef(bgContext);
  bgContextRef.current = bgContext;

  useEffect(() => {

    function setNextImage(isReversed: boolean) {
      const step = isReversed ? -1 : 1;

      bgContext.setValues({
        ...bgContextRef.current.values,
        imageIndex: shiftArrayIndexInLoop(
          bgContextRef.current.values.bgImages.length,
          bgContextRef.current.values.imageIndex,
          step
        ),
      });
    }

    function handleSwipeEnd(e: CustomEvent): void {
        if (e.detail.swipe === Swipe.Right) {
          setNextImage(false);
        } else if (e.detail.swipe === Swipe.Left) {
          setNextImage(true);
        }
    }

    function handleClick(e: MouseEvent): void {
      const isLeftSideTouch: boolean =
        e.clientX <= getScreenPercentSize(CLICK_MARGIN_PERCENTAGE, false);
      const isRightSideTouch: boolean =
        e.clientX >= getScreenPercentSize(-CLICK_MARGIN_PERCENTAGE, false);

      if (isLeftSideTouch) {
        setNextImage(true);
      }

      if (isRightSideTouch) {
        setNextImage(false);
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

  return (
    <div
      id="renderArea"
      className="render-area"
      style={{
        backgroundImage: `url(${
          bgContext.values.bgImages[bgContext.values.imageIndex].file
        })`,
        backgroundSize: bgContext.values.size,
        backgroundRepeat: bgContext.values.repeat,

        color: textContext.values.color,
        fontSize: textContext.values.size,
        paddingLeft: `${textContext.values.hMargin}px`,
        paddingRight: `${textContext.values.hMargin}px`,
        paddingTop: `${textContext.values.vMargin}px`,
        paddingBottom: `${textContext.values.vMargin}px`,
      }}
    >
      <div>{textContext.values.text}</div>
    </div>
  );
}

export default RenderArea;
