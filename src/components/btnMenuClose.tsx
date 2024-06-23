import { useDispatch } from "react-redux";

import { close } from "@/store/menuStateSlice";
import { saveStates } from "@/common/utils";

export default function BtnMenuClose() {
  const dispatch = useDispatch();

  function handleClick(): void {
    dispatch(close());
    saveStates();
  }

  return (
    <button type="button" className="btn-menu-close" onClick={handleClick}>
      &times;
    </button>
  );
}
