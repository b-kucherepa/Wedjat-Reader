import { ChangeEvent, useContext } from "react";
import { SlideshowContext } from "./page";

function IntervalShowOption() {
  const context = useContext(SlideshowContext);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    context.setValues({
      ...context.values,
      interval: parseInt(e.target.value)*1000,
    });
  }

  return (
    <input id="interval-number" type="number" value={context.values.interval/1000} min={1} max={3600} onChange={handleChange} className="bg-black"/>
  );
}

export default IntervalShowOption;
