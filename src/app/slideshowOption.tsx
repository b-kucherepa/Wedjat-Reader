import { ChangeEvent, useContext } from "react";
import { SlideshowContext } from "./page";

function SlideshowOption(props: any) {
  const context = useContext(SlideshowContext);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    context.setValues({
      ...context.values,
      isRandom: e.target.checked,
    });
  }

  return (
    <div>
      <label>
        Randomize slideshow: <input type="checkbox" onChange={handleChange} />
      </label>
    </div>
  );
}

export default SlideshowOption;
