import { ChangeEvent, useContext } from "react";
import { TextContext } from "@/contexts/textContext";

function OptionTextSize (props: any) {
  const textContext = useContext(TextContext);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    textContext.setValues({
      ...textContext.values,
      size: parseInt(e.target.value),
    });
  }

  return (
    <input id="interval-number" type="number" value={textContext.values.size} min={4} max={256} onChange={handleChange} className="menu-option"/>
  );
}

export default OptionTextSize;