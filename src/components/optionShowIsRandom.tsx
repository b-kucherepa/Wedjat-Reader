import { NAME_SHOW_IS_RANDOM } from "@/common/constants";

import { useDispatch, useSelector } from "react-redux";
import { set } from "@/store/showIsRandomSlice";

export default function OptionShowRandom() {
  const isRandom = useSelector(
    (state: any) => state[NAME_SHOW_IS_RANDOM].value
  );
  const dispatch = useDispatch();

  function handleChange(): void {
    dispatch(set(!isRandom));
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
        value={isRandom ? "random" : "next"}
        className="menu-item counter"
        onChange={handleChange}
      />
      <button className="menu-item counter-arrow" onClick={handleChange}>
        {"→"}
      </button>
    </div>
  );
}
