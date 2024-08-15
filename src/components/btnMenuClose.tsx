import { StateName, StoreActions } from "@/common/constants";

import useDispatchRouter from "@/hooks/useDispatchRouter";
import useLocalStore from "@/hooks/useLocalStore";

export default function BtnMenuClose() {
  const dispatch = useDispatchRouter();

  const [saveStates, ,] = useLocalStore();
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
