import { ChangeEvent, useContext } from "react";
import { SlideshowContext } from "@/contexts/slideshowContext";

function OptionShowInterval() {
  const showContext = useContext(SlideshowContext);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    showContext.setValues({
      ...showContext.values,
      interval: parseInt(e.target.value)*1000,
    });
  }

  return (
    <input id="interval-number" type="number" value={showContext.values.interval/1000} min={1} max={3600} onChange={handleChange} className="bg-black"/>
  );
}

export default OptionShowInterval;
