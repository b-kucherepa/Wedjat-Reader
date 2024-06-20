import { removeStates } from "@/common/utils";

export default function BtnOptionsReset() {
  function handleClick(): void {
    removeStates();
  }

  return (
    <button type="button" className="menu-item btn bordered" onClick={handleClick}>
      Reset
    </button>
  );
}