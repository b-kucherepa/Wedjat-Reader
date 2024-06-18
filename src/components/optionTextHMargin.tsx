import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, set } from "@/store/textHMarginSlice";

function OptionTextHMargin() {
  const hMargin = useSelector((state: any) => state.textHMargin.value);
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
      <button className="menu-option" onClick={handleDecrement}>{"←"}</button>
      <input
        id="interval-number"
        type="number"
        value={hMargin}
        min={0}
        max={999}
        onChange={handleChange}
        className="menu-option center"
      />
      <button className="menu-option" onClick={handleIncrement}>{"→"}</button>
    </div>
  );
}

export default OptionTextHMargin;
