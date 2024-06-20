import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { set as setSize } from "@/store/bgImageSizeSlice";
import { set as setRepeat } from "@/store/bgImageRepeatSlice";

export default function OptionBgLayout(): JSX.Element {
  const dispatch = useDispatch();

  enum Layout {
    Cover,
    Contain,
    Original,
    Tile,
    Fill,
  }

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>): void {
    switch (e.target.value) {
      case Layout.Cover.toString():
        dispatch(setSize("cover"));
        dispatch(setRepeat("no-repeat"));
        return;
      case Layout.Contain.toString():
        dispatch(setSize("contain"));
        dispatch(setRepeat("no-repeat"));
        return;
      case Layout.Original.toString():
        dispatch(setSize("auto"));
        dispatch(setRepeat("no-repeat"));
        return;
      case Layout.Tile.toString():
        dispatch(setSize("auto"));
        dispatch(setRepeat("repeat"));
        return;
      case Layout.Fill.toString():
        dispatch(setSize("contain"));
        dispatch(setRepeat("repeat"));
        return;
      default:
        throw TypeError("No such background layout type!");
    }
  }

  return (
    <select className="menu-item select" onChange={handleDropdownSelect}>
      <option value={Layout.Cover}>cover</option>
      <option value={Layout.Contain}>contain</option>
      <option value={Layout.Original}>original size</option>
      <option value={Layout.Tile}>tile</option>
      <option value={Layout.Fill}>fill and repeat</option>
    </select>
  );
}