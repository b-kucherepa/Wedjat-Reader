import { MILLISECONDS_IN_SECONDS, StateName } from "@/common/constants";

import useSelectorValuesRouter from "@/hooks/useSelectorValuesRouter";
import useCounter from "@/hooks/useCounter";

export default function OptionTextSpacing() {
  const storeValues = useSelectorValuesRouter(StateName.SHOW_INTERVAL);
  const [handleChange, handleDecrement, handleIncrement] = useCounter(
    StateName.SHOW_INTERVAL
  );

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
        onChange={(e) =>
          handleChange(parseInt(e.target.value) * MILLISECONDS_IN_SECONDS)
        }
      />
      <button className="menu-item counter-arrow" onClick={handleIncrement}>
        {"→"}
      </button>
    </div>
  );
}
