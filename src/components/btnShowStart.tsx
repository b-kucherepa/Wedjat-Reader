import { set } from "@/store/showIsEnabledSlice";
import { useDispatch, useSelector } from "react-redux";

function BtnShowStart() {
  const isEnabled = useSelector((state: any) => state.showIsEnabled.value);
  const dispatch = useDispatch();

  function handleClick(): void {
    dispatch(set(!isEnabled));
  }

  return (
    <button
      id="start-slideshow-button"
      className="menu-item bordered"
      type="button"
      onClick={handleClick
      }
    >
      {isEnabled ? "Stop" : "Start"}
    </button>
  );
}

export default BtnShowStart;
