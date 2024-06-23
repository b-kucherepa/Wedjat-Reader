import { set } from "@/store/textFontSlice";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

export default function OptionTextFont(): JSX.Element {
  const dispatch = useDispatch();

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>): void {
    dispatch(set(e.target.value));
  }

  return (
    <select className="menu-item select" onChange={handleDropdownSelect}>
      <option value="Arial, sans-serif">Arial, sans-serif</option>
      <option value="Helvetica, sans-serif">Helvetica, sans-serif</option>
      <option value="Verdana, sans-serif">Verdana, sans-serif</option>
      <option value="Trebuchet MS, sans-serif">Trebuchet MS, sans-serif</option>
      <option value="Gill Sans, sans-serif">Gill Sans, sans-serif</option>
      <option value="Arial, sans-serif">Arial, sans-serif</option>
      <option value="Arial Narrow, sans-serif">Arial Narrow, sans-serif</option>
      <option value="Times, Times New Roman, serif">
        Times, Times New Roman, serif
      </option>
      <option value="Georgia, serif">Georgia, serif</option>
      <option value="Palatino, URW Palladio L, serif">
        Palatino, URW Palladio L, serif
      </option>
      <option value="New Century Schoolbook, TeX Gyre Schola, serif">
        New Century Schoolbook, TeX Gyre Schola, serif
      </option>
      <option value="Courier New, monospace">Courier New, monospace</option>
      <option value="Courier, monospace">Courier, monospace</option>
      <option value="OCR A Std, monospace">OCR A Std, monospace</option>
      <option value="DejaVu Sans Mono, monospace">
        DejaVu Sans Mono, monospace
      </option>
      <option value="Comic Sans MS, Comic Sans, cursive">
        Comic Sans MS, Comic Sans, cursive
      </option>
      <option value="Impact, fantasy">Impact, fantasy</option>
      <option value="sans-serif">Default sans-serif</option>
      <option value="serif">Default serif</option>
      <option value="monospace">Default monospace</option>
      <option value="cursive">Default cursive</option>
      <option value="fantasy">Default fantasy</option>
    </select>
  );
}