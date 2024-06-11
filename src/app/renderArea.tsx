import { useContext } from "react";
import { TextContext } from "./page";

function RenderArea() {
  const textContext = useContext(TextContext);

  return (
    <div id="renderArea" className="text">
      <pre className="whitespace-pre-wrap">{textContext.values.text}</pre>
    </div>
  );
}

export default RenderArea;
