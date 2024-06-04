import { ChangeEvent, ReactElement, useContext } from "react";
import { RenderContext } from "./page";

function BgSelect(): JSX.Element {
  const context = useContext(RenderContext);

  const options: ReactElement[] = context.values.bgImages.map((image, index) => {
    const date = new Date(image.modified)
    return (
      <option
        key={`option-${index}`}
        value={index}
        selected={index === context.values.imageIndex}
      >
        {image.name}, last modified: {date.toLocaleString()};
      </option>
    );
  });

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>): void {
    context.setValues({
      ...context.values,
      imageIndex: parseInt(e.target.value),
    });
  }

  return (
    <div>
      <select
        id="bgList"
        className="size-36 bg-black"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${
            context.values.bgImages[context.values.imageIndex]?.file??""
          })`,
        }}
        onChange={handleDropdownSelect}
      >
        {options}
      </select>
    </div>
  );
}

export default BgSelect;
