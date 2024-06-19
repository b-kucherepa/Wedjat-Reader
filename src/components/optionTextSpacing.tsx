import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, set } from "@/store/textSpacingSlice";

function OptionTextSpacing() {
  const spacing = useSelector((state: any) => state.textSpacing.value);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch(set(parseInt(e.target.value)));
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
        maxLength={3}
        value={spacing.toFixed(1)}
        className="menu-item counter"
        onChange={handleChange}
      />
      <button className="menu-item counter-arrow" onClick={handleIncrement}>
        {"→"}
      </button>
    </div>
  );
}

export default OptionTextSpacing;
