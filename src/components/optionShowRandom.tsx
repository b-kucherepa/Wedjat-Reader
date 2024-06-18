import { ChangeEvent } from "react";
import { set } from "@/store/showIsRandomSlice";
import { useDispatch } from "react-redux";

function OptionShowRandom() {
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
      dispatch(set(e.target.value));
    }  

  return (
    <input id="randomize-button" type="checkbox" className="menu-option" onChange={handleChange} />
  );
}

export default OptionShowRandom;