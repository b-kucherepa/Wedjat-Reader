import { formatBytes, normalizeArrayIndex } from "../common/utils";

import { ChangeEvent, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "@/store/bgImageIndexSlice";

export default function OptionBgSelect(): JSX.Element {
  const OPTION_NAME_FILES = "bgImageFiles";
  const OPTION_NAME_INDEX = "bgImageIndex";
  const OPTION_NAME_COLOR = "textColor";

  const imageFiles = useSelector((state: any) => state[OPTION_NAME_FILES].value);
  const imageIndex = useSelector((state: any) => state[OPTION_NAME_INDEX].value);
  const textColor = useSelector((state: any) => state[OPTION_NAME_COLOR].value);
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
        color: textColor
      }}
      onChange={handleDropdownSelect}
    >
      {options}
    </select>
  );
}