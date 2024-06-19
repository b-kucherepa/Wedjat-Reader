import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { set } from "@/store/showIsRandomSlice";

function OptionShowRandom() {
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
      dispatch(set(e.target.value));
    }  

  return (
    <input type="checkbox" className="menu-option" onChange={handleChange} />
  );
}

export default OptionShowRandom;