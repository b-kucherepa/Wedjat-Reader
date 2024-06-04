import { useContext } from "react";
import { RenderContext } from "./page";

function RenderArea() {
  const context = useContext(RenderContext);

  return (
    <div id="renderArea" className="text">
      <pre className="whitespace-pre-wrap">{context.values.text}</pre>
    </div>
  );
}

export default RenderArea;
