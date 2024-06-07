import { useContext } from "react";
import { SlideshowContext } from "./page";

function ShowStart(props: any) {
  const context = useContext(SlideshowContext);

  return (
    <button
      id="start-slideshow-button"
      className="font-bold"
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
  );
}

export default ShowStart;
