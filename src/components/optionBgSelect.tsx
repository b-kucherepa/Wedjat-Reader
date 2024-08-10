import { StateName, StoreActions } from "@/common/constants";

import { formatBytes } from "../common/utils";

import { ChangeEvent, ReactElement, useCallback } from "react";

import useSelectorValuesRouter from "@/hooks/useSelectorValuesRouter";
import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function OptionBgSelect(): JSX.Element {
  const dispatch = useDispatchRouter();

  const storeValues = useSelectorValuesRouter(
    StateName.BG_FILES,
    StateName.BG_INDEX,
    StateName.TEXT_COLOR,
    StateName.TEXT_FONT
  );

  const options: ReactElement[] = storeValues[StateName.BG_FILES].map(
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

  const handleDropdownSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      dispatch(StateName.BG_INDEX, StoreActions.SET, parseInt(e.target.value));
    },
    []
  );

  return (
    <select
      value={storeValues[StateName.BG_INDEX]}
      className="menu-item select bordered bg-list"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${
          storeValues[StateName.BG_FILES][storeValues[StateName.BG_INDEX]]
            ?.file ?? ""
        })`,
        color: storeValues[StateName.TEXT_COLOR],
        fontFamily: storeValues[StateName.TEXT_FONT],
      }}
      onChange={handleDropdownSelect}
    >
      {options}
    </select>
  );
}
