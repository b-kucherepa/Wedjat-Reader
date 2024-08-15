import { StateName } from "@/common/constants";

import useSelectorValuesRouter from "@/hooks/useSelectorValuesRouter";
import useCounter from "@/hooks/useCounter";

export default function OptionTextSpacing() {
  const storeValues = useSelectorValuesRouter(StateName.SHOW_IS_RANDOM);
  const [handleChange] = useCounter(StateName.SHOW_IS_RANDOM);

  return (
    <div className="inline">
      <button
        className="menu-item counter-arrow"
        onClick={() => handleChange(!storeValues[StateName.SHOW_IS_RANDOM])}
      >
        {"←"}
      </button>
      <input
        type="text"
        pattern="\d*"
        maxLength={3}
        value={storeValues[StateName.SHOW_IS_RANDOM] ? "random" : "next"}
        className="menu-item counter"
        readOnly={true}
      />
      <button
        className="menu-item counter-arrow"
        onClick={() => handleChange(!storeValues[StateName.SHOW_IS_RANDOM])}
      >
        {"→"}
      </button>
    </div>
  );
}
