import { useDispatch } from "react-redux";

import { close } from "@/store/menuStateSlice";

export default function BtnMenuClose() {
  const dispatch = useDispatch();

  function handleClick(): void {
    dispatch(close());
  }

  return (
    <button type="button" className="btn-menu-close" onClick={handleClick}>
      &times;
    </button>
  );
}
