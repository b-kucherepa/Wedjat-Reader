import { StateName } from "@/common/constants";

import useSelectorValuesRouter from "@/hooks/useSelectorValuesRouter";
import useCounter from "@/hooks/useCounter";

export default function OptionTextSpacing() {
  const storeValues = useSelectorValuesRouter(StateName.TEXT_SIZE);
  const [handleChange, handleDecrement, handleIncrement] = useCounter(
    StateName.TEXT_SIZE
  );

  return (
    <div className="inline">
      <button className="menu-item counter-arrow" onClick={handleDecrement}>
        {"←"}
      </button>
      <input
        type="text"
        pattern="\d*"
        maxLength={3}
        value={storeValues[StateName.TEXT_SIZE]}
        className="menu-item counter"
        onChange={(e) => handleChange(parseInt(e.target.value))}
      />
      <button className="menu-item counter-arrow" onClick={handleIncrement}>
        {"→"}
      </button>
    </div>
  );
}
