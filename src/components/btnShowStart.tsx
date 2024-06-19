import { useDispatch, useSelector } from "react-redux";
import { set } from "@/store/showIsEnabledSlice";

function BtnShowStart() {
  const isEnabled = useSelector((state: any) => state.showIsEnabled.value);
  const dispatch = useDispatch();

  function handleClick(): void {
    dispatch(set(!isEnabled));
  }

  return (
    <button type="button" className="menu-item bordered" onClick={handleClick}>
      {isEnabled ? "Stop" : "Start"}
    </button>
  );
}

export default BtnShowStart;
