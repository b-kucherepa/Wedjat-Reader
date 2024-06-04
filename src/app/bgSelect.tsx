import { ChangeEvent, useContext } from "react";
import { RenderContext } from "./page";

function BgSelect(): JSX.Element {
  const context = useContext(RenderContext);

  const options = context.values.bgImages.map((image, index) => {
    return (
      <option
        key={`option-${index}`}
        value={index}
        selected={index === context.values.imageIndex}
      >
        {image.name}
      </option>
    );
  });

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>): void {
    context.setValues({
      ...context.values,
      imageIndex: e.target.value,
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
            context.values.bgImages[context.values.imageIndex].file
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
