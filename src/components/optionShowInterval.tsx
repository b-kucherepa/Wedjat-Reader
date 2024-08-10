import {
  MILLISECONDS_IN_SECONDS,
  StateName,
  StoreActions,
} from "@/common/constants";

import { ChangeEvent } from "react";

import useSelectorValuesRouter from "@/hooks/useSelectorValuesRouter";
import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function OptionShowInterval() {
  const storeValues = useSelectorValuesRouter(StateName.SHOW_INTERVAL);
  const dispatch = useDispatchRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    dispatch(
      StateName.SHOW_INTERVAL,
      StoreActions.SET,
      parseInt(e.target.value) * MILLISECONDS_IN_SECONDS
    );
  }

  function handleDecrement(): void {
    dispatch(StateName.SHOW_INTERVAL, StoreActions.DECREMENT);
  }

  function handleIncrement(): void {
    dispatch(StateName.SHOW_INTERVAL, StoreActions.INCREMENT);
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
        value={storeValues[StateName.SHOW_INTERVAL] / MILLISECONDS_IN_SECONDS}
        className="menu-item counter"
        onChange={handleChange}
      />
      <button className="menu-item counter-arrow" onClick={handleIncrement}>
        {"→"}
      </button>
    </div>
  );
}
