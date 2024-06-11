import { useContext } from "react";
import { SlideshowContext } from "./page";

function OptionShowStart(props: any) {
  const showContext = useContext(SlideshowContext);

  return (
    <button
      id="start-slideshow-button"
      className="font-bold"
      type="button"
      onClick={() =>
        showContext.setValues({
          ...showContext.values,
          isEnabled: !showContext.values.isEnabled,
        })
      }
    >
      {showContext.values.isEnabled ? "stop" : "start"}
    </button>
  );
}

export default OptionShowStart;
