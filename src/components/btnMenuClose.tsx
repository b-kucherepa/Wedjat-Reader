import { StateName, StoreActions } from "@/common/constants";

import { saveStates } from "@/common/utils";

import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function BtnMenuClose() {
  const dispatch = useDispatchRouter();

  function handleClick(): void {
    dispatch(StateName.MENU_STATE, StoreActions.CLOSE);
    saveStates();
  }

  return (
    <button type="button" className="btn-menu-close" onClick={handleClick}>
      &times;
    </button>
  );
}
