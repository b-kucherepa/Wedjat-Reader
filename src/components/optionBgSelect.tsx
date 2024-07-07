import {
  NAME_BG_FILES,
  NAME_BG_INDEX,
  NAME_TEXT_COLOR,
} from "@/common/constants";

import { formatBytes } from "../common/utils";

import { ChangeEvent, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "@/store/bgIndexSlice";

export default function OptionBgSelect(): JSX.Element {
  const [imageFiles, imageIndex, textColor] = useSelector((state: any) => [
    state[NAME_BG_FILES].value,
    state[NAME_BG_INDEX].value,
    state[NAME_TEXT_COLOR].value,
  ]);

  const dispatch = useDispatch();

  const options: ReactElement[] = imageFiles.map(
    (
      image: {
        file: string;
        name: string;
        size: number;
        modified: number;
      },
      index: number
    ) => {
      const date = new Date(image.modified);
      return (
        <option key={`option-${index}`} value={index}>
          {image.name}, size: {formatBytes(image.size)}, last modified:{" "}
          {date.toLocaleString()};
        </option>
      );
    }
  );

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>): void {
    dispatch(set(parseInt(e.target.value)));
  }

  return (
    <select
      value={imageIndex}
      className="menu-item select bordered bg-list"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imageFiles[imageIndex]?.file ?? ""})`,
        color: textColor,
      }}
      onChange={handleDropdownSelect}
    >
      {options}
    </select>
  );
}
