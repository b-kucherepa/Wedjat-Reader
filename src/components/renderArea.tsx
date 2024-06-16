import { useContext, useEffect, useRef } from "react";
import { BgContext } from "../contexts/bgContext";
import { TextContext } from "../contexts/textContext";
import { Swipe, SwipeHandler } from "@/common/customClasses";
import { getScreenPercentSize, shiftArrayIndexInLoop } from "@/common/utils";

function RenderArea(props: any) {
  const textContext = useContext(TextContext);
  const bgContext = useContext(BgContext);
  const bgContextRef = useRef(bgContext);
  bgContextRef.current = bgContext;

  useEffect(() => {
    const SWIPE_WIDTH: number = 35;

    const swipeHandler = new SwipeHandler(document);

    function handleSwipeEnd(e: CustomEvent): void {
      console.log(bgContextRef.current.values);
      if (Math.abs(e.detail.xDistance) > getScreenPercentSize(SWIPE_WIDTH)) {
        if (e.detail.swipe === Swipe.Right) {
          bgContext.setValues({
            ...bgContextRef.current.values,
            imageIndex: shiftArrayIndexInLoop(
              bgContextRef.current.values.bgImages.length,
              bgContextRef.current.values.imageIndex,
              1
            ),
          });
        } else if (e.detail.swipe === Swipe.Left) {
          bgContext.setValues({
            ...bgContextRef.current.values,
            imageIndex: shiftArrayIndexInLoop(
              bgContextRef.current.values.bgImages.length,
              bgContextRef.current.values.imageIndex,
              -1
            ),
          });
        }
      }
    }

    document.addEventListener("swipeend", (e) =>
      handleSwipeEnd(e as CustomEvent)
    );
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
      <div>
        {textContext.values.text}
      </div>
    </div>
  );
}

export default RenderArea;
