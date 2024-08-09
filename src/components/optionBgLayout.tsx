import { ChangeEvent, useCallback } from "react";

import { StateName, StoreActions } from "@/common/constants";

import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function OptionBgLayout(): JSX.Element {
  enum Layout {
    Cover,
    Contain,
    Original,
    Tile,
    Fill,
  }

  const dispatch = useDispatchRouter();

  const handleDropdownSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      switch (e.target.value) {
        case Layout.Cover.toString():
          dispatch(StateName.BG_SIZE, StoreActions.SET, "cover");
          dispatch(StateName.BG_REPEAT, StoreActions.SET, "no-repeat");
          return;
        case Layout.Contain.toString():
          dispatch(StateName.BG_SIZE, StoreActions.SET, "contain");
          dispatch(StateName.BG_REPEAT, StoreActions.SET, "no-repeat");
          return;
        case Layout.Original.toString():
          dispatch(StateName.BG_SIZE, StoreActions.SET, "auto");
          dispatch(StateName.BG_REPEAT, StoreActions.SET, "no-repeat");
          return;
        case Layout.Tile.toString():
          dispatch(StateName.BG_SIZE, StoreActions.SET, "auto");
          dispatch(StateName.BG_REPEAT, StoreActions.SET, "repeat");
          return;
        case Layout.Fill.toString():
          dispatch(StateName.BG_SIZE, StoreActions.SET, "repeat");
          dispatch(StateName.BG_REPEAT, StoreActions.SET, "repeat");
          return;
        default:
          throw TypeError("No such background layout type!");
      }
    },
    []
  );

  return (
    <select className="menu-item select" onChange={handleDropdownSelect}>
      <option value={Layout.Cover}>cover</option>
      <option value={Layout.Contain}>contain</option>
      <option value={Layout.Original}>original size</option>
      <option value={Layout.Tile}>tile</option>
      <option value={Layout.Fill}>fill and repeat</option>
    </select>
  );
}
