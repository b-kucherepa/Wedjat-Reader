import { MILLISECONDS_IN_SECONDS } from "@/common/constants";

import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, set } from "@/store/showIntervalSlice";

function OptionShowInterval() {
  const interval = useSelector((state: any) => state.showInterval.value);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch(set(parseInt(e.target.value) * MILLISECONDS_IN_SECONDS));
  }

  function handleDecrement(): void {
    dispatch(decrement());
  }

  function handleIncrement(): void {
    dispatch(increment());
  }

  return (
    <div className="inline">
      <button className="menu-item counter-arrow" onClick={handleDecrement}>
        {"←"}
      </button>
      <input
        type="text"
        pattern="\d*"
        maxLength={4}
        value={interval / MILLISECONDS_IN_SECONDS}
        className="menu-item counter"
        onChange={handleChange}
      />
      <button className="menu-item counter-arrow" onClick={handleIncrement}>
        {"→"}
      </button>
    </div>
  );
}

export default OptionShowInterval;
