import { useContext } from "react";
import { SlideshowContext } from "@/contexts/slideshowContext";

function BtnShowStart(props: any) {
  const showContext = useContext(SlideshowContext);

  return (
    <button
      id="start-slideshow-button"
      className="menu-item bordered"
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
