import { ChangeEvent, useContext } from "react";
import { SlideshowContext } from "./page";

function RandomShowOption() {
  const context = useContext(SlideshowContext);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    context.setValues({
      ...context.values,
      isRandom: e.target.checked,
    });
  }

  return (
    <input id="randomize-button" type="checkbox" onChange={handleChange} />
  );
}

export default RandomShowOption;
