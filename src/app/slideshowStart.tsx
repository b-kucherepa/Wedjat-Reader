import { useContext } from "react";
import { SlideshowContext } from "./page";

function SlideshowStart(props: any) {
  const context = useContext(SlideshowContext);

  return (
    <div>
      <label>
        Slideshow: 
        <button
          type="button"
          onClick={() =>
            context.setValues({
              ...context.values,
              isEnabled: !context.values.isEnabled,
            })
          }
        >
          {context.values.isEnabled ? "stop" : "start"}
        </button>
      </label>
    </div>
  );
}

export default SlideshowStart;
