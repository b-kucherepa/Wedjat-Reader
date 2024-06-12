import { useContext } from "react";
import { SlideshowContext } from "@/contexts/slideshowContext";

function BtnShowStart(props: any) {
  const showContext = useContext(SlideshowContext);

  return (
    <button
      id="start-slideshow-button"
      className="border-black bg-white text-black px-2 py-0.5"
      type="button"
      onClick={() =>
        showContext.setValues({
          ...showContext.values,
          isEnabled: !showContext.values.isEnabled,
        })
      }
    >
      {showContext.values.isEnabled ? "Stop" : "Start"}
    </button>
  );
}

export default BtnShowStart;
