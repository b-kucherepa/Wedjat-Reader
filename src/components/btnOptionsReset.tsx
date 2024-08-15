import useLocalStore from "@/hooks/useLocalStore";
import { useDispatch } from "react-redux";

export default function BtnOptionsReset() {
  const dispatch = useDispatch();

  const [, , removeStates] = useLocalStore();

  function handleClick(): void {
    removeStates(dispatch);
  }

  return (
    <button
      type="button"
      className="menu-item btn bordered"
      onClick={handleClick}
    >
      Reset
    </button>
  );
}
