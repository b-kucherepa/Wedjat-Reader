import { ChangeEvent, useContext } from "react";
import { RenderContext } from "./page";

function BgSelect(): JSX.Element {
  const context = useContext(RenderContext);

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>): void {
    context.setValues({
      text: context.values.text,
      bgImages: context.values.bgImages,
      imageIndex: e.target.value,
    });
    console.log(e.target.value);
  }

  return (
    <>
      <select
        id="bgList"
        className="size-36 bg-black"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${
            context.values.bgImages[context.values.imageIndex][0]
          })`,
        }}
        onChange={handleDropdownSelect}
      >
        {context.values.bgImages.map((image, index) => {
          return (
            <option key={`option-${index}`} value={index}>
              {image[1]}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default BgSelect;
