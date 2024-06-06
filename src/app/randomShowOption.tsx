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
    <tr>
      <td>
        <label htmlFor="randomize-button" className="place-content-center">
          Randomize slideshow:
        </label>{" "}
      </td>

      <td>
        <input
          id="randomize-button"
          type="checkbox"
          onChange={handleChange}
        />{" "}
      </td>
    </tr>
  );
}

export default RandomShowOption;
