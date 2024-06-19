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
    <input type="color" value={color} className="menu-item color-picker" onChange={handleChange}/>
  );
}

export default OptionTextColor;