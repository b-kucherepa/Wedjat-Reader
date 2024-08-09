import { StateName, StoreActions } from "@/common/constants";

import useSelectorValuesManager from "@/hooks/useSelectorValuesRouter";
import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function OptionShowRandom() {
  const storeValues = useSelectorValuesManager(StateName.SHOW_IS_RANDOM);
  const dispatch = useDispatchRouter();

  function handleChange(): void {
    dispatch(
      StateName.SHOW_INTERVAL,
      StoreActions.SET,
      !storeValues[StateName.SHOW_IS_RANDOM]
    );
  }

  return (
    <div className="inline">
      <button className="menu-item counter-arrow" onClick={handleChange}>
        {"←"}
      </button>
      <input
        type="text"
        pattern="\d*"
        maxLength={3}
        value={storeValues[StateName.SHOW_IS_RANDOM] ? "random" : "next"}
        className="menu-item counter"
        onChange={handleChange}
      />
      <button className="menu-item counter-arrow" onClick={handleChange}>
        {"→"}
      </button>
    </div>
  );
}
