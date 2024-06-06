import { ChangeEvent, ReactElement, useContext } from "react";
import { RenderContext } from "./page";
import { formatBytes } from "./utils";
import BgSort from "./bgSort";

function BgSelect(): JSX.Element {
  const context = useContext(RenderContext);

  const options: ReactElement[] = context.values.bgImages.map(
    (image, index) => {
      const date = new Date(image.modified);
      return (
        <option key={`option-${index}`} value={index}>
          {image.name},
          size: {formatBytes(image.size)}, 
          last modified: {date.toLocaleString()};
        </option>
      );
    }
  );

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>): void {
    context.setValues({
      ...context.values,
      imageIndex: parseInt(e.target.value),
    });
  }

  return (
    <tr>
      <td>
        <label htmlFor="bgList" className="place-content-center">
          Select background:{" "}
        </label>
      </td>
      <td>
        <div className="flex flex-row">
          <select
            id="bgList"
            className="w-full h-auto bg-black shrink text-pretty truncate"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${
                context.values.bgImages[context.values.imageIndex]?.file ?? ""
              })`,
            }}
            onChange={handleDropdownSelect}
            value={context.values.imageIndex}
          >
            {options}
          </select>
          <BgSort />
        </div>
      </td>
    </tr>
  );
}

export default BgSelect;
