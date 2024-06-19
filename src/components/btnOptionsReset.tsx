import { removeState } from "@/common/utils";

function BtnOptionsReset() {
  function handleClick(): void {
    removeState();
  }

  return (
    <button type="button" className="menu-item btn bordered" onClick={handleClick}>
      Reset
    </button>
  );
}

export default BtnOptionsReset;
