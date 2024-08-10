import { StateName, StoreActions } from "@/common/constants";

import { ChangeEvent } from "react";

import useSelectorValuesRouter from "@/hooks/useSelectorValuesRouter";
import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function OptionTextHMargin() {
  const dispatch = useDispatchRouter();

  const storeValues = useSelectorValuesRouter(StateName.TEXT_MARGIN_H);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch(
      StateName.TEXT_MARGIN_H,
      StoreActions.SET,
      parseInt(e.target.value)
    );
  }

  function handleDecrement(): void {
    dispatch(StateName.TEXT_MARGIN_H, StoreActions.DECREMENT);
  }

  function handleIncrement(): void {
    dispatch(StateName.TEXT_MARGIN_H, StoreActions.INCREMENT);
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
        value={storeValues[StateName.TEXT_MARGIN_H]}
        className="menu-item counter"
        onChange={handleChange}
      />
      <button className="menu-item counter-arrow" onClick={handleIncrement}>
        {"→"}
      </button>
    </div>
  );
}
