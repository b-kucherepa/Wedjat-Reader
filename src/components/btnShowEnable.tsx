import { NAME_SHOW_IS_ENABLED } from "@/common/constants";

import { useDispatch, useSelector } from "react-redux";
import { set } from "@/store/showIsEnabledSlice";

import { close } from "@/store/menuStateSlice";

export default function BtnShowEnable() {
  const isEnabled = useSelector(
    (state: any) => state[NAME_SHOW_IS_ENABLED].value
  );

  const dispatch = useDispatch();

  function handleClick(): void {
    dispatch(set(!isEnabled));
    if (!isEnabled) {
      dispatch(close());
    }
  }

  return (
    <button
      type="button"
      className="menu-item btn bordered"
      onClick={handleClick}
    >
      {isEnabled ? "Stop" : "Start"}
    </button>
  );
}
