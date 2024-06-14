import { ChangeEvent, useContext } from "react";
import { TextContext } from "@/contexts/textContext";
import { getScreenPercentSize } from "@/common/utils";

function OptionTextHMargin() {
  const textContext = useContext(TextContext);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    textContext.setValues({
      ...textContext.values,
      hMargin: parseInt(e.target.value),
    });
  }

  return (
    <input id="interval-number" type="number" value={textContext.values.hMargin} min={0} max={150} onChange={handleChange} className="bg-black"/>
  );
}

export default OptionTextHMargin;
