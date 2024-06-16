import { ChangeEvent, useContext } from "react";
import { SlideshowContext } from "@/contexts/slideshowContext";

function OptionShowRandom() {
  const showContext = useContext(SlideshowContext);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    showContext.setValues({
      ...showContext.values,
      isRandom: e.target.checked,
    });
  }

  return (
    <input id="randomize-button" type="checkbox" className="menu-option" onChange={handleChange} />
  );
}

export default OptionShowRandom;