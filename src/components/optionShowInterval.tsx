import { ChangeEvent } from "react";
import { decrement, increment, set } from "@/store/showIntervalSlice";
import { useSelector, useDispatch } from "react-redux";
import { MILLISECONDS_IN_SECONDS } from "@/common/constants";

function OptionShowInterval() {
  const interval = useSelector((state: any) => state.showInterval.value);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch(set(parseInt(e.target.value)*MILLISECONDS_IN_SECONDS));
  }

  function handleDecrement(): void {
    dispatch(decrement());
  }

  function handleIncrement(): void {
    dispatch(increment());
  }

  return (
    <div className="inline">
      <button className="menu-option" onClick={handleDecrement}>{"←"}</button>
      <input
        id="interval-number"
        type="number"
        value={interval/MILLISECONDS_IN_SECONDS}
        min={1}
        max={9999}
        onChange={handleChange}
        className="menu-option center"
      />
      <button className="menu-option" onClick={handleIncrement}>{"→"}</button>
    </div>
  );
}

export default OptionShowInterval;
