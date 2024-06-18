import { ChangeEvent, ReactElement } from "react";
import { formatBytes } from "../common/utils";
import { useDispatch, useSelector } from "react-redux";
import { set } from "@/store/bgImageIndexSlice";

function OptionBgSelect(): JSX.Element {
  const imageFiles = useSelector((state: any) => state.bgImageFiles.value);
  const imageIndex = useSelector((state: any) => state.bgImageIndex.value);
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
      id="bgList"
      className="menu-option bordered bg-list"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imageFiles[imageIndex]?.file ?? ""})`,
      }}
      onChange={handleDropdownSelect}
      value={imageIndex}
    >
      {options}
    </select>
  );
}

export default OptionBgSelect;
