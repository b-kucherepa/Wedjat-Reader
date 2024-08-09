import { StateName, StoreActions } from "@/common/constants";

import useSelectorValuesManager from "@/hooks/useSelectorValuesRouter";
import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function BtnShowEnable() {
  const storeValues = useSelectorValuesManager(StateName.SHOW_IS_ENABLED);
  const dispatch = useDispatchRouter();

  function handleClick(): void {
    dispatch(
      StateName.SHOW_IS_ENABLED,
      StoreActions.SET,
      !storeValues[StateName.SHOW_IS_ENABLED]
    );

    if (!storeValues[StateName.SHOW_IS_ENABLED]) {
      dispatch(StateName.MENU_STATE, StoreActions.CLOSE);
    }
  }

  return (
    <button
      type="button"
      className="menu-item btn bordered"
      onClick={handleClick}
    >
      {storeValues[StateName.SHOW_IS_ENABLED] ? "Stop" : "Start"}
    </button>
  );
}
