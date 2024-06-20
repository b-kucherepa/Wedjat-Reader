import { useDispatch, useSelector } from "react-redux";
import { set } from "@/store/showIsEnabledSlice";

export default function BtnShowStart() {
  const isEnabled = useSelector((state: any) => state.showIsEnabled.value);
  const dispatch = useDispatch();

  function handleClick(): void {
    dispatch(set(!isEnabled));
  }

  return (
    <button type="button" className="menu-item btn bordered" onClick={handleClick}>
      {isEnabled ? "Stop" : "Start"}
    </button>
  );
}