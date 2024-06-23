import { NAME_TEXT_COLOR } from "@/common/constants";

import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { set } from "@/store/textColorSlice";

export default function OptionTextColor() {
  const color = useSelector((state: any) => state[NAME_TEXT_COLOR].value);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch(set(e.target.value));
  }

  return (
    <input
      type="color"
      value={color}
      className="menu-item color-picker"
      onChange={handleChange}
    />
  );
}
