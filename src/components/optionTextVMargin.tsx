import { ChangeEvent, useContext } from "react";
import { TextContext } from "@/contexts/textContext";
import { getScreenPercentSize } from "@/common/utils";

function OptionTextVMargin() {
  const textContext = useContext(TextContext);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    textContext.setValues({
      ...textContext.values,
      vMargin: parseInt(e.target.value),
    });
  }

  return (
    <input id="interval-number" type="number" value={textContext.values.vMargin} min={0} max={150} onChange={handleChange} className="bg-black"/>
  );
}

export default OptionTextVMargin;
