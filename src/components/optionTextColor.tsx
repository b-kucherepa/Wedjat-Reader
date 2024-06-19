import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "@/store/textColorSlice";

function OptionTextColor () {
  const color = useSelector((state: any) => state.textColor.value);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch (set(e.target.value));
  }

  return (
    <input id="interval-number" type="color" value={color} onChange={handleChange} className="menu-option"/>
  );
}

export default OptionTextColor;