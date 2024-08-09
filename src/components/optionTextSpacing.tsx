import { StateName, StoreActions } from "@/common/constants";

import { ChangeEvent } from "react";

import useSelectorValuesManager from "@/hooks/useSelectorValuesRouter";
import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function OptionTextSpacing() {
  const storeValues = useSelectorValuesManager(StateName.TEXT_SPACING);
  const dispatch = useDispatchRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch(
      StateName.TEXT_SPACING,
      StoreActions.SET,
      parseInt(e.target.value)
    );
  }

  function handleDecrement(): void {
    dispatch(StateName.TEXT_SPACING, StoreActions.DECREMENT);
  }

  function handleIncrement(): void {
    dispatch(StateName.TEXT_SPACING, StoreActions.INCREMENT);
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
        value={storeValues[StateName.TEXT_SPACING].toFixed(1)}
        className="menu-item counter"
        onChange={handleChange}
      />
      <button className="menu-item counter-arrow" onClick={handleIncrement}>
        {"→"}
      </button>
    </div>
  );
}
