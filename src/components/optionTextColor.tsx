import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { set } from "@/store/textColorSlice";

function OptionTextColor (props: any) {
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch (set(e.target.value));
  }

  return (
    <input id="interval-number" type="color" onChange={handleChange} className="menu-option"/>
  );
}

export default OptionTextColor;