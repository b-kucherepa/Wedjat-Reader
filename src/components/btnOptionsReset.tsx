import { STORE_ITEM_NAME } from "@/common/constants";
import { removeState } from "@/common/utils";

function BtnOptionsReset() {
  function handleClick(): void {
    removeState(STORE_ITEM_NAME);
  }

  return (
    <button
      id="start-slideshow-button"
      className="menu-item bordered"
      type="button"
      onClick={handleClick
      }
    >
      Reset
    </button>
  );
}

export default BtnOptionsReset;
