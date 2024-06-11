import { ChangeEvent, useContext } from "react";
import { SlideshowContext } from "./page";

function RandomShowOption() {
  const showContext = useContext(SlideshowContext);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    showContext.setValues({
      ...showContext.values,
      isRandom: e.target.checked,
    });
  }

  return (
    <input id="randomize-button" type="checkbox" onChange={handleChange} />
  );
}

export default RandomShowOption;