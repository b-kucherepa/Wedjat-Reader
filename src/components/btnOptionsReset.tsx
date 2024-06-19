import { removeState } from "@/common/utils";

function BtnOptionsReset() {
  function handleClick(): void {
    removeState();
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
