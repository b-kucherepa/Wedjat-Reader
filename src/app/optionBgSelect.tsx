import { ChangeEvent, ReactElement, useContext } from "react";
import { BgContext } from "./page";
import { formatBytes } from "./utils";

function OptionBgSelect(): JSX.Element {
  const bgContext = useContext(BgContext);

  const options: ReactElement[] = bgContext.values.bgImages.map(
    (image, index) => {
      const date = new Date(image.modified);
      return (
        <option key={`option-${index}`} value={index}>
          {image.name}, size: {formatBytes(image.size)}, last modified:{" "}
          {date.toLocaleString()};
        </option>
      );
    }
  );

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>): void {
    bgContext.setValues({
      ...bgContext.values,
      imageIndex: parseInt(e.target.value),
    });
  }

  return (
    <select
      id="bgList"
      className="w-full h-full bg-black shrink text-pretty truncate grow"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${
          bgContext.values.bgImages[bgContext.values.imageIndex]?.file ?? ""
        })`,
      }}
      onChange={handleDropdownSelect}
      value={bgContext.values.imageIndex}
    >
      {options}
    </select>
  );
}

export default OptionBgSelect;
