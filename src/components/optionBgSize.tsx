import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { set as setSize } from "@/store/bgImageSizeSlice";
import { set as setRepeat } from "@/store/bgImageRepeatSlice";

function OptionBgSize(): JSX.Element {
  const dispatch = useDispatch();

  enum Size {
    Cover,
    Contain,
    Original,
    Tile,
    Fill,
  }

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>): void {
    switch (e.target.value) {
      case Size.Cover.toString():
        dispatch(setSize("cover"));
        dispatch(setRepeat("no-repeat"));
        return;
      case Size.Contain.toString():
        dispatch(setSize("contain"));
        dispatch(setRepeat("no-repeat"));
        return;
      case Size.Original.toString():
        dispatch(setSize("auto"));
        dispatch(setRepeat("no-repeat"));
        return;
      case Size.Tile.toString():
        dispatch(setSize("auto"));
        dispatch(setRepeat("repeat"));
        return;
      case Size.Fill.toString():
        dispatch(setSize("contain"));
        dispatch(setRepeat("repeat"));
        return;
      default:
        throw "Error: no such background size type!";
    }
  }

  return (
    <select className="menu-option" onChange={handleDropdownSelect}>
      <option value={Size.Cover}>cover</option>
      <option value={Size.Contain}>contain</option>
      <option value={Size.Original}>original size</option>
      <option value={Size.Tile}>tile</option>
      <option value={Size.Fill}>fill and repeat</option>
    </select>
  );
}

export default OptionBgSize;
