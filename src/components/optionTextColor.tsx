import { ChangeEvent, useContext } from "react";
import { TextContext } from "@/contexts/textContext";
import { useDispatch } from "react-redux";
import { set } from "@/store/textColorSlice";

function OptionTextColor (props: any) {
  const textContext = useContext(TextContext);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch (set(e.target.value));
    textContext.setValues({
      ...textContext.values,
      color: e.target.value,
    });
  }

  return (
    <input id="interval-number" type="color" onChange={handleChange} className="menu-option"/>
  );
}

export default OptionTextColor;