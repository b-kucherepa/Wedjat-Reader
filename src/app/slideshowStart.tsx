import { useContext } from "react";
import { SlideshowContext } from "./page";

function SlideshowStart(props: any) {
  const context = useContext(SlideshowContext);

  return (
    <tr>
      <td>
        <label
          htmlFor="start-slideshow-button"
          className="place-content-center"
        >
          Slideshow:{" "}
        </label>{" "}
      </td>

      <td>
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
        </button>{" "}
      </td>
    </tr>
  );
}

export default SlideshowStart;
