import { useDispatch, useSelector } from "react-redux";
import { set } from "@/store/showIsRandomSlice";

export default function OptionShowRandom() {
  const OPTION_NAME = "showIsRandom";

  const isRandom = useSelector((state: any) => state[OPTION_NAME].value);
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