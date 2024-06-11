import { ChangeEvent, ReactElement, useContext } from "react";
import { BgContext } from "./page";

function BgSize(): JSX.Element {
  const bgContext = useContext(BgContext);

  enum Size {
    Cover,
    Contain,
    Original,
    Tile,
    Fill,
  }

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>): void {
    let size = "cover";
    let repeat = "no-repeat";
    switch (e.target.value) {
      case Size.Cover.toString():
        size = "cover";
        repeat = "no-repeat";
        break;
      case Size.Contain.toString():
        size = "contain";
        repeat = "no-repeat";
        break;
      case Size.Original.toString():
        size = "auto";
        repeat = "no-repeat";
        break;
      case Size.Tile.toString():
        size = "auto";
        repeat = "repeat";
        break;
      case Size.Fill.toString():
        size = "contain";
        repeat = "repeat";
        break;
      default:
        throw "Error: no such background size type!";
    }

    bgContext.setValues({
      ...bgContext.values,
      size: size,
      repeat: repeat,
    });
  }

  return (
    <select
      className="w-full bg-black shrink text-pretty truncate grow"
      onChange={handleDropdownSelect}
    >
      <option value={Size.Cover}>cover</option>
      <option value={Size.Contain}>contain</option>
      <option value={Size.Original}>original size</option>
      <option value={Size.Tile}>tile</option>
      <option value={Size.Fill}>fill and repeat</option>
    </select>
  );
}

export default BgSize;
