import { StateName, StoreActions } from "@/common/constants";

import { ChangeEvent } from "react";

import useSelectorValuesRouter from "@/hooks/useSelectorValuesRouter";
import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function OptionTextColor() {
  const storeValues = useSelectorValuesRouter(StateName.TEXT_COLOR);
  const dispatch = useDispatchRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    storeValues[StateName.TEXT_COLOR];
    dispatch(StateName.TEXT_COLOR, StoreActions.SET, e.target.value);
  }

  return (
    <input
      type="color"
      value={storeValues[StateName.TEXT_COLOR]}
      className="menu-item color-picker"
      onChange={handleChange}
    />
  );
}
