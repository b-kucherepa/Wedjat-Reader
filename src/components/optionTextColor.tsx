import { ChangeEvent, useContext } from "react";
import { TextContext } from "@/contexts/textContext";

function OptionTextColor (props: any) {
  const textContext = useContext(TextContext);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    textContext.setValues({
      ...textContext.values,
      color: e.target.value,
    });
  }

  return (
    <input id="interval-number" type="color" onChange={handleChange} className="bg-black"/>
  );
}

export default OptionTextColor;