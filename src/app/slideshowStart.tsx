import { useContext } from "react";
import { SlideshowContext } from "./page";

function SlideshowStart(props: any) {
  const context = useContext(SlideshowContext);

  return (
    <>
      <label>
        Slideshow:
        <button
          type="button"
          onClick={() =>
            context.setValues({
              interval: context.values.interval,
              isEnabled: !context.values.isEnabled,
              isRandom: context.values.isRandom,
            })
          }
        >
          {context.values.isEnabled ? "stop" : "start"}
        </button>
      </label>
    </>
  );
}

export default SlideshowStart;
